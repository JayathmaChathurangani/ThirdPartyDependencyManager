import { Component } from 'react';
import axios from 'axios';
import Config from 'config';
/**
* @class GetVersions
* @extends {Component}
* @description Get Product versions of the selected product version
*/
class GetVersions extends Component {
    /**
    * @class GetVersions
    * @extends {Component}
    * @param {String} productName name of the product
    * @description get product versions
    */
    getVersions(productName) {
        const url = Config.databaseService[0].host +
        Config.databaseService[1].basePath +
        Config.databaseService[2].resourcePaths[12].versions + productName;
        return axios.get(url).then((response) => {
            return (response.data);
        }).catch((error) => {
            throw new Error(error);
        });
    }
}

export default (new GetVersions());
