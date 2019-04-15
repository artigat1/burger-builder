import React, { Fragment } from 'react';

import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const layout = (props) => (
	<Fragment>
		<Toolbar />
		<SideDrawer />
		<div>Toolbar, Side-drawer, Backdrop</div>
		<main className={classes.Content}>{props.children}</main>
	</Fragment>
);

export default layout;
