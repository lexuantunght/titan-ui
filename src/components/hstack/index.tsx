import React from 'react';
import clsx from 'clsx';

export interface HStackProps<T extends keyof HTMLElementTagNameMap = keyof HTMLElementTagNameMap>
	extends React.HTMLAttributes<HTMLElementTagNameMap[T]> {
	element?: T;
}

export class HStack extends React.PureComponent<HStackProps> {
	render() {
		const { element = 'div', children, className, ...others } = this.props;
		return React.createElement(
			element,
			{ className: clsx('t-hstack', className), ...others },
			children
		);
	}
}
