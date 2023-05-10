import React from 'react';
import clsx from 'clsx';
import { PopupMenu as Popup } from './popup';

export type PopupMenuItem = {
	element: string | JSX.Element | null;
	onclick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	checked?: boolean;
	disabled?: boolean;
	divider?: 'top' | 'bottom' | 'none';
	leftIcon?: JSX.Element;
	items?: PopupMenuItem[];
};

export type PopupMenuProps = {
	items: PopupMenuItem[];
	onHide?: () => void;
	className?: string;
};

export type PopupContextMenuRef = {
	toggle: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

export type PopupPosition = {
	top: number;
	left: number;
};

const PopupMenu = (props: PopupMenuProps, ref: React.Ref<PopupContextMenuRef>) => {
	const { items, onHide, className } = props;
	const popupRef = React.useRef<Popup | null>(null);
	const [basePosition, setBasePosition] = React.useState<PopupPosition>({ top: 0, left: 0 });

	const onShowPopup = (top: number, left: number) => {
		setBasePosition({ top, left });
	};

	React.useImperativeHandle(
		ref,
		() => ({
			toggle: (e) => {
				popupRef.current?.toggle(e);
			},
		}),
		[]
	);

	const getSubPositionFromBase = (basePos: PopupPosition): PopupPosition => {
		const width = 0;
		let left = -width / 2;
		const top = 0;
		if (basePos.left + 2 * width < window.innerWidth) {
			left = width;
		}
		if (basePos.left - width > 0) {
			left = -width;
		}
		return { top, left };
	};

	const renderItemFn = (items: PopupMenuItem[], parentPosition: PopupPosition) => {
		return items.map((item, key) => {
			const position = getSubPositionFromBase(parentPosition);
			return (
				<React.Fragment key={key}>
					{item.divider === 'top' && <div className="t-popup-menu-divider" />}
					<div
						onClick={item.disabled ? undefined : item.onclick}
						className={clsx('t-popup-menu-item', item.disabled && 'disabled')}>
						{item.leftIcon}
						{item.element}
						{item.checked && <i className="t-icon icon-check-fill" />}
						{item.items?.length && (
							<>
								<i className="t-icon icon-right-arrow" />
								<div
									style={{
										...position,
									}}
									className={clsx(
										't-popup-menu-sub',
										't-popup-menu-container',
										className
									)}>
									{renderItemFn(item.items, {
										top: basePosition.top + position.top,
										left: basePosition.left + position.left,
									})}
								</div>
							</>
						)}
					</div>
					{item.divider === 'bottom' && <div className="t-popup-menu-divider" />}
				</React.Fragment>
			);
		});
	};

	return (
		<Popup
			className={clsx('t-popup-menu-container', className)}
			onHide={onHide}
			onShow={onShowPopup}
			ref={popupRef}>
			{renderItemFn(items, basePosition)}
		</Popup>
	);
};

export const MemorizedPopupMenu = React.memo(React.forwardRef(PopupMenu));
