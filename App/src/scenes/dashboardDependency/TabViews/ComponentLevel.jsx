import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import LibraryTable from '../Tables/LibrariesOfProduct';
import ComponentLibraryTable from '../Tables/ComponentsLibrariesOfProduct';
import ComponentLibraryTableLatestUnknown from '../Tables/ComponentsLatestUnknown';
import LibraryTableLatestUnknown from '../Tables/LibrariesWithLatestVersionUnknown';
import Components from '../Tables/Components';
/**
 * @class ComponentLevel
 * @extends {Component}
 * @description Sample React component
 */
export default class ComponentLevel extends Component {
    /**
     * @class ComponentLevel
     * @extends {Component}
     * @param {any} props props for constructor
     * @description constructor
     */
    constructor(props) {
        super(props);
        this.state = {
            //  library details array
            allLibraries: [],
            latestVersionUnknownLibraries: [],
            uptodateLibraries: [],
            outdatedRelDateUnknownLibraries: [],
            outdatedLessThanRefDateLibraries: [],
            outdatedGreaterThanRefDateLibraries: [],
            //  library details count
            countAllLibraries: 0,
            countLatestVersionUnknownLibraries: 0,
            countUptodateLibraries: 0,
            countOutdatedRelDateUnknownLibraries: 0,
            countOutdatedLessThanRefDateLibraries: 0,
            countOutdatedGreaterThanRefDateLibraries: 0,
            //  component details array
            allCompWithLibraries: [],
            allCompWithoutLibraries: [],
            latestVersionUnknownCompLibraries: [],
            uptodateCompLibraries: [],
            outdatedRelDateUnknownCompLibraries: [],
            outdatedLessThanRefDateCompLibraries: [],
            outdatedGreaterThanRefDateCompLibraries: [],
            //  component details count
            countAllCompLibraries: 0,
            countAllCompWithLibraries: 0,
            countAllCompWithoutLibraries: 0,
            countLatestVersionUnknownCompLibraries: 0,
            countUptodateCompLibraries: 0,
            countOutdatedRelDateUnknownCompLibraries: 0,
            countOutdatedLessThanRefDateCompLibraries: 0,
            countOutdatedGreaterThanRefDateCompLibraries: 0,
        };
    }
    /**
    * @class ComponentLevel
    * @extends {Component}
    * @description componentDidMount ComponentLevel
    */
    componentDidMount() {
      this.setValues(this.props.componentLibraryData);// eslint-disable-line
    }
    /**
    * @class ComponentLevel
    * @extends {Component}
    * @param {any} libData libraryDetails received
    * @description setValues
    */
    setValues(libData) {
        // setting library details
        if (libData.totalCompLibraries.length > 0) {
            this.setState({
                countAllLibraries: libData.totalCompLibraries.length,
                allLibraries: libData.totalCompLibraries,
            });
        }
        if (libData.latestVersionUnknownCompLibs.length > 0) {
            this.setState({
                countLatestVersionUnknownLibraries: libData.latestVersionUnknownCompLibs.length,
                latestVersionUnknownLibraries: libData.latestVersionUnknownCompLibs,
            });
        }
        if (libData.uptodateCompLibs.length > 0) {
            this.setState({
                countUptodateLibraries: libData.uptodateCompLibs.length,
                uptodateLibraries: libData.uptodateCompLibs,
            });
        }
        if (libData.outdatedRelDateUnknownCompLibs.length > 0) {
            this.setState({
                countOutdatedRelDateUnknownLibraries: libData.outdatedRelDateUnknownCompLibs.length,
                outdatedRelDateUnknownLibraries: libData.outdatedRelDateUnknownCompLibs,
            });
        }
        if (libData.outdatedLessThanRefDateCompLibs.length > 0) {
            this.setState({
                countOutdatedLessThanRefDateLibraries: libData.outdatedLessThanRefDateCompLibs.length,
                outdatedLessThanRefDateLibraries: libData.outdatedLessThanRefDateCompLibs,
            });
        }
        if (libData.outdatedGreaterThanRefDateCompLibs.length > 0) {
            this.setState({
                countOutdatedGreaterThanRefDateLibraries: libData.outdatedGreaterThanRefDateCompLibs.length,
                outdatedGreaterThanRefDateLibraries: libData.outdatedGreaterThanRefDateCompLibs,
            });
        }
        // setting Component details
        if (libData.compAll.length > 0) {
            this.setState({
                countAllCompLibraries: libData.compAll.length,
            });
        }
        if (libData.compWithLibs.length > 0) {
            this.setState({
                allCompWithLibraries: libData.compWithLibs,
            });
        }
        if (libData.compWithNoLibs.length > 0) {
            this.setState({
                countAllCompWithoutLibraries: libData.compWithNoLibs.length,
                allCompWithoutLibraries: libData.compWithNoLibs,
            });
        }
        if (libData.compWithlatestVersionUnknownLibs.length > 0 &&
            libData.countCompWithlatestVersionUnknownLibs.length > 0) {
            this.setState({
                countLatestVersionUnknownCompLibraries: libData.countCompWithlatestVersionUnknownLibs.length,
                latestVersionUnknownCompLibraries: libData.compWithlatestVersionUnknownLibs,
            });
        }
        if (libData.compWithuptodateLibs.length > 0 &&
            libData.countCompWithuptodateLibs.length > 0) {
            this.setState({
                countUptodateCompLibraries: libData.countCompWithuptodateLibs.length,
                uptodateCompLibraries: libData.compWithuptodateLibs,
            });
        }
        if (libData.compWithoutdatedRelDateUnknownLibs.length > 0 &&
            libData.countCompWithoutdatedRelDateUnknownLibs.length > 0) {
            this.setState({
                countOutdatedRelDateUnknownCompLibraries: libData.countCompWithoutdatedRelDateUnknownLibs.length,
                outdatedRelDateUnknownCompLibraries: libData.compWithoutdatedRelDateUnknownLibs,
            });
        }
        if (libData.compWithOutdatedLessThanRefDateLibs.length > 0 &&
            libData.countCompWithOutdatedLessThanRefDateLibs.length > 0) {
            this.setState({
                countOutdatedLessThanRefDateCompLibraries: libData.countCompWithOutdatedLessThanRefDateLibs.length,
                outdatedLessThanRefDateCompLibraries: libData.compWithOutdatedLessThanRefDateLibs,
            });
        }
        if (libData.compWithOutdatedGreaterThanRefDateLibs.length > 0 &&
            libData.countCompWithOutdatedGreaterThanRefDateLibs.length > 0) {
            this.setState({
                countOutdatedGreaterThanRefDateCompLibraries:
                libData.countCompWithOutdatedGreaterThanRefDateLibs.length,
                outdatedGreaterThanRefDateCompLibraries: libData.compWithOutdatedGreaterThanRefDateLibs,
            });
        }
        if (libData.compAll.length > 0 &&
            libData.compWithNoLibs.length >= 0) {
            const countCal = libData.compAll.length - libData.compWithNoLibs.length;
            this.setState({
                countAllCompWithLibraries: countCal,
            });
        }
    }
    /**
    * @class ComponentLevel
    * @extends {Component}
    * @description render method
    */
    render() {
        return (
            <div>
                <Tabs>
                    <Tab
                        label="Component View"
                    >
                        <div>
                            <h5>
                                Summary of Library details is shown component wise.
                                (Click on the icon of component to expand)
                            </h5>
                        </div>
                        <div>
                            <Tabs>
                                <Tab
                                    label={<div>All<br /> Components</div>}
                                >
                                    {this.state.countAllCompLibraries > 0 ?
                                        <div>
                                            <div>{this.state.countAllCompLibraries} Components are Found</div>
                                            <br />
                                            <Tabs>
                                                <Tab
                                                    label={<div>Components with<br /> Libraries</div>}
                                                >
                                                    <div>
                                                        {this.state.countAllCompWithLibraries > 0 ?
                                                            <div>
                                                                <ComponentLibraryTable
                                                                    resultCount={this.state.countAllCompWithLibraries}
                                                                    data={this.state.allCompWithLibraries}
                                                                />
                                                            </div>
                                                            :
                                                            <div>
                                                                No Components to show
                                                            </div>
                                                        }
                                                    </div>
                                                </Tab>
                                                <Tab
                                                    label={<div>Components without<br /> Libraries</div>}
                                                >
                                                    <div>
                                                        {this.state.countAllCompWithoutLibraries > 0 ?
                                                            <div>
                                                                {/* eslint-disable */}
                                                                <Components
                                                                    resultCount={this.state.countAllCompWithoutLibraries}
                                                                    data={this.state.allCompWithoutLibraries}
                                                                />
                                                                {/* eslint-enable */}
                                                            </div>
                                                            :
                                                            <div>
                                                                No Components to show
                                                            </div>
                                                        }
                                                    </div>
                                                </Tab>
                                            </Tabs>
                                        </div>
                                        :
                                        <div>
                                            No Results found
                                        </div>
                                    }
                                </Tab>
                                <Tab
                                    label={<div>With UptoDate<br /> Libraries</div>}
                                >
                                    <div>
                                        {this.state.countUptodateCompLibraries > 0 ?
                                            <div>
                                                <ComponentLibraryTable
                                                    resultCount={this.state.countUptodateCompLibraries}
                                                    data={this.state.uptodateCompLibraries}
                                                />
                                            </div>
                                            :
                                            <div>
                                                No Components to show
                                            </div>
                                        }
                                    </div>
                                </Tab>
                                <Tab
                                    label={<div>With Latest Version <br />Unknown libraries</div>}
                                >
                                    <div>
                                        {this.state.countLatestVersionUnknownCompLibraries > 0 ?
                                            <div>
                                                <ComponentLibraryTableLatestUnknown
                                                    resultCount={this.state.countLatestVersionUnknownCompLibraries}
                                                    data={this.state.latestVersionUnknownCompLibraries}
                                                />
                                            </div>
                                            :
                                            <div>
                                                No Components to show
                                            </div>
                                        }
                                    </div>
                                </Tab>
                                <Tab
                                    label={<div>With Release Date Unknown<br /> outdated libraries</div>}
                                >
                                    <div>
                                        {this.state.countOutdatedRelDateUnknownCompLibraries > 0 ?
                                            <div>
                                                <ComponentLibraryTable
                                                    resultCount={this.state.countOutdatedRelDateUnknownCompLibraries}
                                                    data={this.state.outdatedRelDateUnknownCompLibraries}
                                                />
                                            </div>
                                            :
                                            <div>
                                                No Components to show
                                            </div>
                                        }
                                    </div>
                                </Tab>
                                {/* eslint-disable */}
                                <Tab
                                    label={<div>With Outdated &gt;{this.props.outdatedMonthCount}&nbsp; months<br />
                                        (before {this.props.referenceDate})</div>}
                                >
                                    <div>
                                        {this.state.countOutdatedLessThanRefDateCompLibraries > 0 ?
                                            <div>
                                                <ComponentLibraryTable
                                                    resultCount={this.state.countOutdatedLessThanRefDateCompLibraries}
                                                    data={this.state.outdatedLessThanRefDateCompLibraries}
                                                />
                                            </div>
                                            :
                                            <div>
                                                No Components to show
                                            </div>
                                        }
                                    </div>
                                </Tab>
                                {/* eslint-enable */}
                                <Tab
                                    label={<div>With Outdated &lt;{this.props.outdatedMonthCount}&nbsp; months<br />
                                        (after {this.props.referenceDate})</div>}
                                >
                                    <div>
                                        {this.state.ccountOutdatedGreaterThanRefDateCompLibraries > 0 ?
                                            <div>
                                                <ComponentLibraryTable
                                                    resultCount={this.state.countUptodateCompLibraries}
                                                    data={this.state.countOutdatedGreaterThanRefDateCompLibraries}
                                                />
                                            </div>
                                            :
                                            <div>
                                                No Components to show
                                            </div>
                                        }
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>
                    </Tab>
                    <Tab
                        label="Library View"
                    >
                        <div>
                            <h5>
                                Summary of Library details are shown
                            </h5>
                        </div><br />
                        <div>
                            <Tabs>
                                <Tab
                                    label={<div>All<br /> Libraries</div>}
                                >
                                    <div>
                                        {this.state.countAllLibraries > 0 ?
                                            <div>
                                                <LibraryTable
                                                    data={this.state.allLibraries}
                                                />
                                            </div>
                                            :
                                            <div>
                                                No Libraries to show
                                            </div>
                                        }
                                    </div>
                                </Tab>
                                <Tab
                                    label={<div>UptoDate<br /> Libraries</div>}
                                >
                                    <div>
                                        {this.state.countUptodateLibraries > 0 ?
                                            <div>
                                                <LibraryTable
                                                    data={this.state.uptodateLibraries}
                                                />
                                            </div>
                                            :
                                            <div>
                                                No Libraries to show
                                            </div>
                                        }
                                    </div>
                                </Tab>
                                <Tab
                                    label={<div>Latest Version <br />Unknown libraries</div>}
                                >
                                    <div>
                                        {this.state.countLatestVersionUnknownLibraries > 0 ?
                                            <div>
                                                <LibraryTableLatestUnknown
                                                    data={this.state.latestVersionUnknownLibraries}
                                                />
                                            </div>
                                            :
                                            <div>
                                                No Libraries to show
                                            </div>
                                        }
                                    </div>
                                </Tab>
                                <Tab
                                    label={<div>Release Date Unknown<br /> outdated libraries</div>}
                                >
                                    <div>
                                        {this.state.countOutdatedRelDateUnknownLibraries > 0 ?
                                            <div>
                                                <LibraryTable
                                                    data={this.state.outdatedRelDateUnknownLibraries}
                                                />
                                            </div>
                                            :
                                            <div>
                                                No Libraries to show
                                            </div>
                                        }
                                    </div>
                                </Tab>
                                {/* eslint-disable */}
                                <Tab
                                    label={<div>Outdated &lt;{this.props.outdatedMonthCount}&nbsp; months<br />
                                        (below {this.props.referenceDate})</div>}
                                >
                                    <div>
                                        {this.state.countOutdatedLessThanRefDateLibraries > 0 ?
                                            <div>
                                                <LibraryTable
                                                    data={this.state.outdatedLessThanRefDateLibraries}
                                                />
                                            </div>
                                            :
                                            <div>
                                                No Libraries to show
                                            </div>
                                        }
                                    </div>
                                </Tab>
                                {/* eslint-enable */}
                                <Tab
                                    label={<div>Outdated &gt;{this.props.outdatedMonthCount}&nbsp; months<br />
                                        older
                                        (above {this.props.referenceDate})</div>}
                                >
                                    <div>
                                        {this.state.countOutdatedGreaterThanRefDateLibraries > 0 ?
                                            <div>
                                                <LibraryTable
                                                    data={this.state.outdatedGreaterThanRefDateLibraries}
                                                />
                                            </div>
                                            :
                                            <div>
                                                No Libraries to show
                                            </div>
                                        }
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}
ComponentLevel.propTypes = {
    referenceDate: React.PropTypes.string,
};
ComponentLevel.defaultProps = {
    referenceDate: React.PropTypes.string,
};
