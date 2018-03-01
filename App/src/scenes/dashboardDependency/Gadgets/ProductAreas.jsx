/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import { Card, CardMedia, CardHeader, CardTitle, CardText } from 'material-ui/Card';// eslint-disable-line
import { Grid, Typography } from 'material-ui-next';// eslint-disable-line
import okPNG from '../../../assets/images/ok.png';
import notOkPNG from '../../../assets/images/notOK.png';
import alertPNG from '../../../assets/images/alertYellow.png';
import GetProductNames from '../../../services/dashboardDependency/database/GetProducts';
import ProductGadget from '../Gadgets/Products';

/**
 * @class ProductAreas
 * @extends {Component}
 * @description Sample React component
 */
export default class ProductAreas extends Component {
    /**
     * @class ProductAreas
     * @extends {Component}
     * @param {any} props props for constructor
     * @description constructor
     */
    constructor(props) {
        super(props);
        this.state = {
            productsAvailable: true,
            uptodate: false,
            errorOccured: false,
            summary: [],
            data: [],
            dataDash: props.dataSummary,
            productAreaName: props.areaName,
            expanded: false,
        };
        this.setAvatars = this.setAvatars.bind(this);
        this.handleExpandChange = this.handleExpandChange.bind(this);
    }
    /**
    * @class ProductAreas
    * @extends {Component}
    * @description componentDidMount ProductAreas
    */
    componentDidMount() {
        this.loadProducts();
        this.setAvatars(this.props.dataSummary, this.props.areaName);
    }
    /**
    * @class ProductAreas
    * @extends {Component}
    * @param {any} Arr array
    * @param {any} name name
    * @description set the avatars
    */
    setAvatars(Arr, name) {
        const dataArray = Arr;
        const aName = name;
        const responseStringProductAreasWithOutdated = JSON.stringify(dataArray.ProductAreasWithOutdated);
        const responseStringProductAreasWithoutProducts = JSON.stringify(dataArray.ProductAreasWithoutProducts);
        if (responseStringProductAreasWithOutdated.search(aName, 0) !== -1) {
            this.setState({ uptodate: false });
        } else if (responseStringProductAreasWithoutProducts.search(aName, 0) !== -1) {
            this.setState({ errorOccured: true });
        } else {
            this.setState({ uptodate: true });
        }
    }
    /**
    * @class ProductAreas
    * @extends {Component}
    * @description Load the Product names
    */
    loadProducts() {
        GetProductNames.getProducts(this.state.productAreaName).then((response) => {
            let i = 0;
            const array = [];
            const responseString = JSON.stringify(response);
            if (responseString.search('PRODUCT_NAME', 0) !== -1) {
                if (response.length > 0) {
                    for (i; i < response.length; i++) {
                        array[i] = response[i];
                    }
                    this.setState({ data: array });
                }
            } else {
                this.setState({ productsAvailable: false });
            }
        });
    }
    /**
    * @class ProductAreas
    * @extends {Component}
    * @param {any} expand expandstate
    * @description handleExpandChange
    */
    handleExpandChange(expand) {
        this.setState({
            expanded: expand });
    }
    /**
    * @class ProductAreas
    * @extends {Component}
    * @description render method
    */
    render() {
        const items = this.state.data;
        return (
            <div
                key={this.props.areaName}
                className="text-left"
                style={{ backgroundColor: '#000000', padding: '4px' }}
            >
                <Card
                    style={{ backgroundColor: '#000000' }}
                    expanded={this.state.expanded}
                    onExpandChange={this.handleExpandChange}
                >
                    {/* eslint-disable */}
                    <CardHeader
                        actAsExpander={true}// eslint-disable-line
                        showExpandableButton={true}// eslint-disable-line
                        titleStyle={{ fontSize: '22px' }}
                        style={{ backgroundColor: '#212121', paddingRight: '0', paddingLeft: '0', paddingTop: '0' }}
                    >
                        <div style={{ backgroundColor: '#212121', paddingRight: '0', paddingLeft: 5, fontSize: '24px' }}>
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
                                    )
                                ]
                            }
                            &nbsp;&nbsp;&nbsp;{this.props.areaName}
                        </div>
                    </CardHeader>
                    {items.length > 0 ?
                        <CardText expandable={true} >
                            <div style={{ marginTop: +5, marginLeft: 0 }}>
                                <Grid container style={{ display: 'flex'}}>
                                    {items.map(item => (
                                        <Grid item xs={12} sm={12} md={12} lg={12} key={item.PRODUCT_NAME}>
                                            <ProductGadget
                                                dataDashboard={this.state.dataDash}
                                                prodName={item.PRODUCT_NAME}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </div>
                        </CardText>
                        :
                        <CardText expandable={true} >
                            <div style={{ marginTop: +5, marginLeft: 0 }}>
                                No Products to Show
                            </div>
                        </CardText>
                    }
                    {/* eslint-enable */}
                </Card>
            </div>
        );
    }
}
ProductAreas.propTypes = {
    areaName: React.PropTypes.string,
};
ProductAreas.defaultProps = {
    areaName: React.PropTypes.string,
};
