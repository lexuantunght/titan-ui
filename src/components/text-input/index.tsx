import React from 'react';
import clsx from 'clsx';
import withForwardRef from 'utils/hocs/with-forward-ref';
import withValidation from 'utils/hocs/with-validation';

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	mode?: 'outline' | 'normal' | 'fill';
	varriant?: 'primary' | 'light' | 'error' | 'warning' | 'secondary' | 'opacity';
	icon?: React.ReactNode;
	innerRef?: React.LegacyRef<HTMLInputElement>;
	wrapperClassName?: string;
}

class TextInput extends React.PureComponent<TextInputProps> {
	render() {
		const {
			className,
			mode = 'outline',
			varriant = 'secondary',
			icon,
			innerRef,
			wrapperClassName,
			...others
		} = this.props;

		if (icon) {
			return (
				<div
					className={clsx(
						't-text-input-wrapper',
						this.props.disabled && 'disabled',
						mode === 'fill' && 'fill',
						varriant,
						wrapperClassName
					)}>
					{typeof icon === 'string' ? (
						<i className={clsx('t-text-input-icon t-icon', icon)} />
					) : (
						icon
					)}
					<input
						className={clsx('t-text-input', 'normal', className)}
						ref={innerRef}
						{...others}
					/>
				</div>
			);
		}

		return (
			<input
				className={clsx('t-text-input', mode, varriant, className)}
				ref={innerRef}
				{...others}
			/>
		);
	}
}

export default withValidation(withForwardRef(TextInput));
