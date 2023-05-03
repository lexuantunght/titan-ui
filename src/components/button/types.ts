export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
	varriant: 'primary' | 'white' | 'error' | 'warning' | 'secondary';
	mode: 'text' | 'outline' | 'fill' | 'link';
}
