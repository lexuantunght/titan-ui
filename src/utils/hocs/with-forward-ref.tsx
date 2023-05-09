import React from 'react';

function withForwardRef<P>(Comp: React.ComponentType<P>) {
	const CustomComp = (props: P, ref: React.LegacyRef<unknown>) => (
		<Comp {...props} innerRef={ref} />
	);
	return React.forwardRef(CustomComp);
}

export default withForwardRef;
