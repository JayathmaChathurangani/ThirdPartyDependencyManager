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
* @class LibrariesOfProduct
* @extends {Component}
* @description Get libraries of product
*/
export default class LibrariesOfProduct extends React.PureComponent {
    /**
     * @class LibrariesOfProduct
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
    * @class LibrariesOfProduct
    * @extends {Component}
    * @description componentDidMount LibrariesOfProduct
    */
    componentDidMount() {
        this.loadTable(this.props.data);// eslint-disable-line
    }
    /**
    * @class LibrariesOfProduct
    * @extends {Component}
    * @param {any} data data
    * @description Load libraries of given Product
    */
    loadTable(data) {
        const array = [];
        if (data.length > 0) {
            let i = 0;
            for (i; i < data.length; i++) {
                array[i] = {
                    Count: i + 1,
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
    * @class LibrariesOfProduct
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
