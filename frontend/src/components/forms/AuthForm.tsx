import React, { useState } from 'react';
import { Zap, Mail, Lock, ArrowRight, Loader2, Eye, EyeOff } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';
import Card from '../common/Card';
import Alert from '../common/Alert';

interface AuthFormProps {
    mode: 'login' | 'register';
    onSubmit: (data: LoginData | RegisterData) => Promise<void>;
    isLoading?: boolean;
    error?: string | null;
    onToggleMode?: () => void;
}

interface LoginData {
    email: string;
    password: string;
    rememberMe?: boolean;
}

interface RegisterData {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
}

const AuthForm: React.FC<AuthFormProps> = ({
    mode,
    onSubmit,
    isLoading = false,
    error = null,
    onToggleMode
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState<any>(
        mode === 'login'
            ? { email: '', password: '', rememberMe: false }
            : { email: '', password: '', confirmPassword: '', name: '' }
    );
    const [validationErrors, setValidationErrors] = useState<any>({});

    const validateForm = () => {
        const errors: any = {};

        if (!formData.email) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Invalid email format';
        }

        if (!formData.password) {
            errors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }

        if (mode === 'register') {
            if (!formData.name) {
                errors.name = 'Name is required';
            }
            if (!formData.confirmPassword) {
                errors.confirmPassword = 'Please confirm your password';
            } else if (formData.password !== formData.confirmPassword) {
                errors.confirmPassword = 'Passwords do not match';
            }
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await onSubmit(formData);
            } catch (err) {
                console.error('Form submission error:', err);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        setFormData((prev: any) => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
        if (validationErrors[name]) {
            setValidationErrors((prev: any) => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-slate-50 flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <div className="bg-primary-600 p-3 rounded-2xl shadow-lg shadow-primary-200">
                        <Zap className="text-white" size={32} fill="currentColor" />
                    </div>
                </div>

                {/* Card */}
                <Card variant="elevated" padding="lg">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-slate-800">
                            {mode === 'login' ? 'Welcome back' : 'Create account'}
                        </h1>
                        <p className="text-slate-500 mt-2">
                            {mode === 'login'
                                ? 'Enter your credentials to access your dashboard'
                                : 'Join us and start managing your energy'}
                        </p>
                    </div>

                    {error && (
                        <Alert
                            variant="error"
                            title="Error"
                            message={error}
                            dismissible={false}
                            className="mb-6"
                        />
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {mode === 'register' && (
                            <Input
                                label="Full Name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                error={validationErrors.name}
                                placeholder="John Doe"
                                required
                            />
                        )}

                        <Input
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={validationErrors.email}
                            placeholder="you@example.com"
                            icon={<Mail size={18} />}
                            required
                        />

                        <div>
                            <Input
                                label="Password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={handleChange}
                                error={validationErrors.password}
                                placeholder="••••••••"
                                icon={<Lock size={18} />}
                                required
                            />
                        </div>

                        {mode === 'register' && (
                            <div>
                                <Input
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    error={validationErrors.confirmPassword}
                                    placeholder="••••••••"
                                    icon={<Lock size={18} />}
                                    required
                                />
                            </div>
                        )}

                        {mode === 'login' && (
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer hover:text-slate-700">
                                    <input
                                        type="checkbox"
                                        name="rememberMe"
                                        checked={formData.rememberMe}
                                        onChange={handleChange}
                                        className="rounded w-4 h-4 accent-primary-600"
                                    />
                                    Remember me
                                </label>
                                <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-700">
                                    Forgot password?
                                </a>
                            </div>
                        )}

                        <Button
                            type="submit"
                            fullWidth
                            size="lg"
                            loading={isLoading}
                            icon={!isLoading && <ArrowRight size={20} />}
                        >
                            {mode === 'login' ? 'Sign in' : 'Create account'}
                        </Button>

                        {onToggleMode && (
                            <p className="text-center text-sm text-slate-600">
                                {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
                                <button
                                    type="button"
                                    onClick={onToggleMode}
                                    className="font-semibold text-primary-600 hover:text-primary-700"
                                >
                                    {mode === 'login' ? 'Sign up' : 'Sign in'}
                                </button>
                            </p>
                        )}
                    </form>
                </Card>

                {/* Footer */}
                <p className="text-center text-xs text-slate-500 mt-6">
                    By using GreenEnergy, you agree to our Terms of Service and Privacy Policy
                </p>
            </div>
        </div>
    );
};

export default AuthForm;
