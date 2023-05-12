import React from 'react';
import clsx from 'clsx';
import { PopupMenu as Popup } from './popup';
import { PopupMenuProps, PopupContextMenuRef, PopupMenuItem } from './types';
import ItemPopupRenderer from './item-popup-renderer';

const PopupMenu = (props: PopupMenuProps, ref: React.Ref<PopupContextMenuRef>) => {
	const { items, onHide, className } = props;
	const popupRef = React.useRef<Popup | null>(null);

	React.useImperativeHandle(
		ref,
		() => ({
			toggle: (e) => {
				popupRef.current?.toggle(e);
			},
		}),
		[]
	);

	const renderItemFn = (items: PopupMenuItem[]) => {
		return items.map((item, key) => (
			<ItemPopupRenderer key={key} item={item} renderItemFn={renderItemFn} />
		));
	};

	return (
		<Popup className={clsx('t-popup-menu-container', className)} onHide={onHide} ref={popupRef}>
			{renderItemFn(items)}
		</Popup>
	);
};

export const MemorizedPopupMenu = React.memo(React.forwardRef(PopupMenu));
