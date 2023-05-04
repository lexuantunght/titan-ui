import React from 'react';
import clsx from 'clsx';

export type SwitchProps = {
	active?: boolean;
	onChange?: (active: boolean) => void;
	disabled?: boolean;
};

export class Switch extends React.PureComponent<SwitchProps> {
	constructor(props: SwitchProps) {
		super(props);
		this.onToggle = this.onToggle.bind(this);
	}

	onToggle() {
		if (this.props.disabled) {
			return;
		}
		this.props.onChange?.(!this.props.active);
	}

	render() {
		const { active, disabled } = this.props;
		return (
			<div
				onClick={this.onToggle}
				className={clsx('t-switch', active && 'active', disabled && 'disabled')}>
				<div className="t-switch-control" />
			</div>
		);
	}
}
