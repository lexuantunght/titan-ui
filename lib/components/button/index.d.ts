import React from 'react';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    varriant?: 'primary' | 'light' | 'error' | 'warning' | 'secondary';
    mode?: 'text' | 'outline' | 'fill' | 'link';
    size?: 'sm' | 'md' | 'lg';
    icon?: React.ReactNode;
    loading?: boolean;
}
export declare class Button extends React.PureComponent<ButtonProps> {
    render(): JSX.Element;
}
