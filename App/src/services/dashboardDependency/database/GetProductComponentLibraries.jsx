import { Component } from 'react';
import axios from 'axios';
import Config from 'config';

/**
* @class GetProductComponentLibraries
* @extends {Component}
* @description Get Library details of the components Used by given Product
*/
class GetProductComponentLibraries extends Component {
    /**
    * @class GetProductReleaseDateUnknownLibraries
    * @extends {Component}
    * @param {string} pName  product name
    * @param {string} pVersion  product version
    * @description Load Library details of the components Used by given Product
    */
    getLibrariesAndComponentsOfProduct(pName, pVersion) {
        const url = Config.databaseService[0].host +
        Config.databaseService[1].basePath +
        Config.databaseService[2].resourcePaths[14].productComponentLibraries +
        pName + '/' + pVersion + '/' + Config.referencePoints[0].OutdatedDate;
        return axios.get(url).then((response) => {
            return (response.data);
        }).catch((error) => {
            throw new Error(error);
        });
    }
}

export default (new GetProductComponentLibraries());
