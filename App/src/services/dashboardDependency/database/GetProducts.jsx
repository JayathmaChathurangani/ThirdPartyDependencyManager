import { Component } from 'react';
import axios from 'axios';
import Config from 'config';
/**
* @class GetProductNames
* @extends {Component}
* @description Get ProductNames of the selected product area
*/
class GetProductNames extends Component {
    /**
    * @class GetProductNames
    * @extends {Component}
    * @param {String} productAreaName name of the product area
    * @description get products
    */
    getProducts(productAreaName) {
        const url = Config.databaseService[0].host +
        Config.databaseService[1].basePath +
        Config.databaseService[2].resourcePaths[11].products + productAreaName;
        return axios.get(url).then((response) => {
            return (response.data);
        }).catch((error) => {
            throw new Error(error);
        });
    }
}

export default (new GetProductNames());
