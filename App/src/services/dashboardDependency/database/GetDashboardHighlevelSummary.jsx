import { Component } from 'react';
import axios from 'axios';
import Config from 'config';

/**
* @class GetDashboardHighlevelSummary
* @extends {Component}
* @description Get outdated Libraries Used by given Component
*/
class GetDashboardHighlevelSummary extends Component {
    /**
    * @class GetDashboardHighlevelSummary
    * @extends {Component}
    * @param {string} cName  component name
    * @param {string} cVersion  component version
    * @description Load Outdated  Libraries Used by given Component
    */
    getDashboardHighlevelSummary() {
        const url = Config.databaseService[0].host +
        Config.databaseService[1].basePath +
        Config.databaseService[2].resourcePaths[16].dashboardSummary;
        return axios.get(url).then((response) => {
            return (response.data);
        }).catch((error) => {
            throw new Error(error);
        });
    }
}

export default (new GetDashboardHighlevelSummary());
