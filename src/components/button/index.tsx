import React from 'react';
import clsx from 'clsx';
import { Spinner } from 'components/spinner';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	varriant?: 'primary' | 'light' | 'error' | 'warning' | 'secondary';
	mode?: 'text' | 'outline' | 'fill' | 'link';
	size?: 'sm' | 'md' | 'lg';
	icon?: React.ReactNode;
	loading?: boolean;
}

export class Button extends React.PureComponent<ButtonProps> {
	render() {
		const {
			className,
			mode = 'fill',
			varriant = 'primary',
			icon,
			loading,
			size = 'md',
			...others
		} = this.props;
		return (
			<button className={clsx('t-button', mode, varriant, size, className)} {...others}>
				{loading ? (
					<Spinner size={size} varriant={varriant} />
				) : typeof icon === 'string' ? (
					<i className={icon} />
				) : (
					icon
				)}
				{this.props.children}
			</button>
		);
	}
}
