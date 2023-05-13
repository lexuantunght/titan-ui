import React from 'react';
import clsx from 'clsx';
import TabItem, { TabItemProps } from './tab-item';
import TabTitle from './tab-title';

export type TabProps = {
	children: React.ReactElement<TabItemProps>[];
	className?: string;
	defaultFocused?: number;
};

export type TabState = {
	focused: number;
	focusedInfo: {
		offset: number;
		width: number;
	};
};

class Tab extends React.PureComponent<TabProps, TabState> {
	constructor(props: TabProps) {
		super(props);
		this.state = {
			focused: props.defaultFocused || 0,
			focusedInfo: {
				offset: 0,
				width: 0,
			},
		};
		this.onClickTab = this.onClickTab.bind(this);
		this.onMountedDefaultTab = this.onMountedDefaultTab.bind(this);
	}

	static Item(props: TabItemProps) {
		return <TabItem {...props} />;
	}

	onClickTab(e: React.MouseEvent<HTMLDivElement, MouseEvent>, key: number) {
		const offset = e.currentTarget.offsetLeft;
		const width = e.currentTarget.clientWidth;
		this.setState({ focused: key, focusedInfo: { offset, width } });
	}

	onMountedDefaultTab(el: HTMLDivElement, key: number) {
		if (this.state.focused === key) {
			const offset = el.offsetLeft;
			const width = el.clientWidth;
			this.setState({ focusedInfo: { offset, width } });
		}
	}

	render() {
		const { className, children } = this.props;
		const { focused, focusedInfo } = this.state;

		return (
			<div className={clsx('t-tab-container', className)}>
				<div className="t-tab-header">
					{children.map((tab, key) => (
						<TabTitle
							onClick={this.onClickTab}
							onMounted={this.onMountedDefaultTab}
							focused={focused === key}
							index={key}
							key={key}>
							{tab.props.title}
						</TabTitle>
					))}
					<div
						style={{
							width: focusedInfo.width,
							left: focusedInfo.offset,
						}}
						className="t-tab-indicator"
					/>
				</div>
				{children[focused]?.props.children}
			</div>
		);
	}
}

export default Tab;
