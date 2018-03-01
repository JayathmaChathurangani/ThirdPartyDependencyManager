import { Component } from 'react';
import axios from 'axios';
import Config from 'config';

/**
* @class GetProductLibraryDetails
* @extends {Component}
* @description Get outdated Libraries Used by given Product
*/
class GetProductLibraryDetails extends Component {
    /**
    * @class GetProductLibraryDetails
    * @extends {Component}
    * @param {string} pName  product name
    * @param {string} pVersion  product version
    * @description Load Libraries Used by given Product
    */
    getLibrariesOfProduct(pName, pVersion) {
        const url = Config.databaseService[0].host +
        Config.databaseService[1].basePath +
        Config.databaseService[2].resourcePaths[13].productLibraryDetails +
        pName + '/' + pVersion + '/' + Config.referencePoints[0].OutdatedDate;
        return axios.get(url).then((response) => {
            return (response.data);
        }).catch((error) => {
            throw new Error(error);
        });
    }
}

export default (new GetProductLibraryDetails());
