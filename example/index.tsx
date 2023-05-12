import React from 'react';
import ReactDOM from 'react-dom';
import '../src/scss/index.scss';
import '../src/scss/theme.scss';
import '../src/dist/icon.css';
import './index.scss';
import DemoButton from './button';
import { Avatar, Modal, TextInput } from '../src';

const DemoUI = () => {
	return (
		<div className="demo-content">
			<h1>Demo UI Component</h1>
			<DemoButton />
			<Modal show={false}>
				<div style={{ height: 200 }}>haha</div>
			</Modal>
			<TextInput errorText="Failed name" icon="icon-check" />
			<Avatar
				size="lg"
				placeholder="tung le"
				src="http://content.fsgn2-4.fna.fbcdn.net/v/t1.6435-9/89995656_2910987539127948_7321879170399600640_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=8Y2g3iae8OYAX_ZFskw&_nc_ht=scontent.fsgn2-4.fna&oh=00_AfAsO4OqFkamcI8Kbhdaig13DYEkSrpLHFXRVawaIu9-6w&oe=6485CF0C"
			/>
		</div>
	);
};

ReactDOM.render(<DemoUI />, document.getElementById('root'));
