import React from 'react';
import ReactDOM from 'react-dom';
import clsx from 'clsx';
import CSSTransition from 'react-transition-group/CSSTransition';

export type PopupMenuProps = {
	children?: React.ReactNode;
	className?: string;
	onHide?: () => void;
	onShow?: (top: number, left: number) => void;
	keepShowOnClick?: boolean;
	centerVertical?: boolean;
	centerHorizontal?: boolean;
	offset?: number;
};

export type PopupMenuState = {
	activeMenu: boolean;
	top: number;
	left: number;
};

const PopupMenuContent = (props: PopupMenuProps & { handleClose: () => void }) => {
	const childrenRef = React.useRef<HTMLDivElement>(null);
	const [state, setState] = React.useState({ top: 0, left: 0 });
	const { centerHorizontal, centerVertical } = props;

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
		console.log(childrenHeight, childrenWidth);
		const x = e.currentTarget.getBoundingClientRect().left + window.scrollX;
		const y = e.currentTarget.getBoundingClientRect().top + window.scrollY;
		const targetW = e.currentTarget.clientWidth;
		const targetH = e.currentTarget.clientHeight;
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
			left = x;
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
	}, [centerHorizontal, centerVertical, props.offset]);

	return ReactDOM.createPortal(
		<div
			className={clsx('t-popup-menu', props.className)}
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
	childrenRef: React.RefObject<HTMLDivElement>;

	constructor(props: PopupMenuProps) {
		super(props);
		this.childrenRef = React.createRef();
		this.state = {
			activeMenu: false,
			top: 0,
			left: 0,
		};
		this.handleClickOutside = this.handleClickOutside.bind(this);
		this.toggle = this.toggle.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.isShow = this.isShow.bind(this);
	}

	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside, false);
		window.addEventListener('resize', this.handleClose, false);
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside, false);
		window.removeEventListener('resize', this.handleClose, false);
		if (this.childrenRef.current) {
			document.body.removeChild(this.childrenRef.current);
		}
	}

	handleClose() {
		if (this.state.activeMenu) {
			this.setState({ activeMenu: false });
			this.props.onHide?.();
		}
	}

	handleClickOutside(event: MouseEvent) {
		if (!this.childrenRef.current?.contains(event.target as Node)) {
			this.handleClose();
			return;
		}
	}

	toggle(e: React.MouseEvent<HTMLElement, MouseEvent>) {
		if (this.state.activeMenu) {
			this.setState({ activeMenu: false });
			return;
		} else {
			this.setState({ activeMenu: true });
		}
		let top = this.state.top;
		let left = this.state.left;
		const childrenHeight = this.childrenRef.current?.offsetHeight || 0;
		const childrenWidth = this.childrenRef.current?.offsetWidth || 0;
		console.log(childrenHeight, childrenWidth);
		const x = e.currentTarget.getBoundingClientRect().left + window.scrollX;
		const y = e.currentTarget.getBoundingClientRect().top + window.scrollY;
		const targetW = e.currentTarget.clientWidth;
		const targetH = e.currentTarget.clientHeight;
		const offset = this.props.offset || 5;
		if (x + targetW + offset + childrenWidth > window.innerWidth) {
			left = x - childrenWidth + targetW;
			if (this.props.centerHorizontal) {
				left += childrenWidth / 2 + targetW;
			}
		} else if (x - childrenWidth - offset < 0) {
			left = x + targetW + offset;
			if (this.props.centerHorizontal) {
				left -= childrenWidth / 2 + targetW;
			}
		} else {
			left = x;
			if (this.props.centerHorizontal) {
				left -= childrenWidth / 2 - targetW / 2;
			}
		}

		if (y + targetH + offset + childrenHeight > window.innerHeight) {
			top = y - offset - childrenHeight;
			if (this.props.centerVertical) {
				top += childrenHeight / 2 + targetH;
			}
		} else if (y - offset - childrenHeight < 0) {
			top = y + targetH + offset;
			if (this.props.centerVertical) {
				top -= childrenHeight / 2 - targetH;
			}
		} else {
			top = y;
			if (this.props.centerVertical) {
				top -= childrenHeight / 2 - targetH / 2;
			}
		}
		this.setState({
			top,
			left,
		});
		this.props.onShow?.(top, left);
	}

	isShow() {
		return this.state.activeMenu;
	}

	renderContent() {
		const content = (
			<div
				className={clsx('t-popup-menu', this.props.className)}
				ref={this.childrenRef}
				onClick={!this.props.keepShowOnClick ? this.handleClose : undefined}
				style={{
					top: this.state.top,
					left: this.state.left,
				}}>
				{this.props.children}
			</div>
		);
		return ReactDOM.createPortal(content, document.body);
	}

	render() {
		return (
			<CSSTransition in={this.state.activeMenu} timeout={250} unmountOnExit>
				<>{this.renderContent()}</>
			</CSSTransition>
		);
	}
}
