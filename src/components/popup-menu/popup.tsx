import React from 'react';
import ReactDOM from 'react-dom';
import clsx from 'clsx';
import CSSTransition from 'react-transition-group/CSSTransition';
import { PopupMenuContentProps, PopupProps as PopupMenuProps, PopupMenuState } from './types';

const PopupMenuContent = (props: PopupMenuContentProps) => {
	const childrenRef = React.useRef<HTMLDivElement>(null);
	const [state, setState] = React.useState({ top: 0, left: 0 });
	const { centerHorizontal, centerVertical, target } = props;

	const handleClickOutside = (event: MouseEvent) => {
		if (!childrenRef.current?.contains(event.target as Node)) {
			props.handleClose();
			return;
		}
	};

	React.useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside, false);
		window.addEventListener('resize', props.handleClose, false);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside, false);
			window.removeEventListener('resize', props.handleClose, false);
		};
	}, [props.handleClose]);

	React.useEffect(() => {
		let top = state.top;
		let left = state.left;
		const childrenHeight = childrenRef.current?.offsetHeight || 0;
		const childrenWidth = childrenRef.current?.offsetWidth || 0;
		const x = target.x;
		const y = target.y;
		const targetW = target.width;
		const targetH = target.height;
		const offset = props.offset || 5;
		if (x + targetW + offset + childrenWidth > window.innerWidth) {
			left = x - childrenWidth + targetW;
			if (centerHorizontal) {
				left += childrenWidth / 2 + targetW;
			}
		} else if (x - childrenWidth - offset < 0) {
			left = x + targetW + offset;
			if (centerHorizontal) {
				left -= childrenWidth / 2 + targetW;
			}
		} else {
			left = x + targetW + offset;
			if (centerHorizontal) {
				left -= childrenWidth / 2 - targetW / 2;
			}
		}

		if (y + targetH + offset + childrenHeight > window.innerHeight) {
			top = y - offset - childrenHeight;
			if (centerVertical) {
				top += childrenHeight / 2 + targetH;
			}
		} else if (y - offset - childrenHeight < 0) {
			top = y + targetH + offset;
			if (centerVertical) {
				top -= childrenHeight / 2 - targetH;
			}
		} else {
			top = y;
			if (centerVertical) {
				top -= childrenHeight / 2 - targetH / 2;
			}
		}
		setState({
			top,
			left,
		});
		props.onShow?.(top, left);
	}, [centerHorizontal, centerVertical, props.offset, target]);

	return ReactDOM.createPortal(
		<div
			className={clsx('t-popup-menu', props.className, props.show && 'show')}
			ref={childrenRef}
			onClick={!props.keepShowOnClick ? props.handleClose : undefined}
			style={{
				top: state.top,
				left: state.left,
			}}>
			{props.children}
		</div>,
		document.body
	);
};

export class PopupMenu extends React.Component<PopupMenuProps, PopupMenuState> {
	constructor(props: PopupMenuProps) {
		super(props);
		this.state = {
			activeMenu: false,
			target: {
				x: 0,
				y: 0,
				width: 0,
				height: 0,
			},
		};
		this.toggle = this.toggle.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.isShow = this.isShow.bind(this);
	}

	handleClose() {
		if (this.state.activeMenu) {
			this.setState({ activeMenu: false });
			this.props.onHide?.();
		}
	}

	toggle(e: React.MouseEvent<HTMLElement, MouseEvent>) {
		this.setState({
			activeMenu: !this.state.activeMenu,
			target: {
				x: e.currentTarget.getBoundingClientRect().left + window.scrollX,
				y: e.currentTarget.getBoundingClientRect().top + window.scrollY,
				width: e.currentTarget.clientWidth,
				height: e.currentTarget.clientHeight,
			},
		});
	}

	isShow() {
		return this.state.activeMenu;
	}

	render() {
		return (
			<CSSTransition in={this.state.activeMenu} timeout={250} unmountOnExit>
				<PopupMenuContent
					show={this.state.activeMenu}
					target={this.state.target}
					handleClose={this.handleClose}
					centerHorizontal={this.props.centerHorizontal}
					centerVertical={this.props.centerVertical}
					keepShowOnClick={this.props.keepShowOnClick}
					offset={this.props.offset}
					onHide={this.props.onHide}
					onShow={this.props.onShow}
					className={this.props.className}>
					{this.props.children}
				</PopupMenuContent>
			</CSSTransition>
		);
	}
}
