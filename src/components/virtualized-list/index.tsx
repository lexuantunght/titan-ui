import React from 'react';
import List, { ListProps, ListRef } from 'rc-virtual-list';

export type VirtualizedListProps = ListProps<unknown> & {
	ref?: React.Ref<ListRef> | undefined;
};

class VirtualizedList extends React.PureComponent<VirtualizedListProps> {
	render() {
		return <List {...this.props} />;
	}
}

export default VirtualizedList;
