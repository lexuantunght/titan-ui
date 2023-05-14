import React from 'react';
import clsx from 'clsx';
import { PopupMenu as Popup } from './popup';
import { PopupMenuProps, PopupMenuItem } from './types';
import ItemPopupRenderer from './item-popup-renderer';

export class PopupMenu extends React.PureComponent<PopupMenuProps> {
	private popupRef;
	constructor(props: PopupMenuProps) {
		super(props);
		this.popupRef = React.createRef<Popup>();
	}

	toggle(e: React.MouseEvent<HTMLElement, MouseEvent>) {
		this.popupRef.current?.toggle(e);
	}

	renderItemFn(items: PopupMenuItem[]) {
		return items.map((item, key) => (
			<ItemPopupRenderer key={key} item={item} renderItemFn={this.renderItemFn} />
		));
	}

	render() {
		const { items, onHide, className } = this.props;
		return (
			<Popup
				className={clsx('t-popup-menu-container', className)}
				onHide={onHide}
				ref={this.popupRef}>
				{this.renderItemFn(items)}
			</Popup>
		);
	}
}
