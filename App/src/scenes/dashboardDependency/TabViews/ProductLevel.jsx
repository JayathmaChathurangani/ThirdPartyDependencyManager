import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import ProductLibraryTable from '../Tables/LibrariesOfProduct';
import LibraryTable from '../Tables/LibrariesWithLatestVersionUnknown';

/**
 * @class ProductLevel
 * @extends {Component}
 * @description Sample React component
 */
export default class ProductLevel extends Component {
    /**
     * @class ProductLevel
     * @extends {Component}
     * @param {any} props props for constructor
     * @description constructor
     */
    constructor(props) {
        super(props);
        this.state = {
            allLibraries: [],
            latestVersionUnknownLibraries: [],
            uptodateLibraries: [],
            outdatedRelDateUnknownLibraries: [],
            outdatedLessThanRefDateLibraries: [],
            outdatedGreaterThanRefDateLibraries: [],
            countAllLibraries: 0,
            countLatestVersionUnknownLibraries: 0,
            countUptodateLibraries: 0,
            countOutdatedRelDateUnknownLibraries: 0,
            countOutdatedLessThanRefDateLibraries: 0,
            countOutdatedGreaterThanRefDateLibraries: 0,
            slideIndex: '0',
        };
        this.handleChange = this.handleChange.bind(this);
    }
    /**
    * @class ProductLevel
    * @extends {Component}
    * @description componentDidMount ProductLevel
    */
    componentDidMount() {
      this.setValues(this.props.productLibraryData);// eslint-disable-line
    }
    /**
    * @class ProductVersions
    * @extends {Component}
    * @param {any} libData libraryDetails received
    * @description setValues
    */
    setValues(libData) {
        if (libData.totalLibraries.length > 0) {
            this.setState({
                countAllLibraries: libData.totalLibraries.length,
                allLibraries: libData.totalLibraries,
            });
        }
        if (libData.latestVersionUnknownLibs.length > 0) {
            this.setState({
                countLatestVersionUnknownLibraries: libData.latestVersionUnknownLibs.length,
                latestVersionUnknownLibraries: libData.latestVersionUnknownLibs,
            });
        }
        if (libData.uptodateLibs.length > 0) {
            this.setState({
                countUptodateLibraries: libData.uptodateLibs.length,
                uptodateLibraries: libData.uptodateLibs,
            });
        }
        if (libData.outdatedRelDateUnknownLibs.length > 0) {
            this.setState({
                countOutdatedRelDateUnknownLibraries: libData.outdatedRelDateUnknownLibs.length,
                outdatedRelDateUnknownLibraries: libData.outdatedRelDateUnknownLibs,
            });
        }
        if (libData.outdatedLessThanRefDateLibs.length > 0) {
            this.setState({
                countOutdatedLessThanRefDateLibraries: libData.outdatedLessThanRefDateLibs.length,
                outdatedLessThanRefDateLibraries: libData.outdatedLessThanRefDateLibs,
            });
        }
        if (libData.outdatedGreaterThanRefDateLibs.length > 0) {
            this.setState({
                countOutdatedGreaterThanRefDateLibraries: libData.outdatedGreaterThanRefDateLibs.length,
                outdatedGreaterThanRefDateLibraries: libData.outdatedGreaterThanRefDateLibs,
            });
        }
    }
    /**
    * @class ProductLevel
    * @extends {Component}
    * @param {any} value value
    * @description handling change of tabs
    */
    handleChange(value) {
        this.setState({
            slideIndex: value,
        });
    }
    /**
    * @class ProductLevel
    * @extends {Component}
    * @description render method
    */
    render() {
        const styles = {
            default_tab: {
                color: '#F3E5F5',
                backgroundColor: '#1A237E',
                fontWeight: 400,
            },
            active_tab: {
                color: '#F3E5F5',
                backgroundColor: '#D50000',
            },
        };
        styles.tab = [];
        styles.tab[0] = styles.default_tab;
        styles.tab[1] = styles.default_tab;
        styles.tab[2] = styles.default_tab;
        styles.tab[3] = styles.default_tab;
        styles.tab[4] = styles.default_tab;
        styles.tab[5] = styles.default_tab;
        styles.tab[this.state.slideIndex] = Object.assign({}, styles.tab[this.state.slideIndex], styles.active_tab);
        return (
            <div>
                <Tabs
                    value={this.state.slideIndex}
                    onChange={this.handleChange}
                    style={{ backgroundColor: '#000000' }}
                >
                    <Tab
                        value="0"
                        label={<div>All<br /> Libraries</div>}
                        style={styles.tab[0]}
                    >
                        <div>
                            {this.state.countAllLibraries > 0 ?
                                <div>
                                    <ProductLibraryTable
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
                        value="1"
                        label={<div>UptoDate<br /> Libraries</div>}
                        style={styles.tab[1]}
                    >
                        <div>
                            {this.state.countUptodateLibraries > 0 ?
                                <div>
                                    <ProductLibraryTable
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
                        value="2"
                        label={<div>Latest Version <br />Unknown libraries</div>}
                        style={styles.tab[2]}
                    >
                        <div>
                            {this.state.countLatestVersionUnknownLibraries > 0 ?
                                <div>
                                    <LibraryTable
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
                        value="3"
                        label={<div>Release Date Unknown<br /> outdated libraries</div>}
                        style={styles.tab[3]}
                    >
                        <div>
                            {this.state.countOutdatedRelDateUnknownLibraries > 0 ?
                                <div>
                                    <ProductLibraryTable
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
                        value="4"
                        style={styles.tab[4]}
                        label={<div>Outdated &gt;{this.props.outdatedMonthCount}&nbsp; months<br />
                            (before {this.props.referenceDate})</div>}
                    >
                        <div>
                            {this.state.countOutdatedLessThanRefDateLibraries > 0 ?
                                <div>
                                    <ProductLibraryTable
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
                        value="5"
                        style={styles.tab[5]}
                        label={<div>Outdated &lt;{this.props.outdatedMonthCount}&nbsp; months<br />
                            (after {this.props.referenceDate})</div>}
                    >
                        <div>
                            {this.state.countOutdatedGreaterThanRefDateLibraries > 0 ?
                                <div>
                                    <ProductLibraryTable
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
        );
    }
}
ProductLevel.propTypes = {
    referenceDate: React.PropTypes.string,
};
ProductLevel.defaultProps = {
    referenceDate: React.PropTypes.string,
};
