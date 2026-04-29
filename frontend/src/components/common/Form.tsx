import React from 'react';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    children: React.ReactNode;
}

const Form = React.forwardRef<HTMLFormElement, FormProps>(
    ({ onSubmit, children, className = '', ...props }, ref) => {
        return (
            <form
                ref={ref}
                onSubmit={onSubmit}
                className={`space-y-6 ${className}`}
                {...props}
            >
                {children}
            </form>
        );
    }
);

Form.displayName = 'Form';

export default Form;
