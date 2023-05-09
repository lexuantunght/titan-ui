import React from 'react';
import clsx from 'clsx';
import ReactDOM from 'react-dom';
import CSSTransition from 'react-transition-group/CSSTransition';
import Button from 'components/button';

type ModalProps = {
	show?: boolean;
	timeout?: number;
	children: React.ReactNode;
	onClose?: () => void;
	className?: string;
};

const ModalContent = ({ show, onClose, children, className }: ModalProps) => {
	const containerRef = React.useRef<HTMLDivElement>(null);
	const contentRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		if (show) {
			containerRef.current?.classList.add('show');
			contentRef.current?.classList.add('appear');
		} else {
			contentRef.current?.classList.remove('appear');
			containerRef.current?.classList.remove('show');
		}
	}, [show]);

	const content = (
		<div ref={containerRef} className={'t-modal'}>
			<div ref={contentRef} className={clsx('t-modal-content', className)}>
				<Button
					className="t-modal-close-btn"
					icon="icon-close"
					mode="fill"
					shape="circle"
					varriant="opacity"
					onClick={onClose}
				/>
				{children}
			</div>
		</div>
	);

	return ReactDOM.createPortal(content, document.body);
};

export class Modal extends React.PureComponent<ModalProps> {
	render() {
		const { show, timeout = 500 } = this.props;
		return (
			<CSSTransition in={show} timeout={timeout} unmountOnExit>
				<ModalContent {...this.props} />
			</CSSTransition>
		);
	}
}
