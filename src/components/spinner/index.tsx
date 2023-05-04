import React from 'react';
import clsx from 'clsx';

export interface SpinnerProps {
	size?: 'sm' | 'md' | 'lg';
	className?: string;
}

export class Spinner extends React.PureComponent<SpinnerProps> {
	render() {
		const { size = 'md', className } = this.props;
		return (
			<div className={clsx('t-spinner', size, className)}>
				<div />
				<div />
				<div />
			</div>
		);
	}
}
