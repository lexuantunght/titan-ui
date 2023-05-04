import React from 'react';
import clsx from 'clsx';
import ReactDOM from 'react-dom';
import CSSTransition from 'react-transition-group/CSSTransition';

export type ToastProps = {
	show?: boolean;
	timeout?: number;
	children: React.ReactNode;
	className?: string;
};

const ToastContent = ({ show, children, className }: ToastProps) => {
	const containerRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		if (show) {
			containerRef.current?.classList.add('show');
		} else {
			containerRef.current?.classList.remove('show');
		}
	}, [show]);

	const content = (
		<div ref={containerRef} className={clsx('t-toast', className)}>
			{children}
		</div>
	);

	return ReactDOM.createPortal(content, document.body);
};

const Toast = ({ show, timeout = 500, ...rest }: ToastProps) => {
	return (
		<CSSTransition in={show} timeout={timeout} unmountOnExit>
			<ToastContent {...rest} show={show} />
		</CSSTransition>
	);
};

export const MemorizedToast = React.memo(Toast);
