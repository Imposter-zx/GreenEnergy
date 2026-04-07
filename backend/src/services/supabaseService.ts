import { supabase } from '../lib/supabase';

// User operations
export const findUserByEmail = async (email: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();
  
  if (error) throw error;
  return data;
};

export const createUser = async (userData: {
  email: string;
  password: string;
  role?: string;
  name?: string;
}) => {
  const { data, error } = await supabase
    .from('users')
    .insert({
      email: userData.email,
      password: userData.password,
      role: userData.role || 'INDIVIDUAL',
    })
    .select()
    .single();
  
  if (error) throw error;
  
  // Create profile if name provided
  if (userData.name && data) {
    await supabase
      .from('profiles')
      .insert({
        userId: data.id,
        name: userData.name,
      });
  }
  
  return data;
};

export const findUserById = async (userId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*, profiles(*)')
    .eq('id', userId)
    .single();
  
  if (error) throw error;
  return data;
};

export const updateProfile = async (userId: string, profileData: {
  name?: string;
  bio?: string;
  location?: string;
}) => {
  const { data, error } = await supabase
    .from('profiles')
    .upsert({
      userId: userId,
      ...profileData,
    })
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Energy reading operations
export const createEnergyReading = async (readingData: {
  userId: string;
  amount: number;
  deviceId?: string;
  timestamp?: Date;
}) => {
  const { data, error } = await supabase
    .from('energy_readings')
    .insert({
      userId: readingData.userId,
      amount: readingData.amount,
      deviceId: readingData.deviceId,
      timestamp: readingData.timestamp?.toISOString() || new Date().toISOString(),
    })
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const getEnergyReadings = async (userId: string, limit = 100) => {
  const { data, error } = await supabase
    .from('energy_readings')
    .select('*')
    .eq('userId', userId)
    .order('timestamp', { ascending: false })
    .limit(limit);
  
  if (error) throw error;
  return data;
};

export const getConsumptionSummary = async (userId: string, days = 7) => {
  const { data, error } = await supabase
    .from('energy_readings')
    .select('amount, timestamp')
    .eq('userId', userId)
    .gte('timestamp', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString())
    .order('timestamp', { ascending: true });
  
  if (error) throw error;
  
  // Group by day in memory (similar to original implementation)
  const daysMap: Record<string, number> = {};
  for (let i = 0; i < days; i++) {
    const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    daysMap[dayName] = 0;
  }
  
  data.forEach((r: { amount: number; timestamp: string }) => {
    const date = new Date(r.timestamp);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    if (daysMap[dayName] !== undefined) {
      daysMap[dayName] += r.amount;
    }
  });
  
  const summary = Object.entries(daysMap)
    .map(([name, consumption]) => ({ name, consumption }))
    .reverse();
  
  return summary;
};

// Budget operations
export const getBudget = async (userId: string, period: string = 'Monthly') => {
  const { data, error } = await supabase
    .from('budgets')
    .select('*')
    .eq('userId', userId)
    .eq('period', period)
    .single();
  
  if (error) throw error;
  return data;
};

export const updateBudget = async (userId: string, limit: number, period: string = 'Monthly') => {
  // Delete existing budget for this period
  await supabase
    .from('budgets')
    .delete()
    .eq('userId', userId)
    .eq('period', period);
  
  // Create new budget
  const { data, error } = await supabase
    .from('budgets')
    .insert({
      userId: userId,
      limit: limit,
      period: period,
    })
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Alert operations
export const createAlert = async (alertData: {
  userId: string;
  type: string;
  message: string;
}) => {
  const { data, error } = await supabase
    .from('alerts')
    .insert({
      userId: alertData.userId,
      type: alertData.type,
      message: alertData.message,
      seen: false,
    })
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const getAlerts = async (userId: string, limit = 20) => {
  const { data, error } = await supabase
    .from('alerts')
    .select('*')
    .eq('userId', userId)
    .order('createdAt', { ascending: false })
    .limit(limit);
  
  if (error) throw error;
  return data;
};

export const markAlertAsSeenService = async (alertId: string) => {
  const { data, error, count } = await supabase
    .from('alerts')
    .update({ seen: true })
    .eq('id', alertId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Recommendation operations
export const getRecommendations = async (userId: string) => {
  const { data, error } = await supabase
    .from('recommendations')
    .select('*')
    .eq('userId', userId)
    .order('createdAt', { ascending: false });
  
  if (error) throw error;
  
  // If none exist, return some defaults
  if (!data || data.length === 0) {
    return [
      { content: 'Shift laundry to 10 PM to 6 AM for 15% lower rates.', impactScore: 0.8 },
      { content: 'A/C usage is 20% higher than similar households.', impactScore: 0.5 },
      { content: 'Switching to LED bulbs could save you $12/month.', impactScore: 0.3 }
    ];
  }
  
  return data;
};

// Energy reading aggregation (for dashboard stats)
export const getEnergyReadingSum = async (userId: string, startDate: Date) => {
  const { data, error } = await supabase
    .from('energy_readings')
    .select('amount')
    .eq('userId', userId)
    .gte('timestamp', startDate.toISOString());
  
  if (error) throw error;
  
  const sum = data.reduce((acc: number, r: { amount: number }) => acc + r.amount, 0);
  return sum;
};

export const countUnseenAlerts = async (userId: string) => {
  const { data, error, count } = await supabase
    .from('alerts')
    .select('id', { count: 'exact' })
    .eq('userId', userId)
    .eq('seen', false);
   
  if (error) throw error;
  return count || 0;
};

// Sustainability metrics
export const getTotalConsumption = async (userId: string) => {
  const { data, error } = await supabase
    .from('energy_readings')
    .select('amount')
    .eq('userId', userId);
  
  if (error) throw error;
  
  const totalKWh = data.reduce((acc: number, r: { amount: number }) => acc + r.amount, 0);
  return totalKWh;
};