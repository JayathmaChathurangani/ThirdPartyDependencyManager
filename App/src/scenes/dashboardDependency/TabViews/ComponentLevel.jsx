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
            slideIndexView: '0',
            slideIndexCompLib: '2',
            slideIndexLib: '10',
            slideIndexComp: '8',
        };
        this.handleChangeLib = this.handleChangeLib.bind(this);
        this.handleChangeView = this.handleChangeView.bind(this);
        this.handleChangeCompLib = this.handleChangeCompLib.bind(this);
        this.handleChangeComp = this.handleChangeComp.bind(this);
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
    * @param {any} value value
    * @description handling change of View tabs
    */
    handleChangeView(value) {
        this.setState({
            slideIndexView: value,
        });
    }
    /**
    * @class ComponentLevel
    * @extends {Component}
    * @param {any} value value
    * @description handling change of component lib tabs
    */
    handleChangeCompLib(value) {
        this.setState({
            slideIndexCompLib: value,
        });
    }
    /**
    * @class ComponentLevel
    * @extends {Component}
    * @param {any} value value
    * @description handling change of   library tabs
    */
    handleChangeLib(value) {
        this.setState({
            slideIndexLib: value,
        });
    }
    /**
    * @class ComponentLevel
    * @extends {Component}
    * @param {any} value value
    * @description handling change of component tabs
    */
    handleChangeComp(value) {
        this.setState({
            slideIndexComp: value,
        });
    }
    /**
    * @class ComponentLevel
    * @extends {Component}
    * @description render method
    */
    render() {
        const styles = {
            active_tab: {
                color: '#F3E5F5',
                backgroundColor: '#D50000',
            },
            default_tab_comp_lib: {
                color: '#F3E5F5',
                backgroundColor: '#1A237E',
                fontWeight: 400,
            },
            default_tab_comp: {
                color: '#F3E5F5',
                backgroundColor: '#1A237E',
                fontWeight: 400,
            },
            default_tab: {
                color: '#F3E5F5',
                backgroundColor: '#004D40',
                fontWeight: 400,
            },
        };
        styles.tab = [];
        styles.tab[0] = styles.default_tab;
        styles.tab[1] = styles.default_tab;
        styles.tab[2] = styles.default_tab_comp_lib;
        styles.tab[3] = styles.default_tab_comp_lib;
        styles.tab[4] = styles.default_tab_comp_lib;
        styles.tab[5] = styles.default_tab_comp_lib;
        styles.tab[6] = styles.default_tab_comp_lib;
        styles.tab[7] = styles.default_tab_comp_lib;
        styles.tab[8] = styles.default_tab_comp;
        styles.tab[9] = styles.default_tab_comp;
        styles.tab[10] = styles.default_tab_comp_lib;
        styles.tab[11] = styles.default_tab_comp_lib;
        styles.tab[12] = styles.default_tab_comp_lib;
        styles.tab[13] = styles.default_tab_comp_lib;
        styles.tab[14] = styles.default_tab_comp_lib;
        styles.tab[15] = styles.default_tab_comp_lib;
        styles.tab[this.state.slideIndexLib] = Object.assign(
            {},
            styles.tab[this.state.slideIndexLib],
            styles.active_tab);
        styles.tab[this.state.slideIndexCompLib] = Object.assign(
            {},
            styles.tab[this.state.slideIndexCompLib],
            styles.active_tab);
        styles.tab[this.state.slideIndexView] = Object.assign(
            {},
            styles.tab[this.state.slideIndexView],
            styles.active_tab);
        styles.tab[this.state.slideIndexComp] = Object.assign(
            {},
            styles.tab[this.state.slideIndexComp],
            styles.active_tab);
        return (
            <div>
                <Tabs
                    value={this.state.slideIndexView}
                    onChange={this.handleChangeView}
                    style={{ backgroundColor: '#000000' }}
                >
                    <Tab
                        value="0"
                        label="Component View"
                        style={styles.tab[0]}
                    >
                        <div>
                            <h5>
                                Summary of Library details is shown component wise.
                                (Select a tab and Click on the icon of component to expand)
                            </h5>
                        </div>
                        <div>
                            <Tabs
                                value={this.state.slideIndexCompLib}
                                onChange={this.handleChangeCompLib}
                                style={{ backgroundColor: '#000000' }}
                            >
                                <Tab
                                    value="2"
                                    style={styles.tab[2]}
                                    label={<div>All<br /> Components</div>}
                                >
                                    {this.state.countAllCompLibraries > 0 ?
                                        <div>
                                            <div>{this.state.countAllCompLibraries} Components are Found</div>
                                            <br />
                                            <Tabs
                                                value={this.state.slideIndexComp}
                                                onChange={this.handleChangeComp}
                                                style={{ backgroundColor: '#000000' }}
                                            >
                                                <Tab
                                                    value="8"
                                                    style={styles.tab[8]}
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
                                                    value="9"
                                                    style={styles.tab[9]}
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
                                    value="3"
                                    style={styles.tab[3]}
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
                                    value="4"
                                    style={styles.tab[4]}
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
                                    value="5"
                                    style={styles.tab[5]}
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
                                    value="6"
                                    style={styles.tab[6]}
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
                                    value="7"
                                    style={styles.tab[7]}
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
                        value="1"
                        label="Library View"
                        style={styles.tab[1]}
                    >
                        <div>
                            <h5>
                                Summary of Library details are shown
                            </h5>
                        </div><br />
                        <div>
                            <Tabs
                                value={this.state.slideIndexLib}
                                onChange={this.handleChangeLib}
                                style={{ backgroundColor: '#000000' }}
                            >
                                <Tab
                                    value="10"
                                    style={styles.tab[10]}
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
                                    value="11"
                                    style={styles.tab[11]}
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
                                    value="12"
                                    style={styles.tab[12]}
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
                                    value="13"
                                    style={styles.tab[13]}
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
                                    value="14"
                                    style={styles.tab[14]}
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
                                    value="15"
                                    style={styles.tab[15]}
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
