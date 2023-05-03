import React from 'react';
import clsx from 'clsx';
import { ButtonProps } from './types';

export class Button extends React.PureComponent<ButtonProps> {
	constructor(props: ButtonProps) {
		super(props);
	}

	render() {
		const { className, ...others } = this.props;
		return (
			<button className={clsx('t-button', className)} {...others}>
				{this.props.children}
			</button>
		);
	}
}
