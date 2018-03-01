/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import LibraryBooks from 'material-ui/svg-icons/av/library-books';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import Add from 'material-ui/svg-icons/content/add';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import Description from 'material-ui/svg-icons/action/description';
import DashboardIcon from 'material-ui/svg-icons/action/dashboard';
import ListIcon from 'material-ui/svg-icons/av/featured-play-list';
import Home from 'material-ui/svg-icons/action/home';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import Drawer from 'material-ui/Drawer';
import Avatar from 'material-ui/Avatar';
import SearchIcon from 'material-ui/svg-icons/action/pageview';
import { pink500, blue500, grey900, yellow600 } from 'material-ui/styles/colors';
import GetProductAreas from '../../../services/dashboardDependency/database/GetProductAreas';
import ProductAreaGadget from '../Gadgets/ProductAreas';
import Dashboard from '../Views/Dashboard';
import styles from '../../../mystyles';
const array = [];
/**
 * @class MainView
 * @extends {Component}
 * @description Sample React component
 */
export default class MainView extends Component {
    /**
     * @class ProductAreas
     * @extends {Component}
     * @param {any} props props for constructor
     * @description constructor
     */
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loadUI: false,
            loaUIError: false,
            open: false };
        this.handleToggle = this.handleToggle.bind(this);
    }
    /**
    * @class MainView
    * @extends {Component}
    * @description handle toggle
    */
    handleToggle() {
        this.setState({ open: !this.state.open });
    }
    /**
    * @class ViewByLibrary
    * @extends {Component}
    * @description render methods
    */
    render() {
        const contentStyle = {  transition: 'margin-left 450ms cubic-bezier(0.23, 1, 0.32, 1)' };
        if (this.state.open) {
            contentStyle.marginLeft = 256;
        }
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <div>
                    <div className="App">
                        <div style={{  marginLeft: -15, textAlign: 'left' }}>
                            <AppBar
                                onLeftIconButtonTouchTap={this.handleToggle}
                                title='Third Party Libraries Dashboard'
                            />
                        </div>
                        <div style={{  marginLeft: -15, textAlign: 'left' }}>
                            <Drawer
                                type="persistent"
                                docked={false}
                                open={this.state.open}
                                onRequestChange={(open) => this.setState({ open })}
                                containerStyle={{ height: 'calc(100% - 64px)', top: 110 }}
                            >
                                <Paper>
                                    <Menu>
                                        <Link to="/app/requestRepository" >
                                            <MenuItem
                                                className="icon-menu-wrapper"
                                                primaryText="Repository"
                                                leftIcon={<LibraryBooks />}
                                            />
                                        </Link>
                                        <Link to="/app/requestLibrary" >
                                            <MenuItem
                                                className="icon-menu-wrapper"
                                                primaryText="Library"
                                                leftIcon={<ContentCopy />}
                                            />
                                        </Link>
                                        <Link to="/app/requestLicense" >
                                            <MenuItem
                                                className="icon-menu-wrapper"
                                                primaryText="License"
                                                leftIcon={<Description />}
                                            />
                                        </Link>
                                        <List>
                                            <ListItem
                                                primaryText="Dependency"
                                                leftIcon={<ListIcon />}
                                                style={{ paddingRight: 200 }}
                                                initiallyOpen={true}// eslint-disable-line
                                                primaryTogglesNestedList={true}// eslint-disable-line
                                                nestedItems={[
                                                    <ListItem
                                                        key={1}
                                                        primaryText="Library"
                                                        leftIcon={<SearchIcon />}
                                                        containerElement={<Link to="/app/ViewbyLibrary" />}
                                                    />,
                                                    <ListItem
                                                        key={2}
                                                        primaryText="Product/Component"
                                                        leftIcon={<SearchIcon />}
                                                        containerElement={<Link to="/app/ViewbyProductComponent" />}
                                                    />,
                                                    <ListItem
                                                        key={3}
                                                        primaryText="DashBoard"
                                                        leftIcon={<DashboardIcon />}
                                                        containerElement={<Link to="/dashboard" />}
                                                    />,
                                                ]}
                                            />
                                        </List>
                                    </Menu>
                                </Paper> 
                            </Drawer>
                        </div>
                        <div style={contentStyle}>
                            <Dashboard />
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}
