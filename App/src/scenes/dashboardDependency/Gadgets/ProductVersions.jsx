/* eslint no-loop-func: 0 */
import React, { Component } from 'react';
import { Card, CardActions, CardMedia, CardHeader, CardTitle, CardText } from 'material-ui/Card';// eslint-disable-line
import RaisedButton from 'material-ui/RaisedButton';
import Redeye from 'material-ui/svg-icons/image/remove-red-eye';
import Dialog from 'material-ui/Dialog';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import { GridTile } from 'material-ui/GridList';
import { Grid, Typography } from 'material-ui-next';// eslint-disable-line
import Config from 'config';
import notOkPNG from '../../../assets/images/notOK.png';// eslint-disable-line
import okPNG from '../../../assets/images/ok.png';// eslint-disable-line
import alertPNG from '../../../assets/images/alertYellow.png';// eslint-disable-line
import ProductLevelTabs from '../TabViews/ProductLevel';
import ComponentLevelTabs from '../TabViews/ComponentLevel';
import LibrariesOfProd from '../../../services/dashboardDependency/database/GetProductLibraryDetails';
import ProductComponentDetails from '../../../services/dashboardDependency/database/GetProductComponentLibraries';
import LoadingScreen from '../Common/LoadingScreen';

const styles = {
    gridTileStyle: {
        position: 'relative',
        // float: 'left',
        width: '100%',
        minHeight: '500px',
        minWidth: '620px',
        overflow: 'hidden',
        paddingLeft: 10,
    },
};
const customContentStyle = {
    position: 'absolute',
    zIndex: 2000,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
    paddingTop: 0,
    maxWidth: 'none',
};
/**
 * @class Products
 * @extends {Component}
 * @description Sample React component
 */
export default class ProductVersions extends Component {
    /**
     * @class ProductVersions
     * @extends {Component}
     * @param {any} props props for constructor
     * @description constructor
     */
    constructor(props) {
        super(props);
        this.state = {
            conditionRender: '',
            productName: props.prName,
            productVersion: props.prVersion,
            disabledProductLevel: true,
            disabledComponentLevel: true,
            // ProductLevelLibraryCount
            totalProductLibraries: 0,
            totalUptodateProductLibraries: 0,
            totalLatestVersionUnknownProductLibraries: 0,
            totalOutdatedReleaseDateUnknownProductLibraries: 0,
            totalOutdatedReleaseDateLessThanRefProductLibraries: 0,
            totalOutdatedReleaseDateGreaterThanRefProductLibraries: 0,
            // ProductLevelLibraryArrays
            productLibraryDetails: [],
            // ComponentLevelLibraryCount
            totalComponentLibraries: 0,
            totalUptodateComponentLibraries: 0,
            totalLatestVersionUnknownComponentLibraries: 0,
            totalOutdatedReleaseDateUnknownComponentLibraries: 0,
            totalOutdatedReleaseDateLessThanRefComponentLibraries: 0,
            totalOutdatedReleaseDateGreaterThanRefComponentLibraries: 0,
            // ComponnentLevelLibraryArrays
            componentLibraryDetails: [],
            openProduct: false,
            openComponent: false,
            outdatedYears: 0,
            outdatedMonths: 0,
            outdatedDays: 0,
            outdatedReferenceDate: '',
            loadView: false,
            outdatedFound: false,
        };
        this.handleOpenProductDialog = this.handleOpenProductDialog.bind(this);
        this.handleOpenComponentDialog = this.handleOpenComponentDialog.bind(this);
        this.handleCloseProduct = this.handleCloseProduct.bind(this);
        this.handleCloseComponent = this.handleCloseComponent.bind(this);
    }
    /**
    * @class ProductVersions
    * @extends {Component}
    * @description componentDidMount ProductVersions
    */
    componentDidMount() {
        this.getAge();
        this.loadProductLibraries(this.props.prName, this.props.prVersion);
        this.loadProductComponentDetails(this.props.prName, this.props.prVersion);
    }
    /**
    * @class ProductVersions
    * @extends {Component}
    * @description get Age
    */
    getAge() {
        const refDate = Config.referencePoints[0].OutdatedDate;
        const referenceDateMilli = Date.parse(refDate);
        const dateToday = Date.now();
        const difference = dateToday - referenceDateMilli;
        const milliseconds = difference;
        let days = Math.floor(milliseconds / (24 * 60 * 60 * 1000));
        if (days < 0) { days = 0; }
        let months = Math.floor(milliseconds / (30 * 24 * 60 * 60 * 1000));
        if (months < 0) { months = 0; }
        let years = Math.floor(milliseconds / (365 * 30 * 24 * 60 * 60 * 1000));
        if (years < 0) { years = 0; }
        this.setState({
            outdatedYears: years,
            outdatedMonths: months,
            outdatedDays: days,
            outdatedReferenceDate: refDate,
        });
    }
    /**
    * @class ProductVersions
    * @extends {Component}
    * @description handles open event of product dialog
    */
    handleOpenProductDialog() {
        this.setState({ openProduct: true });
    }
    /**
    * @class ProductVersions
    * @extends {Component}
    * @description handles open event of component dialog
    */
    handleOpenComponentDialog() {
        this.setState({ openComponent: true });
    }
    /**
    * @class ProductVersions
    * @extends {Component}
    * @description handles close event of Product dialog
    */
    handleCloseProduct() {
        this.setState({ openProduct: false });
    }
    /**
    * @class ProductVersions
    * @extends {Component}
    * @description handles close event of Component dialog
    */
    handleCloseComponent() {
        this.setState({ openComponent: false });
    }
    /**
    * @class ProductVersions
    * @extends {Component}
    * @param {string} pName product name
    * @param {string} pVersion product version
    * @description Load libraries of given Product
    */
    loadProductLibraries(pName, pVersion) {
        LibrariesOfProd.getLibrariesOfProduct(pName, pVersion).then((response) => {
            const responseString = JSON.stringify(response);
            if (responseString.search('totalLibraries', 0) !== -1) {
                if (response.totalLibraries.length > 0) {
                    this.setState({
                        totalProductLibraries:
                        response.totalLibraries.length,
                    });
                }
                if (response.uptodateLibs.length > 0) {
                    this.setState({
                        totalUptodateProductLibraries:
                        response.uptodateLibs.length,
                    });
                }
                if (response.latestVersionUnknownLibs.length > 0) {
                    this.setState({
                        totalLatestVersionUnknownProductLibraries:
                        response.latestVersionUnknownLibs.length,
                    });
                }
                if (response.outdatedRelDateUnknownLibs.length > 0) {
                    this.setState({
                        totalOutdatedReleaseDateUnknownProductLibraries:
                        response.outdatedRelDateUnknownLibs.length,
                        outdatedFound: true,
                    });
                }
                if (response.outdatedLessThanRefDateLibs.length > 0) {
                    this.setState({
                        totalOutdatedReleaseDateLessThanRefProductLibraries:
                        response.outdatedLessThanRefDateLibs.length,
                        outdatedFound: true,
                    });
                }
                if (response.outdatedGreaterThanRefDateLibs.length > 0) {
                    this.setState({
                        totalOutdatedReleaseDateGreaterThanRefProductLibraries:
                        response.outdatedGreaterThanRefDateLibs.length,
                        outdatedFound: true,
                    });
                }
                if (response.totalLibraries.length > 0) {
                    this.setState({
                        productLibraryDetails: response,
                        disabledProductLevel: false,
                    });
                }
            } else {
                this.setState({
                    outdatedFound: true,
                });
            }
        });
    }
    /**
    * @class ProductVersions
    * @extends {Component}
    * @param {string} pName product name
    * @param {string} pVersion product version
    * @description Load Component details of given Product
    */
    loadProductComponentDetails(pName, pVersion) {
        ProductComponentDetails.getLibrariesAndComponentsOfProduct(pName, pVersion).then((response) => {
            const responseString = JSON.stringify(response);
            if (responseString.search('totalCompLibraries', 0) !== -1) {
                if (response.totalCompLibraries.length > 0) {
                    this.setState({
                        totalComponentLibraries:
                        response.totalCompLibraries.length,
                    });
                }
                if (response.uptodateCompLibs.length > 0) {
                    this.setState({
                        totalUptodateComponentLibraries:
                        response.uptodateCompLibs.length,
                    });
                }
                if (response.latestVersionUnknownCompLibs.length > 0) {
                    this.setState({
                        totalLatestVersionUnknownComponentLibraries:
                        response.latestVersionUnknownCompLibs.length,
                    });
                }
                if (response.outdatedRelDateUnknownCompLibs.length > 0) {
                    this.setState({
                        totalOutdatedReleaseDateUnknownComponentLibraries:
                        response.outdatedRelDateUnknownCompLibs.length,
                        outdatedFound: true,
                    });
                }
                if (response.outdatedLessThanRefDateCompLibs.length > 0) {
                    this.setState({
                        totalOutdatedReleaseDateLessThanRefComponentLibraries:
                        response.outdatedLessThanRefDateCompLibs.length,
                        outdatedFound: true,
                    });
                }
                if (response.outdatedGreaterThanRefDateCompLibs.length > 0) {
                    this.setState({
                        totalOutdatedReleaseDateGreaterThanRefComponentLibraries:
                        response.outdatedGreaterThanRefDateCompLibs.length,
                        outdatedFound: true,
                    });
                }
                this.setState({
                    componentLibraryDetails: response,
                    disabledComponentLevel: false,
                });
            } else {
                this.setState({
                    outdatedFound: true,
                });
            }
            this.setState({ loadView: true });
        });
    }
    /**
    * @class ProductVersions
    * @extends {Component}
    * @description render method
    */
    render() {
        const actionsProduct = [
            <RaisedButton
                label="Close"
                primary={true}//eslint-disable-line
                onClick={this.handleCloseProduct}
            />,
        ];
        const actionsComponent = [
            <RaisedButton
                label="Close"
                primary={true}//eslint-disable-line
                onClick={this.handleCloseComponent}
            />,
        ];
        let returnView;
        if (this.state.loadView) {
            returnView = (
                <div>
                    {/* eslint-disable */}
                    <Card>
                        <CardHeader>
                            <div style={{ backgroundColor: '#212121', paddingRight: '0', paddingLeft: 5, fontSize: '18px' }}>
                                {this.state.totalProductLibraries < 1 & this.state.totalComponentLibraries < 1 ?
                                    <Avatar
                                        size={50}
                                        src={alertPNG}
                                    />
                                    :
                                    [
                                        (this.state.outdatedFound ?
                                            <Avatar
                                                key={0}
                                                size={50}
                                                src={notOkPNG}
                                            />
                                            :
                                            <Avatar
                                                key={0}
                                                size={50}
                                                src={okPNG}
                                            />
                                        )
                                    ]
                                }
                                &nbsp;&nbsp;&nbsp;{this.props.prName}:&nbsp;&nbsp;{this.props.prVersion}
                            </div>
                        </CardHeader>
                        <CardText>
                            <div style={{ textAlign: 'right'}}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>&nbsp;</th>
                                            <th><Chip backgroundColor='#FF3D00'>Product Level</Chip></th>
                                            <th style={{ paddingLeft: 15}}><Chip backgroundColor='#FF3D00'>Component Level</Chip></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td style={{ paddingBottom: 5}}><Chip>Total Libraries</Chip></td>
                                            <td>{this.state.totalProductLibraries}</td>
                                            <td>{this.state.totalComponentLibraries}</td>
                                        </tr>
                                        <tr>
                                            <td style={{ paddingBottom: 5}}><Chip>Uptodate Libraries</Chip></td>
                                            <td>{this.state.totalUptodateProductLibraries}</td>
                                            <td>{this.state.totalUptodateComponentLibraries}</td>
                                        </tr>
                                        <tr>
                                            <td style={{ paddingBottom: 5}}><Chip>Latest Version Unkown</Chip></td>
                                            <td>{this.state.totalLatestVersionUnknownProductLibraries}</td>
                                            <td>{this.state.totalLatestVersionUnknownComponentLibraries}</td>
                                        </tr>
                                        <tr>
                                            <td style={{ paddingBottom: 5}}><Chip>Outdated But Release Date Unkown</Chip></td>
                                            <td>{this.state.totalOutdatedReleaseDateUnknownProductLibraries}</td>
                                            <td>{this.state.totalOutdatedReleaseDateUnknownComponentLibraries}</td>
                                        </tr>
                                        <tr>
                                            <td style={{ paddingBottom: 5}}><Chip>Outdated and &gt;&nbsp;{this.state.outdatedMonths}&nbsp;months&nbsp;(before&nbsp;{this.state.outdatedReferenceDate})</Chip></td>
                                            <td>{this.state.totalOutdatedReleaseDateLessThanRefProductLibraries}</td>
                                            <td>{this.state.totalOutdatedReleaseDateLessThanRefComponentLibraries}</td>
                                        </tr>
                                        <tr>
                                            <td style={{ paddingBottom: 5}}><Chip>Outdated and &lt;&nbsp;{this.state.outdatedMonths}&nbsp;months&nbsp;(after&nbsp;{this.state.outdatedReferenceDate})</Chip></td>
                                            <td>{this.state.totalOutdatedReleaseDateGreaterThanRefProductLibraries}</td>
                                            <td>{this.state.totalOutdatedReleaseDateGreaterThanRefComponentLibraries}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </CardText>
                        <CardActions style={{ padding: 10 }}>
                            <RaisedButton
                                label="Product Level"
                                primary={true}
                                onClick={this.handleOpenProductDialog}
                                disabled={this.state.disabledProductLevel}
                                icon={<Redeye />}
                            />
                            <Dialog
                                    title={<div>Outdated Product Libraries of {this.props.prName} : {this.props.prVersion} </div>}
                                    actions={actionsProduct}
                                    // modal={true}
                                    open={this.state.openProduct}
                                    onRequestClose={this.handleCloseProduct}
                                    contentStyle={customContentStyle}
                                    autoScrollBodyContent={true}
                                >
                                    {/* <ProductLibraryTable
                                        data={this.state.productLibraryDetails}
                                    /> */}
                                    <ProductLevelTabs
                                        productLibraryData={this.state.productLibraryDetails}
                                        referenceDate={this.state.outdatedReferenceDate}
                                        outdatedMonthCount={this.state.outdatedMonths}
                                    />
                            </Dialog>
                            <RaisedButton
                                label="Component Level"
                                primary={true}
                                onClick={this.handleOpenComponentDialog}
                                disabled={this.state.disabledComponentLevel}
                                icon={<Redeye />}
                            />
                            <Dialog
                                    title={<div>Outdated Product Components of {this.props.prName} : {this.props.prVersion} </div>}
                                    actions={actionsComponent}
                                    // modal={true}
                                    open={this.state.openComponent}
                                    onRequestClose={this.handleCloseComponent}
                                    contentStyle={customContentStyle}
                                    autoScrollBodyContent={true}
                                >
                                    <ComponentLevelTabs
                                        componentLibraryData={this.state.componentLibraryDetails}
                                        referenceDate={this.state.outdatedReferenceDate}
                                        outdatedMonthCount={this.state.outdatedMonths}
                                    />
                            </Dialog>
                        </CardActions>
                        {/* eslint-enable */}
                    </Card>
                </div>
            );
        } else {
            returnView = (
                <div>
                    <LoadingScreen />
                </div>
            );
        }
        return (
            <GridTile style={styles.gridTileStyle}>
                { returnView }
            </GridTile>
        );
    }
}
ProductVersions.propTypes = {
    prName: React.PropTypes.string,
    prVersion: React.PropTypes.string,
};
ProductVersions.defaultProps = {
    prName: React.PropTypes.string,
    prVersion: React.PropTypes.string,
};
