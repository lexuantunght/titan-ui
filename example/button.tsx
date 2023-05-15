import React from 'react';
import { Button, PopupMenu, Tooltip } from '../src/index';

const DemoButton = () => {
	const ref = React.useRef<any>(null);
	return (
		<>
			<h3>Button modes & varriables</h3>
			<div className="demo-btn-grid">
				<Button mode="link" varriant="primary">
					Hello World
				</Button>
				<Button mode="text" varriant="warning">
					Hello World
				</Button>
				<Button loading mode="outline" varriant="secondary">
					Hello World
				</Button>
				<Button loading size="sm" mode="fill" varriant="error">
					Hello World
				</Button>
				<Tooltip content="Hello world!">
					<Button onClick={(e) => ref.current.toggle(e)} mode="fill" varriant="light">
						Hello World
					</Button>
				</Tooltip>
			</div>
			<PopupMenu
				ref={ref}
				items={[
					{
						element: (
							<Tooltip content="show tooltip">
								<span>Hello</span>
							</Tooltip>
						),
					},
					{ element: 'hahaha', items: [{ element: 'Test' }] },
				]}
			/>
		</>
	);
};

export default DemoButton;
