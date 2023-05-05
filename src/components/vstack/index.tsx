import React from 'react';
import clsx from 'clsx';

export interface VStackProps<T extends keyof HTMLElementTagNameMap = keyof HTMLElementTagNameMap>
	extends React.HTMLAttributes<HTMLElementTagNameMap[T]> {
	element?: T;
}

export class VStack extends React.PureComponent<VStackProps> {
	render() {
		const { element = 'div', children, className, ...others } = this.props;
		return React.createElement(
			element,
			{ className: clsx('t-vstack', className), ...others },
			children
		);
	}
}
