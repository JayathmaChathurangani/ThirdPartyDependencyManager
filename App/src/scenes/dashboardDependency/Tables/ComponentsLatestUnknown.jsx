import React from 'react';
import {
    GroupingState,
    LocalGrouping,
} from '@devexpress/dx-react-grid';
import {
    Grid,
    TableView,
    TableHeaderRow,
    TableColumnResizing,
    TableGroupRow,
} from '@devexpress/dx-react-grid-bootstrap3';
import Chip from 'material-ui/Chip';
import LoadingScreen from '../Common/LoadingScreen';

const columns = [
    { name: 'Component', title: 'Component' },
    { name: 'LibraryName', title: 'Library Name' },
    { name: 'LibraryType', title: 'Library Type' },
    { name: 'LibraryVersion', title: 'Current Version' },
    { name: 'ReleaseDate', title: 'Release Date' },
    { name: 'LatestVersion', title: 'Latest Version' },
    { name: 'LatestReleaseDate', title: 'Release Date of Latest' },
    { name: 'ArtifactID', title: 'Artifact ID' },
    { name: 'GroupID', title: 'Group ID' },
];
/**
* @class ComponentsLatestUnknown
* @extends {Component}
* @description Get components with outdated libraries of product
*/
export default class ComponentsLatestUnknown extends React.PureComponent {
    /**
     * @class ComponentsLatestUnknown
     * @extends {Component}
     * @param {any} props props for constructor
     * @description Sample React component
     */
    constructor(props) {
        super(props);
        this.state = {
            tRows: [],
            showTable: false,
            columnWidths: {
                Component: 100,
                LibraryName: 400,
                LibraryVersion: 200,
                ReleaseDate: 100,
                LibraryType: 190,
                LatestVersion: 300,
                LatestReleaseDate: 200,
                GroupID: 200,
                ArtifactID: 200,
            },
            expandedRows: [],
            prodName: '',
            prodVersion: '',
            numberOfRecords: 0,
        };
        this.loadTable = this.loadTable.bind(this);
    }
    /**
    * @class ComponentsLatestUnknown
    * @extends {Component}
    * @description componentDidMount ComponentsLatestUnknown
    */
    componentDidMount() {
        this.loadTable(this.props.data);// eslint-disable-line
    }
    /**
    * @class ComponentsLatestUnknown
    * @extends {Component}
    * @param {any} data data
    * @description Load libraries of given Component
    */
    loadTable(data) {
        const array = [];
        if (data.length > 0) {
            let i = 0;
            for (i; i < data.length; i++) {
                array[i] = {
                    Component: data[i].COMPONENT,
                    LibraryName: data[i].LIB_NAME,
                    LibraryType: data[i].LIB_TYPE,
                    LibraryVersion: data[i].LIB_VERSION,
                    ReleaseDate: data[i].LIB_RELEASE_DATE,
                    LatestVersion: data[i].LATEST_VERSION,
                    LatestReleaseDate: data[i].LATEST_VERSION_DATE,
                    GroupID: data[i].ARTIFACT_ID,
                    ArtifactID: data[i].GROUP_ID,
                };
            }
        }
        this.setState({
            tRows: array,
            numberOfRecords: data.length,
            showTable: true,
        });
    }
    /**
    * @class ComponentsLatestUnknown
    * @extends {Component}
    * @description render method
    */
    render() {
        let returnView;
        if (this.state.showTable) {
            returnView = (
                <div style={{ color: '#212121' }}>
                    {this.state.numberOfRecords > 0 ?
                        <div>
                            {/* eslint-disable */}
                            <Chip>
                                {this.props.resultCount} Components are returned
                            </Chip>
                            {/* eslint-enable */}
                            <Grid
                                rows={this.state.tRows}
                                columns={columns}
                            >
                                <GroupingState
                                    grouping={[{ columnName: 'Component' }]}
                                />
                                <LocalGrouping />
                                <TableView />
                                <TableColumnResizing defaultColumnWidths={this.state.columnWidths} />
                                <TableHeaderRow allowResizing />
                                <TableGroupRow />
                            </Grid>
                        </div>
                        :
                        <Chip>
                            No Components Found
                        </Chip>
                    }
                </div>
            );
        } else {
            returnView = (
                <LoadingScreen />
            );
        }
        return (
            <div>
                {returnView}
            </div>
        );
    }
}
