/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import { Card, CardActions, CardMedia, CardHeader, CardTitle, CardText } from 'material-ui/Card';// eslint-disable-line
import { Grid, Typography } from 'material-ui-next';// eslint-disable-line
import Avatar from 'material-ui/Avatar';
import okPNG from '../../../assets/images/ok.png';
import notOkPNG from '../../../assets/images/notOK.png';
import alertPNG from '../../../assets/images/alertYellow.png';
import GetProductVersions from '../../../services/dashboardDependency/database/GetVersions';
import ProductVersionGadget from '../Gadgets/ProductVersions';

/**
 * @class Products
 * @extends {Component}
 * @description Sample React component
 */
export default class Products extends Component {
    /**
     * @class Products
     * @extends {Component}
     * @param {any} props props for constructor
     * @description constructor
     */
    constructor(props) {
        super(props);
        this.state = {
            productName: props.prodName,
            expanded: false,
            uptodate: false,
            errorOccured: false,
            data: [],
        };
        this.setAvatars = this.setAvatars.bind(this);
        this.handleExpandChange = this.handleExpandChange.bind(this);
    }
    /**
    * @class Products
    * @extends {Component}
    * @description componentDidMount Products
    */
    componentDidMount() {
        this.loadVersions();
        this.setAvatars(this.props.dataDashboard, this.props.prodName);
    }
    /**
    * @class Products
    * @extends {Component}
    * @param {any} Arr array
    * @param {any} name name
    * @description set the avatars
    */
    setAvatars(Arr, name) {
        const dataArray = Arr;
        const aName = name;
        const responseStringProductsWithOutdated = JSON.stringify(dataArray.ProductsWithOutdated);
        const responseStringProductsWithoutVersions = JSON.stringify(dataArray.ProductsWithoutVersions);
        const responseStringProductsWithoutLibraries = JSON.stringify(dataArray.ProductsWithoutLibraries);
        if (responseStringProductsWithOutdated.search(aName, 0) !== -1) {
            this.setState({ uptodate: false });
        } else if (responseStringProductsWithoutVersions.search(aName, 0) !== -1) {
            this.setState({ errorOccured: true });
        } else if (responseStringProductsWithoutLibraries.search(aName, 0) !== -1) {
            this.setState({ errorOccured: true });
        } else {
            this.setState({ uptodate: true });
        }
    }
    /**
    * @class Products
    * @extends {Component}
    * @description Load the Product Versions
    */
    loadVersions() {
        GetProductVersions.getVersions(this.state.productName).then((response) => {
            let i = 0;
            const array = [];
            const responseString = JSON.stringify(response);
            if (responseString.search('PRODUCT_VERSION', 0) !== -1) {
                if (response.length > 0) {
                    for (i; i < response.length; i++) {
                        array[i] = response[i].PRODUCT_VERSION;
                    }
                    this.setState({ data: array });
                }
            }
        });
    }
    /**
    * @class Products
    * @extends {Component}
    * @param {any} expand expandstate
    * @description handleExpandChange
    */
    handleExpandChange(expand) {
        this.setState({
            expanded: expand });
    }
    /**
    * @class Products
    * @extends {Component}
    * @description render method
    */
    render() {
        const items = this.state.data;
        return (
            <div
                key={this.props.prodName}
                className="text-left"
                style={{ backgroundColor: '#000000', padding: '4px' }}
            >
                <Card
                    style={{ backgroundColor: '#000000' }}
                    expanded={this.state.expanded}
                    onExpandChange={this.handleExpandChange}
                >
                    <CardHeader
                        actAsExpander={true}// eslint-disable-line
                        showExpandableButton={true}// eslint-disable-line
                        titleStyle={{ fontSize: '22px' }}
                        style={{ backgroundColor: '#212121', paddingRight: '0', paddingLeft: '0', paddingTop: '0' }}
                    >
                        <div style={{
                            backgroundColor: '#212121',
                            paddingRight: '0',
                            paddingLeft: 5,
                            fontSize: '22px' }}
                        >
                            {this.state.uptodate ?
                                <Avatar
                                    size={50}
                                    src={okPNG}
                                />
                                :
                                [
                                    (this.state.errorOccured ?
                                        <Avatar
                                            key={0}
                                            size={50}
                                            src={alertPNG}
                                        />
                                        :
                                        <Avatar
                                            key={0}
                                            size={50}
                                            src={notOkPNG}
                                        />
                                    ),
                                ]
                            }
                            &nbsp;&nbsp;&nbsp;{this.props.prodName}
                        </div>
                    </CardHeader>
                    {/* eslint-disable */}
                    {items.length > 0 ?
                        <CardText expandable={true} >
                            <div style={{
                                marginTop: +5,
                                marginLeft: 0,
                                height: '250px',
                                width: 'auto',
                                overflow: 'auto',
                                }}
                            >
                                {items.map((item) => (
                                    <ProductVersionGadget
                                        key={item}
                                        prName={this.props.prodName}
                                        prVersion={item}
                                    />
                                )) }
                            </div>
                        </CardText>
                        :
                        <div>
                            No version details found
                        </div>
                    }
                    {/* eslint-enable */}
                </Card>
            </div>
        );
    }
}
Products.propTypes = {
    prodName: React.PropTypes.string,
};
Products.defaultProps = {
    prodName: React.PropTypes.string,
};
