import React from 'react';
import clsx from 'clsx';

export interface CheckboxProps {
	disabled?: boolean;
	size?: 'sm' | 'md' | 'lg';
	onChangeValue?: (checked: boolean) => void;
	uncheckable?: boolean;
	checked?: boolean;
	className?: string;
}

const Checkbox = (props: CheckboxProps) => {
	const { disabled, checked, size = 'md', onChangeValue, uncheckable = true, className } = props;
	const [isChecked, setIsChecked] = React.useState(checked);

	React.useEffect(() => {
		setIsChecked(checked);
	}, [checked]);

	const onCheck = () => {
		if (disabled) {
			return;
		}
		if (isChecked && !uncheckable) {
			return;
		}
		onChangeValue?.(!isChecked);
		setIsChecked(!isChecked);
	};

	return (
		<div
			onClick={onCheck}
			className={clsx('t-checkbox', disabled && 'disabled', size, className)}>
			{isChecked && <i className="t-icon icon-check" />}
		</div>
	);
};

export const MemorizedCheckbox = React.memo(Checkbox);
