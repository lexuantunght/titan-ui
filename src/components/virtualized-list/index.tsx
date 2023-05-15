import React from 'react';
import List, { ListProps, ListRef } from 'rc-virtual-list';

export type VirtualizedListProps<T> = ListProps<T> & {
	ref?: React.Ref<ListRef> | undefined;
};

class VirtualizedList<T> extends React.PureComponent<VirtualizedListProps<T>> {
	render() {
		return <List {...this.props} />;
	}
}

export default VirtualizedList;
