import React from 'react';
import ReactDOM from 'react-dom';
import '../src/scss/index.scss';
import '../src/scss/theme.scss';
import '../src/dist/icon.css';
import './index.scss';
import DemoButton from './button';
import { Modal } from '../src';

const DemoUI = () => {
	return (
		<div className="demo-content">
			<h1>Demo UI Component</h1>
			<DemoButton />
			<Modal show={true}>
				<div style={{ height: 200 }}>haha</div>
			</Modal>
		</div>
	);
};

ReactDOM.render(<DemoUI />, document.getElementById('root'));
