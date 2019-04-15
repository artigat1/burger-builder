import React from 'react';

import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';

const toolbar = (props) => (
	<header className={classes.Toolbar}>
		<div>MENU</div>
		<Logo />
		<nav>
			<ul>
				<li>Link 1</li>
			</ul>
		</nav>
	</header>
);

export default toolbar;
