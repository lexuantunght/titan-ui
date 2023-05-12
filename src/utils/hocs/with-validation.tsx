/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React from 'react';

function withValidation<P>(Comp: React.ComponentType<P>) {
	const CustomComp = (props: P & { errorText?: string; isError?: boolean }) => {
		const { errorText, isError, ...others } = props;
		return (
			<>
				<Comp {...others} varriant={errorText || isError ? 'error' : undefined} />
				{!!errorText && (
					<small style={{ color: 'var(--error)', fontSize: 12 }}>{errorText}</small>
				)}
			</>
		);
	};
	return CustomComp;
}

export default withValidation;
