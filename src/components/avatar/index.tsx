import React from 'react';
import clsx from 'clsx';
import withForwardRef from 'utils/hocs/with-forward-ref';

export type AvatarProps = {
	src?: string;
	className?: string;
	alt?: string;
	placeholder?: string;
	shape?: 'circle' | 'square' | 'rounded-square';
	varriant?: 'primary' | 'light' | 'error' | 'warning' | 'secondary' | 'opacity';
	size?: 'sm' | 'md' | 'lg';
	mode?: 'outline' | 'normal';
	innerRef?: React.LegacyRef<HTMLImageElement>;
};

export type AvatarState = {
	isError: boolean;
};

class Avatar extends React.PureComponent<AvatarProps, AvatarState> {
	constructor(props: AvatarProps) {
		super(props);
		this.state = {
			isError: false,
		};
	}

	render() {
		const {
			shape = 'circle',
			className,
			src,
			alt,
			placeholder,
			varriant = 'secondary',
			mode = 'outline',
			size = 'md',
		} = this.props;

		if (this.state.isError && placeholder) {
			return (
				<div className={clsx('t-avatar t-avatar-error', shape, size, className)}>
					{placeholder.substring(0, 2).toUpperCase()}
				</div>
			);
		}

		return (
			<img
				ref={this.props.innerRef}
				src={src}
				className={clsx('t-avatar', shape, size, mode, varriant, className)}
				alt={alt}
				onError={() => this.setState({ isError: true })}
			/>
		);
	}
}

export default withForwardRef(Avatar);
