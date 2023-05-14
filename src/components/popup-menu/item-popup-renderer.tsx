import React from 'react';
import clsx from 'clsx';
import { PopupMenu as Popup } from './popup';
import { ItemPopupRendererProps } from './types';

const ItemPopupRenderer = ({ item, renderItemFn }: ItemPopupRendererProps) => {
	const subPopupRef = React.useRef<Popup>(null);

	const toggleSubMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		subPopupRef.current?.toggle(e);
	};

	return (
		<React.Fragment>
			{item.divider === 'top' && <div className="t-popup-menu-divider" />}
			<div
				onClick={item.disabled ? undefined : item.onclick}
				onMouseEnter={toggleSubMenu}
				onMouseLeave={toggleSubMenu}
				className={clsx('t-popup-menu-item', item.disabled && 'disabled', item.className)}>
				{item.leftIcon}
				{item.element}
				{item.checked && <i className="t-icon icon-check-fill t-popup-item-check" />}
				{item.items?.length && (
					<>
						<i className="t-icon icon-right-arrow" />
						<Popup
							offset={-5}
							className={clsx('t-popup-menu-container')}
							ref={subPopupRef}>
							{renderItemFn(item.items)}
						</Popup>
					</>
				)}
			</div>
			{item.divider === 'bottom' && <div className="t-popup-menu-divider" />}
		</React.Fragment>
	);
};

export default ItemPopupRenderer;
