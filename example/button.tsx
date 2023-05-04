import React from 'react';
import { Button } from '../src/index';

const DemoButton = () => {
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
				<Button mode="outline" varriant="secondary">
					Hello World
				</Button>
				<Button loading size="sm" mode="fill" varriant="error">
					Hello World
				</Button>
				<Button mode="fill" varriant="light">
					Hello World
				</Button>
			</div>
		</>
	);
};

export default DemoButton;
