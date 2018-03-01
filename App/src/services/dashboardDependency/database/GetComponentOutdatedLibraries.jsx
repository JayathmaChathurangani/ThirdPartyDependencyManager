import { Component } from 'react';
import axios from 'axios';
import Config from 'config';

/**
* @class GetComponentOutdatedLibraries
* @extends {Component}
* @description Get outdated Libraries Used by given Component
*/
class GetComponentOutdatedLibraries extends Component {
    /**
    * @class GetComponentOutdatedLibraries
    * @extends {Component}
    * @param {string} cName  component name
    * @param {string} cVersion  component version
    * @description Load Outdated  Libraries Used by given Component
    */
    getOutdatedLibrariesOfComponent(cName, cVersion) {
        const url = Config.databaseService[0].host +
        Config.databaseService[1].basePath +
        Config.databaseService[2].resourcePaths[15].outdatedComponentLibraries +
        cName + '/' + cVersion + '/' + Config.referencePoints[0].OutdatedDate;
        return axios.get(url).then((response) => {
            return (response.data);
        }).catch((error) => {
            throw new Error(error);
        });
    }
}

export default (new GetComponentOutdatedLibraries());
