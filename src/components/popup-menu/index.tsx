import React from 'react';
import clsx from 'clsx';
import { PopupMenu as Popup } from './popup';
import { PopupMenuProps, PopupMenuItem } from './types';
import ItemPopupRenderer from './item-popup-renderer';

const renderItemFn = (items: PopupMenuItem[]) => {
	if (!items?.length) {
		return null;
	}
	return items.map((item, key) => (
		<ItemPopupRenderer key={key} item={item} renderItemFn={renderItemFn} />
	));
};

export class PopupMenu extends React.PureComponent<PopupMenuProps> {
	private popupRef;
	constructor(props: PopupMenuProps) {
		super(props);
		this.popupRef = React.createRef<Popup>();
	}

	toggle(e: React.MouseEvent<HTMLElement, MouseEvent>) {
		this.popupRef.current?.toggle(e);
	}

	close() {
		this.popupRef.current?.handleClose();
	}

	render() {
		const { items = [], onHide, className, children } = this.props;
		return (
			<Popup
				className={clsx('t-popup-menu-container', className)}
				onHide={onHide}
				onShow={this.props.onShow}
				centerHorizontal={this.props.centerHorizontal}
				centerVertical={this.props.centerVertical}
				keepShowOnClick={this.props.keepShowOnClick}
				offset={this.props.offset}
				ref={this.popupRef}>
				{children ? children : renderItemFn(items)}
			</Popup>
		);
	}
}
