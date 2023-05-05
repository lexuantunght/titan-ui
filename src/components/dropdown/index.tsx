import React from 'react';
import clsx from 'clsx';

export type ItemDropdown = {
	value: React.ReactNode;
	label: string;
};

export type DropdownProps = {
	options?: ItemDropdown[];
	value?: React.ReactNode;
	onChange?: (item: React.ReactNode) => void;
	className?: string;
	id?: string;
};

export type DropdownState = {
	isOpen: boolean;
};

export class Dropdown extends React.PureComponent<DropdownProps, DropdownState> {
	contentRef: React.RefObject<HTMLDivElement>;
	constructor(props: DropdownProps) {
		super(props);
		this.state = {
			isOpen: false,
		};
		this.contentRef = React.createRef();
		this.handleClose = this.handleClose.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
	}

	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside, false);
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside, false);
	}

	handleClose = () => {
		this.setState({ isOpen: false });
	};

	handleClickOutside = (event: MouseEvent) => {
		if (this.state.isOpen && !this.contentRef.current?.contains(event.target as Node)) {
			this.handleClose();
			return;
		}
	};

	render() {
		const { options = [], className, onChange, id, value } = this.props;
		const { isOpen } = this.state;
		return (
			<div className={clsx('t-dropdown', className)} ref={this.contentRef} id={id}>
				<button
					type="button"
					className="t-dropdown-button"
					onClick={() => this.setState({ isOpen: !isOpen })}>
					<div className="t-dropdown-value">{value || options[0]?.value}</div>
					<i
						className={clsx(
							't-dropdown-indicator t-icon icon-down-arrow',
							isOpen && 'rotate'
						)}
					/>
				</button>
				<div className={clsx('t-dropdown-content', isOpen && 'open')}>
					{options.map((item, index) => (
						<div
							key={index}
							onClick={() => {
								onChange?.(item.value);
								this.handleClose();
							}}>
							{item.value}
						</div>
					))}
				</div>
			</div>
		);
	}
}
