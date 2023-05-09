import React from 'react';
import clsx from 'clsx';
import { Spinner } from 'components/spinner';
import withForwardRef from 'utils/hocs/with-forward-ref';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	varriant?: 'primary' | 'light' | 'error' | 'warning' | 'secondary' | 'opacity';
	mode?: 'text' | 'outline' | 'fill' | 'link';
	shape?: 'circle' | 'rectangle';
	size?: 'sm' | 'md' | 'lg';
	icon?: React.ReactNode;
	loading?: boolean;
	innerRef?: React.LegacyRef<HTMLButtonElement>;
}

class Button extends React.PureComponent<ButtonProps> {
	render() {
		const {
			className,
			mode = 'fill',
			varriant = 'primary',
			icon,
			loading,
			size = 'md',
			shape = 'rectangle',
			innerRef,
			...others
		} = this.props;
		return (
			<button
				className={clsx('t-button', mode, varriant, size, shape, className)}
				{...others}
				ref={innerRef}>
				{loading ? (
					<Spinner className="t-button-inner-icon" size={size} />
				) : typeof icon === 'string' ? (
					<i className={clsx('t-button-icon t-icon', icon)} />
				) : (
					icon
				)}
				{this.props.children}
			</button>
		);
	}
}

export default withForwardRef(Button);
