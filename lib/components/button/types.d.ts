/// <reference types="react" />
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    varriant: 'primary' | 'light' | 'error' | 'warning' | 'secondary';
    mode: 'text' | 'outline' | 'fill' | 'link';
    icon?: string;
    loading?: boolean;
}
