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

const columns = [
    { name: 'Count', title: '' },
    { name: 'ComponentName', title: 'Component Name' },
    { name: 'ComponentVersion', title: 'Version' },
    { name: 'ComponentType', title: 'Component Type' },
];
/**
* @class Components
* @extends {Component}
* @description Get libraries of product
*/
export default class Components extends React.PureComponent {
    /**
     * @class Components
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
                ComponentName: 400,
                ComponentVersion: 200,
                ComponentType: 190,
            },
            expandedRows: [],
            prodName: '',
            prodVersion: '',
            numberOfRecords: 0,
        };
        this.loadTable = this.loadTable.bind(this);
    }
    /**
    * @class Components
    * @extends {Component}
    * @description componentDidMount Components
    */
    componentDidMount() {
        this.loadTable(this.props.data);// eslint-disable-line
    }
    /**
    * @class Components
    * @extends {Component}
    * @param {any} data data
    * @description Load components of given Product
    */
    loadTable(data) {
        const array = [];
        if (data.length > 0) {
            let i = 0;
            for (i; i < data.length; i++) {
                array[i] = {
                    Count: i + 1,
                    ComponentName: data[i].COMP_NAME,
                    ComponentVersion: data[i].COMP_VERSION,
                    ComponentType: data[i].COMP_TYPE,
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
    * @class Components
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
                                <PagingState
                                    defaultCurrentPage={0}
                                    pageSize={8}
                                />
                                <LocalPaging />
                                <TableView />
                                <TableColumnResizing defaultColumnWidths={this.state.columnWidths} />
                                <TableHeaderRow allowResizing />
                                <PagingPanel />
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
