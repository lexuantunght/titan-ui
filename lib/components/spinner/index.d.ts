import React from 'react';
export interface SpinnerProps {
    varriant?: 'primary' | 'light' | 'error' | 'warning' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}
export declare class Spinner extends React.PureComponent<SpinnerProps> {
    render(): JSX.Element;
}
