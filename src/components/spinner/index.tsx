import React from 'react';
import clsx from 'clsx';

export interface SpinnerProps {
	varriant?: 'primary' | 'light' | 'error' | 'warning' | 'secondary';
	size?: 'sm' | 'md' | 'lg';
	className?: string;
}

export class Spinner extends React.PureComponent<SpinnerProps> {
	render() {
		const { size = 'md', varriant = 'primary', className } = this.props;
		return (
			<div className={clsx('t-spinner', size, varriant, className)}>
				<div />
				<div />
				<div />
			</div>
		);
	}
}
