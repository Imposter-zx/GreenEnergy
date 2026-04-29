import React, { useState } from 'react';
import { Zap, Smartphone, Loader2 } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';
import Card from '../common/Card';
import Alert from '../common/Alert';
import FormField from '../common/FormField';

interface EnergyReadingFormProps {
    onSubmit: (data: EnergyReading) => Promise<void>;
    isLoading?: boolean;
    error?: string | null;
    success?: boolean;
}

interface EnergyReading {
    amount: number;
    deviceId?: string;
    timestamp: Date;
}

const EnergyReadingForm: React.FC<EnergyReadingFormProps> = ({
    onSubmit,
    isLoading = false,
    error = null,
    success = false
}) => {
    const [formData, setFormData] = useState({
        amount: '',
        deviceId: ''
    });
    const [validationErrors, setValidationErrors] = useState<any>({});

    const validateForm = () => {
        const errors: any = {};

        if (!formData.amount) {
            errors.amount = 'Consumption amount is required';
        } else if (isNaN(parseFloat(formData.amount)) || parseFloat(formData.amount) <= 0) {
            errors.amount = 'Please enter a valid positive number';
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await onSubmit({
                    amount: parseFloat(formData.amount),
                    deviceId: formData.deviceId || undefined,
                    timestamp: new Date()
                });
                setFormData({ amount: '', deviceId: '' });
            } catch (err) {
                console.error('Form submission error:', err);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
        if (validationErrors[name]) {
            setValidationErrors((prev: any) => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    return (
        <Card variant="elevated" padding="lg">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                    <Zap size={20} />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Add Energy Reading</h3>
            </div>

            {error && (
                <Alert
                    variant="error"
                    title="Error"
                    message={error}
                    className="mb-6"
                    dismissible={false}
                />
            )}

            {success && (
                <Alert
                    variant="success"
                    title="Success"
                    message="Reading added successfully!"
                    className="mb-6"
                    dismissible={true}
                />
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <FormField
                    label="Consumption (kWh)"
                    error={validationErrors.amount}
                    required
                >
                    <Input
                        name="amount"
                        type="number"
                        step="0.01"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="0.00"
                        icon={<Zap size={18} />}
                    />
                </FormField>

                <FormField
                    label="Device ID"
                    helperText="Optional: Identify which device this reading is from"
                >
                    <Input
                        name="deviceId"
                        type="text"
                        value={formData.deviceId}
                        onChange={handleChange}
                        placeholder="e.g. SMART-METER-01"
                        icon={<Smartphone size={18} />}
                    />
                </FormField>

                <Button
                    type="submit"
                    fullWidth
                    size="lg"
                    loading={isLoading}
                >
                    Submit Reading
                </Button>
            </form>
        </Card>
    );
};

export default EnergyReadingForm;
