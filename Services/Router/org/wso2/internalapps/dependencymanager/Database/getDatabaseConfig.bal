package org.wso2.internalapps.dependencymanager.Database;

import ballerina.data.sql;
import ballerina.log;
import org.wso2.internalapps.dependencymanager.ConfigFiles;

@Description {value:" Gives LM database configuration"}
public function getLMDatabaseConfiguration () (sql:ClientConnector) {
    json configs = ConfigFiles:getConfigData(CONFIG_FILE_PATH);
    log:printDebug(configs.toString());
    try{
        var dbURL,  _ = (string)configs.LM_JDBC.DB_URL;
        var dbUser, _ = (string)configs.LM_JDBC.DB_USERNAME;
        var dbPassword, _ = (string)configs.LM_JDBC.DB_PASSWORD;
        var dbPoolSize, _ = (string)configs.LM_JDBC.MAXIMUM_POOL_SIZE;
        var maxPoolSize,_=<int>dbPoolSize;

        sql:ConnectionProperties Properties = {url:dbURL,connectionTimeout:36000000,maximumPoolSize:maxPoolSize};
        sql:ClientConnector sqlConnector = create sql:ClientConnector("", "", 0, "", dbUser, dbPassword, Properties);

        return sqlConnector;

    }catch (error err) {
        log:printError("Error " + err.msg);
    }
    return null;
}

@Description {value:" Gives PQD database configuration"}
public function getPQDDatabaseConfiguration () (sql:ClientConnector) {
    json configs = ConfigFiles:getConfigData(CONFIG_FILE_PATH);
    log:printDebug(configs.toString());
    try{
        var dbURL,  _ = (string)configs.PQD_JDBC.DB_URL;
        var dbUser, _ = (string)configs.PQD_JDBC.DB_USERNAME;
        var dbPassword, _ = (string)configs.PQD_JDBC.DB_PASSWORD;
        var dbPoolSize, _ = (string)configs.PQD_JDBC.MAXIMUM_POOL_SIZE;
        var maxPoolSize,_=<int>dbPoolSize;

        sql:ConnectionProperties Properties = {url:dbURL,connectionTimeout:36000000,maximumPoolSize:maxPoolSize};
        sql:ClientConnector sqlConnector = create sql:ClientConnector("", "", 0, "", dbUser, dbPassword, Properties);

        return sqlConnector;

    }catch (error err) {
        log:printError("Error " + err.msg);
    }
    return null;
}