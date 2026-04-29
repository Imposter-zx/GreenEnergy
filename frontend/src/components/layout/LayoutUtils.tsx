import React from 'react';

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const sizes = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full'
};

export const Container: React.FC<ContainerProps> = ({
    children,
    className = '',
    size = 'lg'
}) => {
    return (
        <div className={`w-full ${sizes[size]} mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
            {children}
        </div>
    );
};

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    spacing?: 'sm' | 'md' | 'lg';
}

const spacings = {
    sm: 'py-8 md:py-12',
    md: 'py-12 md:py-16',
    lg: 'py-16 md:py-24'
};

export const Section: React.FC<SectionProps> = ({
    children,
    className = '',
    spacing = 'md'
}) => {
    return (
        <section className={`${spacings[spacing]} ${className}`}>
            {children}
        </section>
    );
};

interface GridProps {
    children: React.ReactNode;
    columns?: number;
    gap?: 'sm' | 'md' | 'lg';
    className?: string;
}

const gapClasses = {
    sm: 'gap-3 md:gap-4',
    md: 'gap-4 md:gap-6',
    lg: 'gap-6 md:gap-8'
};

export const Grid: React.FC<GridProps> = ({
    children,
    columns = 3,
    gap = 'md',
    className = ''
}) => {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} ${gapClasses[gap]} ${className}`}>
            {children}
        </div>
    );
};

interface FlexProps {
    children: React.ReactNode;
    direction?: 'row' | 'col';
    justify?: 'start' | 'center' | 'between' | 'around' | 'end';
    align?: 'start' | 'center' | 'end' | 'stretch';
    gap?: 'sm' | 'md' | 'lg';
    className?: string;
}

const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    between: 'justify-between',
    around: 'justify-around',
    end: 'justify-end'
};

const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch'
};

const flexGapClasses = {
    sm: 'gap-2 md:gap-3',
    md: 'gap-4 md:gap-6',
    lg: 'gap-6 md:gap-8'
};

export const Flex: React.FC<FlexProps> = ({
    children,
    direction = 'row',
    justify = 'start',
    align = 'center',
    gap = 'md',
    className = ''
}) => {
    return (
        <div
            className={`flex flex-${direction} ${justifyClasses[justify]} ${alignClasses[align]} ${flexGapClasses[gap]} ${className}`}
        >
            {children}
        </div>
    );
};

interface SpacerProps {
    size?: number;
    horizontal?: boolean;
}

export const Spacer: React.FC<SpacerProps> = ({ size = 4, horizontal = false }) => {
    const classes = `${horizontal ? 'w' : 'h'}-${size}`;
    return <div className={classes} />;
};
