import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import { detectAnomalies, predictNextDayConsumption } from '../services/energyService';
import { startOfDay, subDays, format } from 'date-fns';
import { 
  createEnergyReading, 
  getEnergyReadings,
  getAlerts as getAlertsFromService,
  getConsumptionSummary as getConsumptionSummaryFromService,
  getEnergyReadingSum,
  countUnseenAlerts,
  getTotalConsumption,
  createAlert,
  updateBudget as updateBudgetService,
  getBudget,
  getRecommendations as getRecommendationsFromService,
  markAlertAsSeenService
} from '../services/supabaseService';

export const addReading = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { amount, deviceId, timestamp } = req.body;
        const userId = req.user!.userId;

        const reading = await createEnergyReading({
            userId,
            amount,
            deviceId,
            timestamp: timestamp ? new Date(timestamp) : new Date(),
        });

        // Check for anomalies
        const isAnomaly = await detectAnomalies(userId, amount);
        if (isAnomaly) {
            await createAlert({
                userId,
                type: 'ANOMALY',
                message: `Abnormal energy consumption detected: ${amount} kWh`,
            });
        }

        // Check budget
        const budget = await getBudget(userId, 'Monthly');

        if (budget) {
            const startOfMonth = new Date();
            startOfMonth.setDate(1);
            startOfMonth.setHours(0, 0, 0, 0);

            const monthlyTotal = await getEnergyReadingSum(userId, startOfMonth);

            if ((monthlyTotal || 0) > budget.limit) {
                await createAlert({
                    userId,
                    type: 'BUDGET_EXCEEDED',
                    message: `Monthly budget of ${budget.limit} kWh has been exceeded.`,
                });
            }
        }

        res.status(201).json({ reading, isAnomaly });
    } catch (error) {
        next(error);
    }
};

export const getReadings = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user!.userId;
        const readings = await getEnergyReadings(userId, 100);
        res.json(readings);
    } catch (error) {
        next(error);
    }
};

export const getConsumptionSummary = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user!.userId;
        const summary = await getConsumptionSummaryFromService(userId, 7);
        res.json(summary);
    } catch (error) {
        next(error);
    }
};

export const getDashboardStats = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user!.userId;
        const dayAgo = subDays(new Date(), 1);
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const [currentUsageResult, prediction, activeAlerts, monthlySpentResult, budget] = await Promise.all([
            getEnergyReadingSum(userId, dayAgo),
            predictNextDayConsumption(userId),
            countUnseenAlerts(userId),
            getEnergyReadingSum(userId, startOfMonth),
            getBudget(userId, 'Monthly')
        ]);

        res.json({
            currentUsage: (currentUsageResult || 0).toFixed(1),
            prediction: prediction ? prediction.toFixed(1) : 'N/A',
            alertCount: activeAlerts,
            monthlySpent: (monthlySpentResult || 0).toFixed(1),
            budgetLimit: budget?.limit || 0
        });
    } catch (error) {
        next(error);
    }
};

export const updateBudget = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { limit, period = 'Monthly' } = req.body;
        const userId = req.user!.userId;

        await updateBudgetService(userId, limit, period);
        const budget = await getBudget(userId, period);
        
        res.json(budget);
    } catch (error) {
        next(error);
    }
};

export const getAlerts = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user!.userId;
        const alerts = await getAlertsFromService(userId, 20);
        res.json(alerts);
    } catch (error) {
        next(error);
    }
};

export const markAlertAsSeen = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const alertId = Array.isArray(id) ? id[0] : id;
        const alert = await markAlertAsSeenService(alertId);
        res.json(alert);
    } catch (error) {
        next(error);
    }
};

export const getRecommendations = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user!.userId;
        const recommendations = await getRecommendationsFromService(userId);

        // If none exist, return some defaults
        if (!recommendations || recommendations.length === 0) {
            return res.json([
                { content: 'Shift laundry to 10 PM to 6 AM for 15% lower rates.', impactScore: 0.8 },
                { content: 'A/C usage is 20% higher than similar households.', impactScore: 0.5 },
                { content: 'Switching to LED bulbs could save you $12/month.', impactScore: 0.3 }
            ]);
        }

        res.json(recommendations);
    } catch (error) {
        next(error);
    }
};

export const getSustainabilityMetrics = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user!.userId;
        
        const totalKWh = await getTotalConsumption(userId);
        const co2Saved = totalKWh * 0.42; // Example coefficient: 0.42kg CO2 per kWh
        const treesEquivalent = Math.floor(co2Saved / 20); // 1 tree absorbs ~20kg CO2/year

        res.json({
            totalKWh,
            co2Saved,
            treesEquivalent,
            carbonFootprint: totalKWh * 0.52, // higher footprint coefficient
            impactLevel: totalKWh < 100 ? 'Low' : totalKWh < 500 ? 'Moderate' : 'High'
        });
    } catch (error) {
        next(error);
    }
};
