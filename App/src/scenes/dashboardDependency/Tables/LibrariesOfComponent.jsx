import React from 'react';
import {
    PagingState,
    LocalPaging,
} from '@devexpress/dx-react-grid';
import {
    Grid,
    TableView,
    TableHeaderRow,
    TableColumnResizing,
    PagingPanel,
} from '@devexpress/dx-react-grid-bootstrap3';
import Chip from 'material-ui/Chip';
import LoadingScreen from '../Common/LoadingScreen';
import GetCompOutdatedLibraries from '../../../services/dashboardDependency/database/GetComponentOutdatedLibraries';

/* eslint-disable */
const HighlightedTableCell = ({ value, style, colSpan }) => (
    <td
      style={{
        backgroundColor: 'yellow',
      }}
      colSpan={colSpan}
    >
      <span style={{ color: 'black' }}>{value}</span>
    </td>
);
/* eslint-enable */

const columns = [
    { name: 'Count', title: '' },
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
* @class LibrariesOfComponent
* @extends {Component}
* @description Get libraries of Component
*/
export default class LibrariesOfComponent extends React.PureComponent {
    /**
     * @class LibrariesOfComponent
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
                Count: 100,
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

        this.tableCellTemplate = ({
            column, value, style, colSpan,
        }) => {
            if (column.name === 'LatestVersion') {
                return <HighlightedTableCell value={value} style={style} colSpan={colSpan} />;
            }
            return undefined;
        };
    }
    /**
    * @class LibrariesOfComponent
    * @extends {Component}
    * @description componentDidMount LibrariesOfComponent
    */
    componentDidMount() {
        this.loadTableEntries(this.props.cName,this.props.cVersion);// eslint-disable-line
    }
    /**
    * @class LibrariesOfComponent
    * @extends {Component}
    * @param {any} cName component name
    * @param {any} cVersion component version
    * @description Load libraries of given Component
    */
    loadTableEntries(cName, cVersion) {
        GetCompOutdatedLibraries.getOutdatedLibrariesOfComponent(cName, cVersion).then((response) => {
            let i = 0;
            const array = [];
            if (response.length > 0) {
                for (i; i < response.length; i++) {
                    array[i] = {
                        Count: i + 1,
                        LibraryName: response[i].LIB_NAME,
                        LibraryType: response[i].LIB_TYPE,
                        LibraryVersion: response[i].LIB_VERSION,
                        ReleaseDate: response[i].LIB_DATE,
                        LatestVersion: response[i].LIB_LATEST_VERSION,
                        LatestReleaseDate: response[i].LIB_LATEST_DATE,
                        GroupID: response[i].LIB_ARTIFACT_ID,
                        ArtifactID: response[i].LIB_GROUP_ID,
                    };
                }
                this.setState({
                    tRows: array,
                    numberOfRecords: response.length,
                    showTable: true,
                });
            }
        });
    }
    /**
    * @class LibrariesOfComponent
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
                            <Chip>
                                {this.state.numberOfRecords} libraries are returned
                            </Chip>
                            <Grid
                                rows={this.state.tRows}
                                columns={columns}
                            >
                                <PagingState
                                    defaultCurrentPage={0}
                                    pageSize={8}
                                />
                                <LocalPaging />
                                <TableView tableCellTemplate={this.tableCellTemplate} />
                                <TableColumnResizing defaultColumnWidths={this.state.columnWidths} />
                                <TableHeaderRow allowResizing />
                                <PagingPanel />
                            </Grid>
                        </div>
                        :
                        <Chip>
                            No Libraries Found
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
