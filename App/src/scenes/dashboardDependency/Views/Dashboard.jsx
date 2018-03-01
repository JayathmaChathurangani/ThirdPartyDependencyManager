/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Card } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';
import Drawer from 'material-ui/Drawer';
import Avatar from 'material-ui/Avatar';
import { Grid  } from 'material-ui-next';
import { pink500, blue500, grey900, yellow600 } from 'material-ui/styles/colors';
import GetProductAreas from '../../../services/dashboardDependency/database/GetProductAreas';
import DashboardDetails from '../../../services/dashboardDependency/database/GetDashboardHighlevelSummary';
import ProductAreaGadget from '../Gadgets/ProductAreas';
import LoadingScreen from '../Common/LoadingScreen';

const array = [];
/**
 * @class MainView
 * @extends {Component}
 * @description Sample React component
 */
export default class Dashboard extends Component {
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
            summaryData: [],
            loadDashboard: false,
            loaUIError: false,
            open: false };
        this.handleToggle = this.handleToggle.bind(this);
    }
    /**
    * @class MainView
    * @extends {Component}
    * @description componentDidMount Dashboard
    */
    componentDidMount() {
        this.loadProductAreas();
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
    * @class MainView
    * @extends {Component}
    * @description Load the Product Area names
    */
    loadProductAreas() {
        GetProductAreas.getproductAreas().then((response) => {
            let i = 0;
            let found = false;
            if (response.length > 0) {
                for (i; i < response.length; i++) {
                    if (response[i].pqd_area_name.search('Other', 0)) {
                        if (!found) {
                            array[i] = response[i];
                        } else {
                            array[i - 1] = response[i];
                        }
                    } else {
                        found = true;
                        array[response.length - 1] = response[i];
                    }
                }
                this.setState({
                    data: array,
                });
                DashboardDetails.getDashboardHighlevelSummary().then((response) => {
                    const responseString = JSON.stringify(response);
                    if (responseString.search('ProductAreasWithOutdated', 0) !== -1) {
                        this.setState({
                            summaryData: response,
                            loadDashboard: true,
                        });
                    }
                });
            } else {
                array[0] = 'Error in loading';
                this.setState({
                    loadUIError: true,
                });
            }
        });
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
        const items = this.state.data;
        let returnView;
        if (this.state.loadDashboard) {
            returnView = (
                <div style={{ marginTop: +5, marginLeft: 0 }}>
                    <Grid container>
                        {items.map(item => (
                            <Grid item xs={6} sm={6} md={6} lg={6} key={item.pqd_area_name}>
                                <ProductAreaGadget
                                    dataSummary={this.state.summaryData}
                                    areaName={item.pqd_area_name}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            );
        } else if (this.state.loadUIError) {
            <div style={{ marginTop: +5, marginLeft: 0 }}>
                    <h1>Error Occured</h1>
            </div>
        } else {
            returnView = (
                <div style={{ marginTop: +5, paddingLeft: 0 }}>
                    <LoadingScreen />
                </div>
            );
        }
        return (
            <div>
                { returnView }
            </div>
        );
    }
}
