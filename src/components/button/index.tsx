import React from 'react';
import clsx from 'clsx';
import { Spinner } from 'components/spinner';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	varriant?: 'primary' | 'light' | 'error' | 'warning' | 'secondary' | 'opacity';
	mode?: 'text' | 'outline' | 'fill' | 'link';
	shape?: 'circle' | 'rectangle';
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
			shape = 'rectangle',
			...others
		} = this.props;
		return (
			<button
				className={clsx('t-button', mode, varriant, size, shape, className)}
				{...others}>
				{loading ? (
					<Spinner className="t-button-inner-icon" size={size} />
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
