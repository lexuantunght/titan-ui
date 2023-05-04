import React from 'react';
import ReactDOM from 'react-dom';
import clsx from 'clsx';
import CSSTransition from 'react-transition-group/CSSTransition';

export type TooltipContentProps = {
	className?: string;
	content?: React.ReactNode;
	mode?: 'top-bottom' | 'left-right';
	spacing?: number;
};

export type TooltipProps = TooltipContentProps & {
	children: JSX.Element;
	hide?: boolean;
	showOnElementDisabled?: boolean;
	wrapperClassName?: string;
};

export type ChildrenInfo = {
	top: number;
	left: number;
	width: number;
	height: number;
};

const TooltipContent = (
	props: TooltipContentProps & { childrenInfo?: ChildrenInfo; show?: boolean }
) => {
	const { mode = 'left-right', childrenInfo, spacing = 6, show } = props;
	const [status, setStatus] = React.useState<{ top?: number; left?: number; position?: string }>(
		{}
	);
	const contentRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		if (contentRef.current && childrenInfo) {
			const x = childrenInfo.left + window.scrollX;
			const y = childrenInfo.top + window.scrollY;
			const childrenHeight = childrenInfo.height;
			const childrenWidth = childrenInfo.width;
			const contentWidth = contentRef.current.clientWidth;
			const contentHeight = contentRef.current.clientHeight;
			let top = 0,
				left = 0,
				position = 'left';
			if (mode === 'left-right') {
				top = y + childrenHeight / 2 - contentHeight / 2;
				if (x + childrenWidth + contentWidth < window.innerWidth) {
					left = x + childrenWidth + spacing;
					position = 'right';
				} else {
					left = x - contentWidth - spacing;
					position = 'left';
				}
			} else {
				left = x + childrenWidth / 2 - contentWidth / 2;
				if (y - contentHeight > 0) {
					top = y - contentHeight - spacing;
					position = 'top';
				} else {
					top = y + childrenHeight + spacing;
					position = 'bottom';
				}
			}
			setStatus({ left, top, position });
		}
	}, [mode, childrenInfo]);

	return ReactDOM.createPortal(
		<div
			ref={contentRef}
			style={{
				top: status.top,
				left: status.left,
			}}
			className={clsx(
				't-tooltip-container',
				status.top !== undefined && status.left !== undefined && show && 'show'
			)}>
			<div className={clsx('t-tooltip-content', props.className, status.position)}>
				{props.content}
			</div>
		</div>,
		document.body
	);
};

function Tooltip(props: TooltipProps) {
	const { hide, showOnElementDisabled = true, wrapperClassName } = props;
	const childRef = React.useRef<Element>(null);
	const [show, setShow] = React.useState(false);
	const childComponent = React.cloneElement(
		showOnElementDisabled ? (
			<div className={clsx('t-tooltip-wrapper', wrapperClassName)}>{props.children}</div>
		) : (
			props.children
		),
		{
			ref: childRef,
		}
	);
	const [childrenInfo, setChildrenInfo] = React.useState<ChildrenInfo | undefined>();

	React.useEffect(() => {
		if (childRef.current && !hide) {
			setChildrenInfo({
				width: childRef.current.clientWidth,
				height: childRef.current.clientHeight,
				left: childRef.current.getBoundingClientRect().left + window.scrollX,
				top: childRef.current.getBoundingClientRect().top + window.scrollY,
			});
			childRef.current.addEventListener('mouseenter', handleHover);
			childRef.current.addEventListener('mouseleave', handleUnhover);
		}
		return () => {
			if (childRef.current) {
				childRef.current.removeEventListener('mouseenter', handleHover);
				childRef.current.removeEventListener('mouseleave', handleUnhover);
			}
		};
	}, [hide]);

	const handleUnhover = () => {
		setShow(false);
	};

	const handleHover = () => {
		setShow(true);
	};

	return (
		<>
			<CSSTransition in={show} timeout={250} unmountOnExit>
				<TooltipContent
					className={props.className}
					content={props.content}
					childrenInfo={childrenInfo}
					mode={props.mode}
					spacing={props.spacing}
					show={show}
				/>
			</CSSTransition>
			{childComponent}
		</>
	);
}

export const MemorizedTooltip = React.memo(Tooltip);
