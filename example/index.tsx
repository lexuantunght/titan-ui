import React from 'react';
import ReactDOM from 'react-dom';
import '../src/scss/index.scss';
import './index.scss';
import DemoButton from './button';

const DemoUI = () => {
	return (
		<div className="demo-content">
			<h1>Demo UI Component</h1>
			<DemoButton />
		</div>
	);
};

ReactDOM.render(<DemoUI />, document.getElementById('root'));
