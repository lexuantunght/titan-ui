import React from 'react';
import clsx from 'clsx';

export type TabTitleProps = {
	focused?: boolean;
	index: number;
	onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => void;
	onMounted?: (element: HTMLDivElement, index: number) => void;
	children?: React.ReactNode;
};

const TabTitle = (props: TabTitleProps) => {
	const { focused, index, onClick } = props;
	const titleRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		if (titleRef.current) {
			props.onMounted?.(titleRef.current, index);
		}
	}, []);

	return (
		<div
			ref={titleRef}
			className={clsx('t-tab-header-title', focused && 'focused')}
			onClick={(e) => onClick?.(e, index)}>
			{props.children}
		</div>
	);
};

export default TabTitle;
