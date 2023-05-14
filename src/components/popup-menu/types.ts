export type PopupProps = {
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
	target: {
		x: number;
		y: number;
		width: number;
		height: number;
	};
};

export type PopupMenuContentProps = PopupProps & {
	handleClose: () => void;
	target: PopupMenuState['target'];
	show?: boolean;
};

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

export type PopupPosition = {
	top: number;
	left: number;
};

export type ItemPopupRendererProps = {
	item: PopupMenuItem;
	renderItemFn: (items: PopupMenuItem[]) => JSX.Element[];
};
