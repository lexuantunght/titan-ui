import React from 'react';

const colorWeights = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const colorNames = [
	'red',
	'green',
	'blue',
	'pink',
	'orange',
	'yellow',
	'purple',
	'neutral',
	'sky',
	'slate',
	'lime',
];

const DemoColorTable = () => {
	return (
		<>
			<h3>Color table</h3>
			<table className="demo-colors-table">
				<thead>
					<tr>
						{Array.from(['', ...colorWeights]).map((v, key) => (
							<th key={key}>{v}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{colorNames.map((name, key) => (
						<tr key={key}>
							<td>{name}</td>
							{colorWeights.map((w) => (
								<td key={w}>
									<div
										style={{
											height: 30,
											width: 50,
											backgroundColor: `var(--${name}-${w})`,
										}}
									/>
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export default DemoColorTable;
