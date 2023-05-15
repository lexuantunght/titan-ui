/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

export type ScrollBoxProps = {
	autoHide?: boolean;
	className?: string;
	style?: React.CSSProperties;
	children?: React.ReactNode;
};

const ScrollBox = (props: ScrollBoxProps) => {
	const { autoHide, className, style = { height: '100%' } } = props;
	return (
		<Scrollbars
			autoHide={autoHide}
			className={className}
			style={style}
			renderTrackVertical={({ style, ...props }) => (
				<div
					{...props}
					style={{ ...style, right: '2px', top: '2px', bottom: '2px', width: '8px' }}
				/>
			)}
			renderThumbVertical={({ style, ...props }) => (
				<div
					{...props}
					style={{
						...style,
						backgroundColor: 'var(--scroll-color)',
						borderRadius: 3,
					}}
				/>
			)}>
			{props.children}
		</Scrollbars>
	);
};

export default React.memo(ScrollBox);
