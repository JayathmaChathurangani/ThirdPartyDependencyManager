import { Component } from 'react';
import axios from 'axios';
import Config from 'config';
/**
* @class GetProductAreas
* @extends {Component}
* @description Get ProductAreas
*/
class GetProductAreas extends Component {
    /**
    * @class GetProductAreas
    * @extends {Component}
    * @description get product areas
    */
    getproductAreas() {
        const url = Config.databaseService[0].host +
        Config.databaseService[1].basePath +
        Config.databaseService[2].resourcePaths[10].productAreas;
        return axios.get(url).then((response) => {
            return (response.data);
        }).catch((error) => {
            throw new Error(error);
        });
    }
}

export default (new GetProductAreas());
