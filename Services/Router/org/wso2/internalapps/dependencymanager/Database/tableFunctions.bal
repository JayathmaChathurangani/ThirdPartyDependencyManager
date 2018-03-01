package org.wso2.internalapps.dependencymanager.Database;

import ballerina.data.sql;
import ballerina.log;
import ballerina.net.http;

public function selectLibraryDropDown()(json){
    endpoint<sql:ClientConnector> sqlCon {
    }
    sql:ClientConnector sqlConnectionLM = getLMDatabaseConfiguration();
    datatable libdt;

    try{
        bind sqlConnectionLM with sqlCon;

        sql:Parameter[] paramsLibraryNameQuery = [];
        libdt = sqlCon.select(LM_DB_LIBRARY_DROP_DOWN,paramsLibraryNameQuery);

        var JSONResponse,err = <json>libdt;
        log:printDebug(JSONResponse.toString());
        libdt.close();

        if(lengthof JSONResponse != 0){
            log:printInfo("Library Names were Successfully Retreived");
            sqlCon.close();
            return JSONResponse;
        }
    }catch (error err) {
        json errorMessage = {"responseType":"Error","responseMessage":err.msg};
        log:printError(err.msg);
        if(sqlConnectionLM  !=  null){
            sqlCon.close();
        }
        return errorMessage;
    }
    json errorMessage = {"responseType":"Error","responseMessage":"Not Found"};
    sqlCon.close();
    return errorMessage;
}

public function selectLibraryVersionDropDown(string requestedLibrary)(json){
    endpoint<sql:ClientConnector> sqlCon {
    }
    sql:ClientConnector sqlConnection = getLMDatabaseConfiguration();
    datatable libdt;

    try{
        bind sqlConnection with sqlCon;
        sql:Parameter[] paramslibraryQuery = [];
        sql:Parameter paraName = {sqlType:"varchar", value:requestedLibrary};
        paramslibraryQuery  =  [paraName];

        libdt = sqlCon.select(LM_DB_LIBRARY_VERSION_DROP_DOWN, paramslibraryQuery);
        var JSONResponse,err = <json>libdt;
        log:printDebug(JSONResponse.toString());
        libdt.close();

        if(lengthof JSONResponse != 0){
            log:printInfo("Library Versions were Successfully Retreived");
            sqlCon.close();
            return JSONResponse;
        }
    }catch (error err) {
        json errorMessage = {"responseType":"Error","responseMessage":err.msg};
        log:printError(err.msg);
        if(sqlConnection !=  null){
            sqlCon.close();
        }
        return errorMessage;
    }
    json errorMessage = {"responseType":"Error","responseMessage":"Not Found"};
    sqlCon.close();
    return errorMessage;
}

public function selectProductVersionDropDown(string requestedProduct)(json){
    endpoint<sql:ClientConnector> sqlCon {
    }
    sql:ClientConnector sqlConnection = getLMDatabaseConfiguration();
    datatable libdt;

    try{
        bind sqlConnection with sqlCon;
        sql:Parameter[] paramsProductQuery = [];
        sql:Parameter paraName = {sqlType:"varchar", value:requestedProduct};
        paramsProductQuery  =  [paraName];

        libdt = sqlCon.select(LM_DB_PRODUCT_VERSION_DROP_DOWN, paramsProductQuery);
        var JSONResponse,err = <json>libdt;
        log:printDebug(JSONResponse.toString());
        libdt.close();

        if(lengthof JSONResponse != 0){
            sqlCon.close();
            log:printInfo("Product Versions were Successfully Retreived");
            return JSONResponse;
        }
    }catch (error err) {
        json errorMessage = {"responseType":"Error","responseMessage":err.msg};
        log:printError(err.msg);
        if(sqlConnection !=  null){
            sqlCon.close();
        }
        return errorMessage;
    }
    json errorMessage = {"responseType":"Error","responseMessage":"Not Found"};
    sqlCon.close();
    return errorMessage;
}

public function selectComponentVersionDropDown(string requestedComponent)(json){
    endpoint<sql:ClientConnector> sqlCon {
    }
    sql:ClientConnector sqlConnection = getLMDatabaseConfiguration();
    datatable libdt;

    try{
        bind sqlConnection with sqlCon;
        sql:Parameter[] paramsCompQuery = [];
        sql:Parameter paraName = {sqlType:"varchar", value:requestedComponent};
        paramsCompQuery  =  [paraName];

        libdt = sqlCon.select(LM_DB_COMPONENT_VERSION_DROP_DOWN, paramsCompQuery);
        var JSONResponse,err = <json>libdt;
        log:printDebug(JSONResponse.toString());
        libdt.close();

        if(lengthof JSONResponse != 0){
            log:printInfo("Component Versions were Successfully Retreived");
            sqlCon.close();
            return JSONResponse;
        }
    }catch (error err) {
        json errorMessage = {"responseType":"Error","responseMessage":err.msg};
        log:printError(err.msg);
        if(sqlConnection !=  null){
            sqlCon.close();
        }
        return errorMessage;
    }
    json errorMessage = {"responseType":"Error","responseMessage":"Not Found"};
    sqlCon.close();
    return errorMessage;
}

public function selectArtifactGroupIDsLibrary(string requestedLibrary, string libraryVersion)(json){
    endpoint<sql:ClientConnector> sqlCon {
    }
    sql:ClientConnector sqlConnection = getLMDatabaseConfiguration();
    datatable libdt;

    try{
        bind sqlConnection with sqlCon;
        sql:Parameter[] paramsProductQuery = [];
        sql:Parameter paraName = {sqlType:"varchar", value:requestedLibrary};
        sql:Parameter paraVersion = {sqlType:"varchar", value:libraryVersion};
        paramsProductQuery  =  [paraName,paraVersion];

        libdt = sqlCon.select(LM_DB_LIBRARY_ARTIFACT_GROUP, paramsProductQuery);
        var JSONResponse,err = <json>libdt;
        log:printDebug(JSONResponse.toString());
        libdt.close();

        if(lengthof JSONResponse != 0){
            log:printInfo("Artifact ID and Group ID of the given Library were Successfully Retreived");
            sqlCon.close();
            return JSONResponse;
        }
    }catch (error err) {
        json errorMessage = {"responseType":"Error","responseMessage":err.msg};
        log:printError(err.msg);
        if(sqlConnection !=  null){
            sqlCon.close();
        }
        return errorMessage;
    }
    json errorMessage = {"responseType":"Error","responseMessage":"NotFound"};
    sqlCon.close();
    return errorMessage;
}

public function viewByLibrary(string givenLibrary, string givenVersion)(json){
    endpoint<sql:ClientConnector> sqlCon {
    }
    sql:ClientConnector sqlConnection = getLMDatabaseConfiguration();
    datatable libdtLibraryProducts;
    datatable libdtLibraryComponents;
    datatable dtCompProduct;
    json returnMsg = { data:[]};

    try{
        bind sqlConnection with sqlCon;
        sql:Parameter[] paramsQuery = [];

        sql:Parameter paraLName = {sqlType:"varchar", value:givenLibrary};
        sql:Parameter paraLVersion = {sqlType:"varchar", value:givenVersion};
        paramsQuery  =  [paraLName,paraLVersion];

        libdtLibraryProducts = sqlCon.select(LM_DB_LIBRARY_PRODUCTS, paramsQuery);
        var JSONLibraryProductResponse, err = <json>libdtLibraryProducts;
        log:printDebug(JSONLibraryProductResponse.toString());
        libdtLibraryProducts.close();

        if(lengthof JSONLibraryProductResponse != 0){
            int i = 0;
            while(i < (lengthof JSONLibraryProductResponse)){
                json element = {"PRODUCT_LEVEL_DEPENDENCY": "Yes", "PRODUCT_NAME":JSONLibraryProductResponse[i].PRODUCT_NAME, "PRODUCT_VERSION":JSONLibraryProductResponse[i].PRODUCT_VERSION, "COMPONENT_NAME":"-", "COMP_VERSION":"-", "COMP_TYPE":"-"};
                returnMsg.data[lengthof returnMsg.data]=element;
                i  = i+1;
            }
        }

        log:printInfo("Finished retrieving products using the given library");

        libdtLibraryComponents = sqlCon.select(LM_DB_LIBRARY_COMPONENTS, paramsQuery);
        var JSONLibraryComponentsResponse, err = <json>libdtLibraryComponents;
        log:printDebug(JSONLibraryComponentsResponse.toString());
        libdtLibraryComponents.close();

        if(lengthof JSONLibraryComponentsResponse != 0){
            int j = 0;
            while(j < (lengthof JSONLibraryComponentsResponse)){
                string compName  = JSONLibraryComponentsResponse[j].COMP_NAME.toString();
                string compVersion = JSONLibraryComponentsResponse[j].COMP_VERSION.toString();
                string compType  = JSONLibraryComponentsResponse[j].COMP_TYPE.toString();

                sql:Parameter[] paramsCompQuery = [];

                sql:Parameter paraCName = {sqlType:"varchar", value:compName};
                sql:Parameter paraCVersion = {sqlType:"varchar", value:compVersion};
                paramsCompQuery  =  [paraCName,paraCVersion];

                dtCompProduct  = sqlCon.select(LM_DB_COMPONENT_PRODUCTS, paramsCompQuery);
                var JSONCompProductResponse, err = <json>dtCompProduct;
                log:printDebug(JSONCompProductResponse.toString());
                dtCompProduct.close();

                if(lengthof JSONCompProductResponse != 0){
                    int k = 0;
                    while(k  <  (lengthof JSONCompProductResponse)){
                        json element = {"PRODUCT_LEVEL_DEPENDENCY": "No", "PRODUCT_NAME":JSONCompProductResponse[k].PRODUCT_NAME, "PRODUCT_VERSION":JSONCompProductResponse[k].PRODUCT_VERSION, "COMPONENT_NAME":compName, "COMP_VERSION":compVersion, "COMP_TYPE":compType };
                        returnMsg.data[lengthof returnMsg.data]=element;
                        k = k+1;
                    }
                }
                j = j+ 1;
            }
        }

        log:printInfo("Finished retrieving components using the given library");
        sqlCon.close();
        return returnMsg;
    }catch (error err) {
        json errorMessage = {"responseType":"Error","responseMessage":err.msg};
        if(sqlConnection !=  null){
            sqlCon.close();
        }
        log:printError(err.msg);
        return errorMessage;
    }
    json errorMessage = {"responseType":"Other","responseMessage":"NotFound"};
    sqlCon.close();
    return errorMessage;
}

public function selectProductsAndComponents()(json){
    endpoint<sql:ClientConnector> sqlCon {
    }
    sql:ClientConnector sqlConnection = getLMDatabaseConfiguration();
    datatable dtProducts;
    datatable dtComponents;
    json returnMsg = { products:[], components:[]};
    json element;

    try{
        bind sqlConnection with sqlCon;
        sql:Parameter[] paramsQuery = [];

        dtProducts = sqlCon.select(LM_DB_PRODUCT_DROP_DOWN, paramsQuery);
        var JSONProductResponse, err = <json>dtProducts;
        log:printDebug(JSONProductResponse.toString());
        dtProducts.close();

        if(lengthof JSONProductResponse !=  0){
            int i = 0;
            while(i < (lengthof JSONProductResponse)){
                element = {"NAME": JSONProductResponse[i].PRODUCT_NAME};
                returnMsg.products[lengthof returnMsg.products]=element;
                i   =  i +1;
            }
        }
        log:printInfo("Finished retreiving product names");

        dtComponents = sqlCon.select(LM_DB_COMPONENT_DROP_DOWN, paramsQuery);
        var JSONComponentResponse, err = <json>dtComponents;
        log:printDebug(JSONComponentResponse.toString());
        dtComponents.close();

        if(lengthof JSONComponentResponse !=  0){
            int j = 0;
            while(j < (lengthof JSONComponentResponse)){
                element = {"NAME": JSONComponentResponse[j].COMP_NAME};
                returnMsg.components[lengthof returnMsg.components]=element;
                j   =  j +1;
            }
        }
        sqlCon.close();
        log:printInfo("Finished retreiving component names");
        return returnMsg;
    }catch (error err) {
        json errorMessage = {"responseType":"Error","responseMessage":err.msg};
        if(sqlConnection !=  null){
            sqlCon.close();
        }
        log:printError(err.msg);
        return errorMessage;
    }
    json errorMessage = {"responseType":"Other","responseMessage":"NotFound"};
    sqlCon.close();
    return errorMessage;
}

public function selectLibrariesForSelectedComponent(string requestedComponent, string componentVersion, http:HttpClient httpClient)(json){
    endpoint<sql:ClientConnector> sqlCon {
    }
    endpoint<http:HttpClient> httpEndpoint {
        httpClient;
    }
    sql:ClientConnector sqlConnection = getLMDatabaseConfiguration();
    http:Response resp = {};
    http:Request req = {};
    json jsonReqMsg;
    json jsonRespMsg;
    datatable dtLibrary;
    json element   =  {};
    json returnMsg = { Libraries:[]};

    try{
        bind sqlConnection with sqlCon;

        sql:Parameter[] paramsQuery = [];
        sql:Parameter paraName = {sqlType:"varchar", value:requestedComponent};
        sql:Parameter paraVersion = {sqlType:"varchar", value:componentVersion};
        paramsQuery = [paraName, paraVersion];

        log:printInfo("Start retrieving Library details for the given component");

        dtLibrary = sqlCon.select(LM_DB_COMPONENT_LIBRARIES_DETAIL, paramsQuery);
        var JSONResponse, err = <json>dtLibrary;
        log:printDebug(JSONResponse.toString());
        dtLibrary.close();

        int i = 0;
        string httpQuery;

        while (i < (lengthof JSONResponse)) {
            if (JSONResponse[i].LIB_ARTIFACT_ID != null) {
                var groupID, castErr = (string)JSONResponse[i].LIB_GROUP_ID;
                var libType, castErr = (string)JSONResponse[i].LIB_TYPE;

                httpQuery = libType+"?VersionReq=true&GroupID=" + groupID;
                jsonReqMsg = {"groupID":JSONResponse[i].LIB_GROUP_ID, "artifactID":JSONResponse[i].LIB_ARTIFACT_ID};

                req.setJsonPayload(jsonReqMsg);
                resp, _ = httpEndpoint.post(httpQuery, req);

                if(resp.getStatusCode() == 200){
                    jsonRespMsg = resp.getJsonPayload();
                    element = {"LIB_NAME":JSONResponse[i].LIB_NAME, "LIB_TYPE":JSONResponse[i].LIB_TYPE, "LIB_VERSION":JSONResponse[i].LIB_VERSION, "LATEST_VERSION":jsonRespMsg.NewestVersion, "GROUP_ID":JSONResponse[i].LIB_GROUP_ID, "ARTIFACT_ID":JSONResponse[i].LIB_ARTIFACT_ID};
                    returnMsg.Libraries[lengthof returnMsg.Libraries] = element;
                }else{
                    element = {"LIB_NAME":JSONResponse[i].LIB_NAME, "LIB_TYPE":JSONResponse[i].LIB_TYPE, "LIB_VERSION":JSONResponse[i].LIB_VERSION, "LATEST_VERSION":"NotFound", "GROUP_ID":JSONResponse[i].LIB_GROUP_ID, "ARTIFACT_ID":JSONResponse[i].LIB_ARTIFACT_ID};
                    returnMsg.Libraries[lengthof returnMsg.Libraries] = element;
                }
            } else{
                element = {"LIB_NAME":JSONResponse[i].LIB_NAME, "LIB_TYPE":JSONResponse[i].LIB_TYPE, "LIB_VERSION":JSONResponse[i].LIB_VERSION, "LATEST_VERSION":"CannotResolved", "GROUP_ID":"", "ARTIFACT_ID":""};
                returnMsg.Libraries[lengthof returnMsg.Libraries] = element;
            }
            i = i + 1;
        }
        log:printInfo("Retreived library details for the given component");
        sqlCon.close();
        return returnMsg;
    }catch (error err) {
        json errorMessage = {"responseType":"Error","responseMessage":err.msg};
        dtLibrary.close();
        if(sqlConnection !=  null){
            sqlCon.close();
        }
        log:printError(err.msg);
        return errorMessage;
    }
    json errorMessage = {"responseType":"Other","responseMessage":"NotFound"};
    sqlCon.close();
    return errorMessage;
}

public function selectLibrariesForSelectedComp(string requestedComponent, string componentVersion)(json){
    endpoint<sql:ClientConnector> sqlCon {
    }
    sql:ClientConnector sqlConnection = getLMDatabaseConfiguration();
    datatable dtLibrary;
    json element   =  {};
    json returnMsg = { Libraries:[]};

    try{
        bind sqlConnection with sqlCon;

        sql:Parameter[] paramsQuery = [];
        sql:Parameter paraName = {sqlType:"varchar", value:requestedComponent};
        sql:Parameter paraVersion = {sqlType:"varchar", value:componentVersion};
        paramsQuery = [paraName, paraVersion];

        log:printInfo("Start retrieving Library details for the given component");

        dtLibrary = sqlCon.select(LM_DB_COMP_LIBRARIES_DETAIL, paramsQuery);

        var JSONResponse, err = <json>dtLibrary;
        log:printDebug(JSONResponse.toString());
        dtLibrary.close();
        int i = 0;

        while (i < (lengthof JSONResponse)) {
            if (JSONResponse[i].LIB_ARTIFACT_ID != null && JSONResponse[i].LIB_LATEST_VERSION == null) {
                element = {"COMP_NAME":requestedComponent, "COMP_VERSION":componentVersion,"LIB_NAME":JSONResponse[i].LIB_NAME, "LIB_TYPE":JSONResponse[i].LIB_TYPE, "LIB_VERSION":JSONResponse[i].LIB_VERSION, "LIB_RELEASE_DATE":JSONResponse[i].LIB_DATE,"LATEST_VERSION":"Not Found","LATEST_VERSION_DATE":JSONResponse[i].LIB_LATEST_DATE, "GROUP_ID":JSONResponse[i].LIB_GROUP_ID, "ARTIFACT_ID":JSONResponse[i].LIB_ARTIFACT_ID};
                returnMsg.Libraries[lengthof returnMsg.Libraries] = element;

            } else  if (JSONResponse[i].LIB_ARTIFACT_ID == null && JSONResponse[i].LIB_GROUP_ID == null){
                element = {"COMP_NAME":requestedComponent, "COMP_VERSION":componentVersion,"LIB_NAME":JSONResponse[i].LIB_NAME, "LIB_TYPE":JSONResponse[i].LIB_TYPE, "LIB_VERSION":JSONResponse[i].LIB_VERSION, "LIB_RELEASE_DATE":JSONResponse[i].LIB_DATE,"LATEST_VERSION":"Cannot be resolved","LATEST_VERSION_DATE":"Cannot be resolved", "GROUP_ID":JSONResponse[i].LIB_GROUP_ID, "ARTIFACT_ID":JSONResponse[i].LIB_ARTIFACT_ID};
                returnMsg.Libraries[lengthof returnMsg.Libraries] = element;

            } else {
                element = {"COMP_NAME":requestedComponent, "COMP_VERSION":componentVersion,"LIB_NAME":JSONResponse[i].LIB_NAME, "LIB_TYPE":JSONResponse[i].LIB_TYPE, "LIB_VERSION":JSONResponse[i].LIB_VERSION, "LIB_RELEASE_DATE":JSONResponse[i].LIB_DATE,"LATEST_VERSION":JSONResponse[i].LIB_LATEST_VERSION,"LATEST_VERSION_DATE":JSONResponse[i].LIB_LATEST_DATE, "GROUP_ID":JSONResponse[i].LIB_GROUP_ID, "ARTIFACT_ID":JSONResponse[i].LIB_ARTIFACT_ID};
                returnMsg.Libraries[lengthof returnMsg.Libraries] = element;
            }
            i = i + 1;
        }
        log:printInfo("Retreived library details for the given component");
        sqlCon.close();
        return returnMsg;
    }catch (error err) {
        json errorMessage = {"responseType":"Error","responseMessage":err.msg};
        if(sqlConnection !=  null){
            sqlCon.close();
        }
        log:printError(err.msg);
        return errorMessage;
    }
    json errorMessage = {"responseType":"Other","responseMessage":"NotFound"};
    sqlCon.close();
    return errorMessage;
}

public function selectComponentDetails(string requestedComponent, string componentVersion)(json){
    endpoint<sql:ClientConnector> sqlCon {
    }
    sql:ClientConnector sqlConnection = getLMDatabaseConfiguration();
    datatable dtCompDetails;
    datatable dtCompProducts;
    json element   =  {};
    json returnMsg = { ComponentType:"", ComponentProducts:[]};

    try{
        bind sqlConnection with sqlCon;
        sql:Parameter[] paramsQuery = [];
        sql:Parameter paraName = {sqlType:"varchar", value:requestedComponent};
        sql:Parameter paraVersion = {sqlType:"varchar", value:componentVersion};
        paramsQuery = [paraName, paraVersion];

        dtCompDetails = sqlCon.select(LM_DB_COMPONENT_DETAILS, paramsQuery);
        dtCompProducts = sqlCon.select(LM_DB_COMPONENT_PRODUCTS, paramsQuery);

        var JSONResponse, err = <json>dtCompProducts;
        log:printDebug(JSONResponse.toString());
        dtCompProducts.close();

        int i = 0;

        while (i < (lengthof JSONResponse)) {
            element = {"PRODUCT_NAME":JSONResponse[i].PRODUCT_NAME, "PRODUCT_VERSION":JSONResponse[i].PRODUCT_VERSION};
            returnMsg.ComponentProducts[lengthof returnMsg.ComponentProducts] = element;
            i = i + 1;
        }

        log:printInfo("Finished retreiving component details");

        var JSONCompType, err = <json>dtCompDetails;
        log:printDebug(JSONCompType.toString());
        dtCompDetails.close();

        if(JSONCompType[0].COMP_TYPE != null){
            returnMsg.ComponentType = JSONCompType[0].COMP_TYPE;
        }

        sqlCon.close();
        return returnMsg;
    }catch (error err) {
        json errorMessage = {"responseType":"Error","responseMessage":err.msg};
        if(sqlConnection !=  null){
            sqlCon.close();
        }
        log:printError(err.msg);
        return errorMessage;
    }
    json errorMessage = {"responseType":"Other","responseMessage":"NotFound"};
    sqlCon.close();
    return errorMessage;
}

public function selectLibrariesForSelectedProduct(string requestedProduct, string productVersion,http:HttpClient httpClient )(json){
    endpoint<sql:ClientConnector> sqlCon {
    }
    endpoint<http:HttpClient> httpEndpoint {
        httpClient;
    }
    sql:ClientConnector sqlConnection = getLMDatabaseConfiguration();
    http:Response resp = {};
    http:Request req = {};
    json jsonReqMsg;
    json jsonRespMsg;
    datatable dtLibrary;
    json element   =  {};
    json returnMsg = { Libraries:[]};

    try{
        bind sqlConnection with sqlCon;
        sql:Parameter[] paramsQuery = [];
        sql:Parameter paraName = {sqlType:"varchar", value:requestedProduct};
        sql:Parameter paraVersion = {sqlType:"varchar", value:productVersion};
        paramsQuery = [paraName, paraVersion];

        log:printInfo("Start retrieving Library details for the given product");

        dtLibrary = sqlCon.select(LM_DB_PRODUCT_LIBRARIES, paramsQuery);
        var JSONResponse, err = <json>dtLibrary;
        log:printDebug(JSONResponse.toString());
        dtLibrary.close();

        int i = 0;
        string httpQuery;


        while (i < (lengthof JSONResponse)) {
            if (JSONResponse[i].LIB_ARTIFACT_ID != null) {
                var groupID, castErr = (string)JSONResponse[i].LIB_GROUP_ID;
                var libType, castErr = (string)JSONResponse[i].LIB_TYPE;

                httpQuery = libType+"?VersionReq=true&GroupID=" + groupID;
                jsonReqMsg = {"groupID":JSONResponse[i].LIB_GROUP_ID, "artifactID":JSONResponse[i].LIB_ARTIFACT_ID};

                req.setJsonPayload(jsonReqMsg);
                resp, _ = httpEndpoint.post(httpQuery, req);

                if(resp.getStatusCode() == 200){
                    jsonRespMsg = resp.getJsonPayload();
                    element = {"LIB_NAME":JSONResponse[i].LIB_NAME, "LIB_TYPE":JSONResponse[i].LIB_TYPE, "LIB_VERSION":JSONResponse[i].LIB_VERSION, "LATEST_VERSION":jsonRespMsg.NewestVersion, "GROUP_ID":JSONResponse[i].LIB_GROUP_ID, "ARTIFACT_ID":JSONResponse[i].LIB_ARTIFACT_ID};
                    returnMsg.Libraries[lengthof returnMsg.Libraries] = element;
                }else{
                    element = {"LIB_NAME":JSONResponse[i].LIB_NAME, "LIB_TYPE":JSONResponse[i].LIB_TYPE, "LIB_VERSION":JSONResponse[i].LIB_VERSION, "LATEST_VERSION":"NotFound", "GROUP_ID":JSONResponse[i].LIB_GROUP_ID, "ARTIFACT_ID":JSONResponse[i].LIB_ARTIFACT_ID};
                    returnMsg.Libraries[lengthof returnMsg.Libraries] = element;
                }
            }else{
                element = {"LIB_NAME":JSONResponse[i].LIB_NAME, "LIB_TYPE":JSONResponse[i].LIB_TYPE, "LIB_VERSION":JSONResponse[i].LIB_VERSION, "LATEST_VERSION":"CannotResolved", "GROUP_ID":"", "ARTIFACT_ID":""};
                returnMsg.Libraries[lengthof returnMsg.Libraries] = element;
            }

            i = i + 1;
        }
        sqlCon.close();
        log:printInfo("Library details for the given product successfully retreived");
        return returnMsg;
    }catch (error err) {
        json errorMessage = {"responseType":"Error","responseMessage":err.msg};
        if(sqlConnection !=  null){
            sqlCon.close();
        }
        log:printError(err.msg);
        return errorMessage;
    }
    json errorMessage = {"responseType":"Other","responseMessage":"NotFound"};
    sqlCon.close();
    return errorMessage;

}

public function selectLibrariesForSelectedProd(string requestedProduct, string productVersion)(json){
    endpoint<sql:ClientConnector> sqlCon {
    }
    sql:ClientConnector sqlConnection = getLMDatabaseConfiguration();
    datatable dtLibrary;
    json element   =  {};
    json returnMsg = { Libraries:[]};

    try{
        bind sqlConnection with sqlCon;
        sql:Parameter[] paramsQuery = [];
        sql:Parameter paraName = {sqlType:"varchar", value:requestedProduct};
        sql:Parameter paraVersion = {sqlType:"varchar", value:productVersion};
        paramsQuery = [paraName, paraVersion];

        log:printInfo("Start retrieving Library details for the given product");

        dtLibrary = sqlCon.select(LM_DB_PROD_LIBRARIES, paramsQuery);
        var JSONResponse, err = <json>dtLibrary;
        log:printDebug(JSONResponse.toString());
        dtLibrary.close();
        int i = 0;

        while (i < (lengthof JSONResponse)) {
            if (JSONResponse[i].LIB_ARTIFACT_ID != null && JSONResponse[i].LIB_LATEST_VERSION == null) {
                element = {"LIB_NAME":JSONResponse[i].LIB_NAME, "LIB_TYPE":JSONResponse[i].LIB_TYPE, "LIB_VERSION":JSONResponse[i].LIB_VERSION, "LIB_RELEASE_DATE":JSONResponse[i].LIB_DATE,"LATEST_VERSION":"Not Found","LATEST_VERSION_DATE":JSONResponse[i].LIB_LATEST_DATE, "GROUP_ID":JSONResponse[i].LIB_GROUP_ID, "ARTIFACT_ID":JSONResponse[i].LIB_ARTIFACT_ID};
                returnMsg.Libraries[lengthof returnMsg.Libraries] = element;

            } else  if (JSONResponse[i].LIB_ARTIFACT_ID == null && JSONResponse[i].LIB_GROUP_ID == null){
                element = {"LIB_NAME":JSONResponse[i].LIB_NAME, "LIB_TYPE":JSONResponse[i].LIB_TYPE, "LIB_VERSION":JSONResponse[i].LIB_VERSION, "LIB_RELEASE_DATE":JSONResponse[i].LIB_DATE,"LATEST_VERSION":"Cannot be resolved","LATEST_VERSION_DATE":"Cannot be resolved", "GROUP_ID":JSONResponse[i].LIB_GROUP_ID, "ARTIFACT_ID":JSONResponse[i].LIB_ARTIFACT_ID};
                returnMsg.Libraries[lengthof returnMsg.Libraries] = element;

            } else {
                element = {"LIB_NAME":JSONResponse[i].LIB_NAME, "LIB_TYPE":JSONResponse[i].LIB_TYPE, "LIB_VERSION":JSONResponse[i].LIB_VERSION, "LIB_RELEASE_DATE":JSONResponse[i].LIB_DATE,"LATEST_VERSION":JSONResponse[i].LIB_LATEST_VERSION,"LATEST_VERSION_DATE":JSONResponse[i].LIB_LATEST_DATE, "GROUP_ID":JSONResponse[i].LIB_GROUP_ID, "ARTIFACT_ID":JSONResponse[i].LIB_ARTIFACT_ID};
                returnMsg.Libraries[lengthof returnMsg.Libraries] = element;
            }
            i = i + 1;
        }

        sqlCon.close();
        log:printInfo("Library details for the given product successfully retreived");
        return returnMsg;
    }catch (error err) {
        json errorMessage = {"responseType":"Error","responseMessage":err.msg};
        if(sqlConnection !=  null){
            sqlCon.close();
        }
        log:printError(err.msg);
        return errorMessage;
    }
    json errorMessage = {"responseType":"Other","responseMessage":"NotFound"};
    sqlCon.close();
    return errorMessage;

}

public function selectProductAreas()(json){
    endpoint<sql:ClientConnector> sqlCon {
    }
    sql:ClientConnector sqlConnection = getPQDDatabaseConfiguration();
    datatable prAreadt;

    try{
        bind sqlConnection with sqlCon;

        sql:Parameter[] paramsProductAreaQuery = [];
        prAreadt = sqlCon.select(PQD_DB_PRODUCT_AREAS, paramsProductAreaQuery);

        var JSONResponse,err = <json>prAreadt;
        log:printDebug(JSONResponse.toString());
        prAreadt.close();

        if(lengthof JSONResponse != 0){
            log:printInfo("Product Areas were Successfully Retreived");
            sqlCon.close();
            return JSONResponse;
        }
    }catch (error err) {
        json errorMessage = {"responseType":"Error","responseMessage":err.msg};
        log:printError(err.msg);
        if(sqlConnection !=  null){
            sqlCon.close();
        }
        return errorMessage;
    }
    json errorMessage = {"responseType":"Error","responseMessage":"Not Found"};
    sqlCon.close();
    return errorMessage;
}

public function selectProducts(string productArea)(json){
    endpoint<sql:ClientConnector> sqlPQDCon {
    }
    endpoint<sql:ClientConnector> sqlLMCon {
    }
    sql:ClientConnector sqlPQDConnection = getPQDDatabaseConfiguration();
    sql:ClientConnector sqlLMConnection = getLMDatabaseConfiguration();
    datatable prdtPQD;
    datatable prdtLM;
    json element   =  {};
    json returnMsg = [];

    try{
        bind sqlPQDConnection with sqlPQDCon;
        bind sqlLMConnection with sqlLMCon;

        sql:Parameter[] paramsProductPQDQuery = [];
        sql:Parameter paraName = {sqlType:"varchar", value:productArea};
        paramsProductPQDQuery = [paraName];

        prdtPQD = sqlPQDCon.select(PQD_DB_PRODUCTS, paramsProductPQDQuery);

        var JSONPQDResponse,err = <json>prdtPQD;
        log:printDebug(JSONPQDResponse.toString());
        prdtPQD.close();

        if(lengthof JSONPQDResponse != 0) {
            log:printInfo("PQD Products were Successfully Retreived");

            int i = 0;
            while (i < (lengthof JSONPQDResponse)) {

                sql:Parameter[] paramsProductLMQuery = [];
                string pqdName = JSONPQDResponse[i].licensemanager_name.toString();
                string new = pqdName + "%";

                sql:Parameter paraProdName = {sqlType:"varchar", value:new};
                paramsProductLMQuery = [paraProdName];

                prdtLM = sqlLMCon.select(LM_DB_PRODUCT, paramsProductLMQuery);
                var JSONLMResponse, err = <json>prdtLM;
                log:printDebug(JSONLMResponse.toString());
                prdtLM.close();


                if (lengthof JSONLMResponse != 0) {
                    string stringJson = returnMsg.toString();
                    int j = 0;
                    while (j < (lengthof JSONLMResponse)) {
                        if(!stringJson.contains(JSONLMResponse[j].PRODUCT_NAME.toString())){
                            element = {"PRODUCT_NAME":JSONLMResponse[j].PRODUCT_NAME};
                            returnMsg[lengthof returnMsg] = element;
                        }

                        j = j + 1;
                    }
                }
                i = i + 1;
            }
            log:printInfo("LM Products were Successfully Retreived");
            sqlLMCon.close();
            sqlPQDCon.close();
            return returnMsg;
        }
    }catch (error err) {
        json errorMessage = {"responseType":"Error","responseMessage":err.msg};
        log:printError(err.msg);
        if(sqlLMConnection !=  null){
            sqlLMCon.close();
        }
        if(sqlPQDConnection !=  null){
            sqlPQDCon.close();
        }
        return errorMessage;
    }
    sqlLMCon.close();
    sqlPQDCon.close();
    json errorMessage = {"responseType":"Error","responseMessage":"Not Found"};
    return errorMessage;
}

public function selectProductVersions(string productName)(json){
    endpoint<sql:ClientConnector> sqlCon {
    }
    sql:ClientConnector sqlConnection = getLMDatabaseConfiguration();
    datatable prVersiondt;

    try{
        bind sqlConnection with sqlCon;

        sql:Parameter[] paramsProductQuery = [];
        sql:Parameter paraProdName = {sqlType:"varchar", value:productName};
        paramsProductQuery = [paraProdName];

        prVersiondt = sqlCon.select(LM_DB_PRODUCT_VERSIONS, paramsProductQuery);

        var JSONResponse,err = <json>prVersiondt;
        log:printDebug(JSONResponse.toString());
        prVersiondt.close();
        sqlCon.close();

        if(lengthof JSONResponse != 0){
            log:printInfo("Product Versions were Successfully Retreived");
            return JSONResponse;
        }
    }catch (error err) {
        json errorMessage = {"responseType":"Error","responseMessage":err.msg};
        log:printError(err.msg);
        if(sqlConnection !=  null){
            sqlCon.close();
        }
        return errorMessage;
    }
    json errorMessage = {"responseType":"Error","responseMessage":"Not Found"};
    return errorMessage;
}

public function selectProductComponents(string requestedProduct, string productVersion)(json){
    endpoint<sql:ClientConnector> sqlCon {
    }
    sql:ClientConnector sqlConnection = getLMDatabaseConfiguration();
    datatable dtComps;

    try{
        bind sqlConnection with sqlCon;

        sql:Parameter[] paramsQuery = [];
        sql:Parameter paraName = {sqlType:"varchar", value:requestedProduct};
        sql:Parameter paraVersion = {sqlType:"varchar", value:productVersion};
        paramsQuery = [paraName, paraVersion];

        log:printInfo("Start retrieving components for the product : "+requestedProduct);

        dtComps = sqlCon.select(LM_DB_PRODUCT_COMPONENTS, paramsQuery);
        var JSONResponse, err = <json>dtComps;
        log:printDebug(JSONResponse.toString());
        dtComps.close();

        if(lengthof JSONResponse != 0){
            log:printInfo("Components for the given product successfully received");
            sqlCon.close();
            return JSONResponse;
        }
    }catch (error err) {
        json errorMessage = {"responseType":"Error","responseMessage":err.msg};
        if(sqlConnection !=  null){
            sqlCon.close();
        }
        log:printError(err.msg);
        return errorMessage;
    }
    json errorMessage = {"responseType":"Other","responseMessage":"NotFound"};
    sqlCon.close();
    return errorMessage;
}

public function selectOutdatedLibrariesForSelectedComponent(string requestedComponent, string componentVersion, string refDate)(json){
    endpoint<sql:ClientConnector> sqlCon {
    }
    sql:ClientConnector sqlConnection = getLMDatabaseConfiguration();
    datatable dtLibrary;

    try{
        bind sqlConnection with sqlCon;

        sql:Parameter[] paramsQuery = [];
        sql:Parameter paraName = {sqlType:"varchar", value:requestedComponent};
        sql:Parameter paraVersion = {sqlType:"varchar", value:componentVersion};
        sql:Parameter paraDate = {sqlType:"date",value:refDate};
        paramsQuery = [paraName, paraVersion, paraDate];

        log:printInfo("Start retrieving outdated  Library details for the given component : "+requestedComponent);

        dtLibrary = sqlCon.select(LM_DB_COMP_LIBRARIES_OUTDATED, paramsQuery);
        var JSONResponse, err = <json>dtLibrary;
        log:printDebug(JSONResponse.toString());
        dtLibrary.close();

        if(lengthof JSONResponse != 0){
            log:printInfo("Outdated Libraries for the given component successfully received");
            sqlCon.close();
            return JSONResponse;
        }
    }catch (error err) {
        json errorMessage = {"responseType":"Error","responseMessage":err.msg};
        if(sqlConnection !=  null){
            sqlCon.close();
        }
        log:printError(err.msg);
        return errorMessage;
    }
    json errorMessage = {"responseType":"Other","responseMessage":"NotFound"};
    sqlCon.close();
    return errorMessage;
}

public function selectProductLibs(string requestedProduct, string productVersion, string refDate)(json){
    endpoint<sql:ClientConnector> sqlCon {
    }
    sql:ClientConnector sqlConnection = getLMDatabaseConfiguration();
    datatable dtLibrary;
    json element   =  {};
    json returnMsg = { totalLibraries:[], latestVersionUnknownLibs: [], uptodateLibs: [], outdatedRelDateUnknownLibs: [], outdatedLessThanRefDateLibs: [], outdatedGreaterThanRefDateLibs:[]};

    try{
        bind sqlConnection with sqlCon;
        sql:Parameter[] paramsQuery = [];
        sql:Parameter paraName = {sqlType:"varchar", value:requestedProduct};
        sql:Parameter paraVersion = {sqlType:"varchar", value:productVersion};
        paramsQuery = [paraName, paraVersion];

        log:printInfo("Start retrieving Library details for the given product .. Name: "+requestedProduct+" Version:" +  productVersion);

        dtLibrary = sqlCon.select(LM_DB_PROD_LIBRARIES, paramsQuery);
        var JSONResponse, err = <json>dtLibrary;
        log:printDebug(JSONResponse.toString());
        dtLibrary.close();

        if(lengthof JSONResponse  != 0){
            log:printInfo("Libraries of the givenproduct successfully received");
            int i = 0;
            Time reference = parse(refDate,"yyyy-MM-dd");
            int refTimeMilli = reference.time;

            while (i < (lengthof JSONResponse)) {
                element = {"LIB_NAME":JSONResponse[i].LIB_NAME, "LIB_TYPE":JSONResponse[i].LIB_TYPE, "LIB_VERSION":JSONResponse[i].LIB_VERSION, "LIB_RELEASE_DATE":JSONResponse[i].LIB_DATE,"LATEST_VERSION":JSONResponse[i].LIB_LATEST_VERSION,"LATEST_VERSION_DATE":JSONResponse[i].LIB_LATEST_DATE, "GROUP_ID":JSONResponse[i].LIB_GROUP_ID, "ARTIFACT_ID":JSONResponse[i].LIB_ARTIFACT_ID};
                returnMsg.totalLibraries[lengthof returnMsg.totalLibraries] = element;

                if (JSONResponse[i].LIB_LATEST_VERSION  != null){

                    if(JSONResponse[i].LIB_VERSION.toString() != JSONResponse[i].LIB_LATEST_VERSION.toString()){

                        if(JSONResponse[i].LIB_DATE != null){

                            Time releaseDate = parse(JSONResponse[i].LIB_DATE.toString(),"yyyy-MM-dd");
                            int relTimeMilli = releaseDate.time;

                            if(relTimeMilli < refTimeMilli){
                                element = {"LIB_NAME":JSONResponse[i].LIB_NAME, "LIB_TYPE":JSONResponse[i].LIB_TYPE, "LIB_VERSION":JSONResponse[i].LIB_VERSION, "LIB_RELEASE_DATE":JSONResponse[i].LIB_DATE,"LATEST_VERSION":JSONResponse[i].LIB_LATEST_VERSION,"LATEST_VERSION_DATE":JSONResponse[i].LIB_LATEST_DATE, "GROUP_ID":JSONResponse[i].LIB_GROUP_ID, "ARTIFACT_ID":JSONResponse[i].LIB_ARTIFACT_ID};
                                returnMsg.outdatedLessThanRefDateLibs[lengthof returnMsg.outdatedLessThanRefDateLibs] = element;
                            } else {
                                element = {"LIB_NAME":JSONResponse[i].LIB_NAME, "LIB_TYPE":JSONResponse[i].LIB_TYPE, "LIB_VERSION":JSONResponse[i].LIB_VERSION, "LIB_RELEASE_DATE":JSONResponse[i].LIB_DATE,"LATEST_VERSION":JSONResponse[i].LIB_LATEST_VERSION,"LATEST_VERSION_DATE":JSONResponse[i].LIB_LATEST_DATE, "GROUP_ID":JSONResponse[i].LIB_GROUP_ID, "ARTIFACT_ID":JSONResponse[i].LIB_ARTIFACT_ID};
                                returnMsg.outdatedGreaterThanRefDateLibs[lengthof returnMsg.outdatedGreaterThanRefDateLibs] = element;
                            }
                        } else {
                            element = {"LIB_NAME":JSONResponse[i].LIB_NAME, "LIB_TYPE":JSONResponse[i].LIB_TYPE, "LIB_VERSION":JSONResponse[i].LIB_VERSION, "LIB_RELEASE_DATE":JSONResponse[i].LIB_DATE,"LATEST_VERSION":JSONResponse[i].LIB_LATEST_VERSION,"LATEST_VERSION_DATE":JSONResponse[i].LIB_LATEST_DATE, "GROUP_ID":JSONResponse[i].LIB_GROUP_ID, "ARTIFACT_ID":JSONResponse[i].LIB_ARTIFACT_ID};
                            returnMsg.outdatedRelDateUnknownLibs[lengthof returnMsg.outdatedRelDateUnknownLibs] = element;
                        }
                    } else {
                        element = {"LIB_NAME":JSONResponse[i].LIB_NAME, "LIB_TYPE":JSONResponse[i].LIB_TYPE, "LIB_VERSION":JSONResponse[i].LIB_VERSION, "LIB_RELEASE_DATE":JSONResponse[i].LIB_DATE,"LATEST_VERSION":JSONResponse[i].LIB_LATEST_VERSION,"LATEST_VERSION_DATE":JSONResponse[i].LIB_LATEST_DATE, "GROUP_ID":JSONResponse[i].LIB_GROUP_ID, "ARTIFACT_ID":JSONResponse[i].LIB_ARTIFACT_ID};
                        returnMsg.uptodateLibs[lengthof returnMsg.uptodateLibs] = element;
                    }
                } else {
                    element = {"LIB_NAME":JSONResponse[i].LIB_NAME, "LIB_TYPE":JSONResponse[i].LIB_TYPE, "LIB_VERSION":JSONResponse[i].LIB_VERSION, "LIB_RELEASE_DATE":JSONResponse[i].LIB_DATE,"LATEST_VERSION":JSONResponse[i].LIB_LATEST_VERSION,"LATEST_VERSION_DATE":JSONResponse[i].LIB_LATEST_DATE, "GROUP_ID":JSONResponse[i].LIB_GROUP_ID, "ARTIFACT_ID":JSONResponse[i].LIB_ARTIFACT_ID};
                    returnMsg.latestVersionUnknownLibs[lengthof returnMsg.latestVersionUnknownLibs] = element;
                }
                i = i + 1;
            }
        }
        sqlCon.close();
        log:printInfo("Library details for the given product successfully retreived");
        return returnMsg;
    }catch (error err) {
        json errorMessage = {"responseType":"Error","responseMessage":err.msg};
        if(sqlConnection !=  null){
            sqlCon.close();
        }
        log:printError(err.msg);
        return errorMessage;
    }
    json errorMessage = {"responseType":"Other","responseMessage":"NotFound"};
    sqlCon.close();
    return errorMessage;
}

public function selectProductComponentLibs(string requestedProduct, string productVersion, string refDate)(json){
    endpoint<sql:ClientConnector> sqlCon {
    }
    sql:ClientConnector sqlConnectionLM = getLMDatabaseConfiguration();

    datatable dtComps;
    datatable dtCompDetails;
    json element   =  {};
    string compNameVersion;

    json returnMsg = {
                         compAll:[],
                         compWithNoLibs:[],
                         compWithLibs:[],

                         compWithlatestVersionUnknownLibs: [],
                         compWithuptodateLibs: [],
                         compWithoutdatedRelDateUnknownLibs: [],
                         compWithOutdatedLessThanRefDateLibs: [],
                         compWithOutdatedGreaterThanRefDateLibs:[],

                         countCompWithlatestVersionUnknownLibs: [],
                         countCompWithuptodateLibs: [],
                         countCompWithoutdatedRelDateUnknownLibs: [],
                         countCompWithOutdatedLessThanRefDateLibs: [],
                         countCompWithOutdatedGreaterThanRefDateLibs: [],

                         totalCompLibraries:[],
                         latestVersionUnknownCompLibs: [],
                         uptodateCompLibs: [],
                         outdatedRelDateUnknownCompLibs: [],
                         outdatedLessThanRefDateCompLibs: [],
                         outdatedGreaterThanRefDateCompLibs:[]
                     };

    try{
        bind sqlConnectionLM with sqlCon;

        sql:Parameter[] paramsQuery = [];
        sql:Parameter paraName = {sqlType:"varchar", value:requestedProduct};
        sql:Parameter paraVersion = {sqlType:"varchar", value:productVersion};
        paramsQuery = [paraName, paraVersion];

        log:printInfo("Start retrieving components for the product : "+requestedProduct+" version: "+productVersion);

        dtComps = sqlCon.select(LM_DB_PRODUCT_COMPONENTS, paramsQuery);
        var JSONResponse, err = <json>dtComps;
        log:printDebug(JSONResponse.toString());
        dtComps.close();

        if(lengthof JSONResponse != 0){
            log:printInfo("Components for the given product successfully received");
            Time reference = parse(refDate,"yyyy-MM-dd");
            int refTimeMilli = reference.time;

            int i = 0;
            while (i < (lengthof JSONResponse)) {
                returnMsg.compAll[lengthof returnMsg.compAll] = JSONResponse[i];

                sql:Parameter[] paramsCQuery = [];
                sql:Parameter paraCName = {sqlType:"varchar", value:JSONResponse[i].COMP_NAME};
                sql:Parameter paraCVersion = {sqlType:"varchar", value:JSONResponse[i].COMP_VERSION};
                paramsCQuery = [paraCName, paraCVersion];

                dtCompDetails = sqlCon.select(LM_DB_COMP_LIBRARIES_DETAIL, paramsCQuery);
                var JSONResponseCompDetails, err = <json>dtCompDetails;
                log:printDebug(JSONResponseCompDetails.toString());
                dtCompDetails.close();

                int j = 0;
                if(lengthof JSONResponseCompDetails != 0) {
                    log:printInfo("Libraries of the given component successfully received");

                    while (j < (lengthof JSONResponseCompDetails)) {

                        compNameVersion = "Name: "+JSONResponse[i].COMP_NAME.toString() + " Version: "+ JSONResponse[i].COMP_VERSION.toString();
                        element = {"COMPONENT": compNameVersion,"LIB_ID":JSONResponseCompDetails[j].LIB_ID,"LIB_NAME":JSONResponseCompDetails[j].LIB_NAME, "LIB_TYPE":JSONResponseCompDetails[j].LIB_TYPE, "LIB_VERSION":JSONResponseCompDetails[j].LIB_VERSION, "LIB_RELEASE_DATE":JSONResponseCompDetails[j].LIB_DATE,"LATEST_VERSION":JSONResponseCompDetails[j].LIB_LATEST_VERSION,"LATEST_VERSION_DATE":JSONResponseCompDetails[j].LIB_LATEST_DATE, "GROUP_ID":JSONResponseCompDetails[j].LIB_GROUP_ID, "ARTIFACT_ID":JSONResponseCompDetails[j].LIB_ARTIFACT_ID};
                        returnMsg.compWithLibs[lengthof returnMsg.compWithLibs] = element;

                        if(checkLibraryArray(returnMsg.totalCompLibraries,JSONResponseCompDetails[j].LIB_ID.toString())){
                            element = {"LIB_ID":JSONResponseCompDetails[j].LIB_ID,"LIB_NAME":JSONResponseCompDetails[j].LIB_NAME, "LIB_TYPE":JSONResponseCompDetails[j].LIB_TYPE, "LIB_VERSION":JSONResponseCompDetails[j].LIB_VERSION, "LIB_RELEASE_DATE":JSONResponseCompDetails[j].LIB_DATE,"LATEST_VERSION":JSONResponseCompDetails[j].LIB_LATEST_VERSION,"LATEST_VERSION_DATE":JSONResponseCompDetails[j].LIB_LATEST_DATE, "GROUP_ID":JSONResponseCompDetails[j].LIB_GROUP_ID, "ARTIFACT_ID":JSONResponseCompDetails[j].LIB_ARTIFACT_ID};
                            returnMsg.totalCompLibraries[lengthof returnMsg.totalCompLibraries] = element;
                        }

                        if (JSONResponseCompDetails[j].LIB_LATEST_VERSION  != null){

                            if(JSONResponseCompDetails[j].LIB_VERSION.toString() != JSONResponseCompDetails[j].LIB_LATEST_VERSION.toString()){

                                if(JSONResponseCompDetails[j].LIB_DATE != null){

                                    Time releaseDate = parse(JSONResponseCompDetails[j].LIB_DATE.toString(),"yyyy-MM-dd");
                                    int relTimeMilli = releaseDate.time;

                                    if(relTimeMilli < refTimeMilli){

                                        if(checkLibraryArray(returnMsg.outdatedLessThanRefDateCompLibs,JSONResponseCompDetails[j].LIB_ID.toString())){
                                            element = {"LIB_ID":JSONResponseCompDetails[j].LIB_ID,"LIB_NAME":JSONResponseCompDetails[j].LIB_NAME, "LIB_TYPE":JSONResponseCompDetails[j].LIB_TYPE, "LIB_VERSION":JSONResponseCompDetails[j].LIB_VERSION, "LIB_RELEASE_DATE":JSONResponseCompDetails[j].LIB_DATE,"LATEST_VERSION":JSONResponseCompDetails[j].LIB_LATEST_VERSION,"LATEST_VERSION_DATE":JSONResponseCompDetails[j].LIB_LATEST_DATE, "GROUP_ID":JSONResponseCompDetails[j].LIB_GROUP_ID, "ARTIFACT_ID":JSONResponseCompDetails[j].LIB_ARTIFACT_ID};
                                            returnMsg.outdatedLessThanRefDateCompLibs[lengthof returnMsg.outdatedLessThanRefDateCompLibs] = element;
                                        }

                                        compNameVersion = "Name: "+JSONResponse[i].COMP_NAME.toString() + " Version: "+ JSONResponse[i].COMP_VERSION.toString();
                                        element = {"COMPONENT": compNameVersion,"LIB_ID":JSONResponseCompDetails[j].LIB_ID,"LIB_NAME":JSONResponseCompDetails[j].LIB_NAME, "LIB_TYPE":JSONResponseCompDetails[j].LIB_TYPE, "LIB_VERSION":JSONResponseCompDetails[j].LIB_VERSION, "LIB_RELEASE_DATE":JSONResponseCompDetails[j].LIB_DATE,"LATEST_VERSION":JSONResponseCompDetails[j].LIB_LATEST_VERSION,"LATEST_VERSION_DATE":JSONResponseCompDetails[j].LIB_LATEST_DATE, "GROUP_ID":JSONResponseCompDetails[j].LIB_GROUP_ID, "ARTIFACT_ID":JSONResponseCompDetails[j].LIB_ARTIFACT_ID};
                                        returnMsg.compWithOutdatedLessThanRefDateLibs[lengthof returnMsg.compWithOutdatedLessThanRefDateLibs] = element;


                                        if(checkCompArray(returnMsg.countCompWithOutdatedLessThanRefDateLibs, JSONResponse[i].COMP_ID.toString())){
                                            element = {"COMP_ID":JSONResponse[i].COMP_ID, "COMP_NAME":JSONResponse[i].COMP_NAME , "COMP_VERSION": JSONResponse[i].COMP_VERSION};
                                            returnMsg.countCompWithOutdatedLessThanRefDateLibs[lengthof  returnMsg.countCompWithOutdatedLessThanRefDateLibs] =  element;
                                        }

                                    } else {

                                        if(checkLibraryArray(returnMsg.outdatedGreaterThanRefDateCompLibs,JSONResponseCompDetails[j].LIB_ID.toString())){
                                            element = {"LIB_ID":JSONResponseCompDetails[j].LIB_ID,"LIB_NAME":JSONResponseCompDetails[j].LIB_NAME, "LIB_TYPE":JSONResponseCompDetails[j].LIB_TYPE, "LIB_VERSION":JSONResponseCompDetails[j].LIB_VERSION, "LIB_RELEASE_DATE":JSONResponseCompDetails[j].LIB_DATE,"LATEST_VERSION":JSONResponseCompDetails[j].LIB_LATEST_VERSION,"LATEST_VERSION_DATE":JSONResponseCompDetails[j].LIB_LATEST_DATE, "GROUP_ID":JSONResponseCompDetails[j].LIB_GROUP_ID, "ARTIFACT_ID":JSONResponseCompDetails[j].LIB_ARTIFACT_ID};
                                            returnMsg.outdatedGreaterThanRefDateCompLibs[lengthof returnMsg.outdatedGreaterThanRefDateCompLibs] = element;
                                        }
                                        compNameVersion = "Name: "+JSONResponse[i].COMP_NAME.toString() + " Version: "+ JSONResponse[i].COMP_VERSION.toString();
                                        element = {"COMPONENT": compNameVersion,"LIB_ID":JSONResponseCompDetails[j].LIB_ID,"LIB_NAME":JSONResponseCompDetails[j].LIB_NAME, "LIB_TYPE":JSONResponseCompDetails[j].LIB_TYPE, "LIB_VERSION":JSONResponseCompDetails[j].LIB_VERSION, "LIB_RELEASE_DATE":JSONResponseCompDetails[j].LIB_DATE,"LATEST_VERSION":JSONResponseCompDetails[j].LIB_LATEST_VERSION,"LATEST_VERSION_DATE":JSONResponseCompDetails[j].LIB_LATEST_DATE, "GROUP_ID":JSONResponseCompDetails[j].LIB_GROUP_ID, "ARTIFACT_ID":JSONResponseCompDetails[j].LIB_ARTIFACT_ID};
                                        returnMsg.compWithOutdatedGreaterThanRefDateLibs[lengthof returnMsg.compWithOutdatedGreaterThanRefDateLibs] = element;

                                        if(checkCompArray(returnMsg.countCompWithOutdatedGreaterThanRefDateLibs, JSONResponse[i].COMP_ID.toString())){
                                            element = {"COMP_ID":JSONResponse[i].COMP_ID, "COMP_NAME":JSONResponse[i].COMP_NAME , "COMP_VERSION": JSONResponse[i].COMP_VERSION};
                                            returnMsg.countCompWithOutdatedGreaterThanRefDateLibs[lengthof  returnMsg.countCompWithOutdatedGreaterThanRefDateLibs] =  element;
                                        }
                                    }

                                } else {

                                    if(checkLibraryArray(returnMsg.outdatedRelDateUnknownCompLibs,JSONResponseCompDetails[j].LIB_ID.toString())){
                                        element = {"LIB_ID":JSONResponseCompDetails[j].LIB_ID,"LIB_NAME":JSONResponseCompDetails[j].LIB_NAME, "LIB_TYPE":JSONResponseCompDetails[j].LIB_TYPE, "LIB_VERSION":JSONResponseCompDetails[j].LIB_VERSION, "LIB_RELEASE_DATE":JSONResponseCompDetails[j].LIB_DATE,"LATEST_VERSION":JSONResponseCompDetails[j].LIB_LATEST_VERSION,"LATEST_VERSION_DATE":JSONResponseCompDetails[j].LIB_LATEST_DATE, "GROUP_ID":JSONResponseCompDetails[j].LIB_GROUP_ID, "ARTIFACT_ID":JSONResponseCompDetails[j].LIB_ARTIFACT_ID};
                                        returnMsg.outdatedRelDateUnknownCompLibs[lengthof returnMsg.outdatedRelDateUnknownCompLibs] = element;
                                    }
                                    compNameVersion = "Name: "+JSONResponse[i].COMP_NAME.toString() + " Version: "+ JSONResponse[i].COMP_VERSION.toString();
                                    element = {"COMPONENT": compNameVersion,"LIB_ID":JSONResponseCompDetails[j].LIB_ID,"LIB_NAME":JSONResponseCompDetails[j].LIB_NAME, "LIB_TYPE":JSONResponseCompDetails[j].LIB_TYPE, "LIB_VERSION":JSONResponseCompDetails[j].LIB_VERSION, "LIB_RELEASE_DATE":JSONResponseCompDetails[j].LIB_DATE,"LATEST_VERSION":JSONResponseCompDetails[j].LIB_LATEST_VERSION,"LATEST_VERSION_DATE":JSONResponseCompDetails[j].LIB_LATEST_DATE, "GROUP_ID":JSONResponseCompDetails[j].LIB_GROUP_ID, "ARTIFACT_ID":JSONResponseCompDetails[j].LIB_ARTIFACT_ID};
                                    returnMsg.compWithoutdatedRelDateUnknownLibs[lengthof returnMsg.compWithoutdatedRelDateUnknownLibs] = element;

                                    if(checkCompArray(returnMsg.countCompWithoutdatedRelDateUnknownLibs, JSONResponse[i].COMP_ID.toString())){
                                        element = {"COMP_ID":JSONResponse[i].COMP_ID, "COMP_NAME":JSONResponse[i].COMP_NAME , "COMP_VERSION": JSONResponse[i].COMP_VERSION};
                                        returnMsg.countCompWithoutdatedRelDateUnknownLibs[lengthof  returnMsg.countCompWithoutdatedRelDateUnknownLibs] =  element;
                                    }
                                }

                            } else {

                                if(checkLibraryArray(returnMsg.uptodateCompLibs,JSONResponseCompDetails[j].LIB_ID.toString())){
                                    element = {"LIB_ID":JSONResponseCompDetails[j].LIB_ID,"LIB_NAME":JSONResponseCompDetails[j].LIB_NAME, "LIB_TYPE":JSONResponseCompDetails[j].LIB_TYPE, "LIB_VERSION":JSONResponseCompDetails[j].LIB_VERSION, "LIB_RELEASE_DATE":JSONResponseCompDetails[j].LIB_DATE,"LATEST_VERSION":JSONResponseCompDetails[j].LIB_LATEST_VERSION,"LATEST_VERSION_DATE":JSONResponseCompDetails[j].LIB_LATEST_DATE, "GROUP_ID":JSONResponseCompDetails[j].LIB_GROUP_ID, "ARTIFACT_ID":JSONResponseCompDetails[j].LIB_ARTIFACT_ID};
                                    returnMsg.uptodateCompLibs[lengthof returnMsg.uptodateCompLibs] = element;
                                }
                                compNameVersion = "Name: "+JSONResponse[i].COMP_NAME.toString() + " Version: "+ JSONResponse[i].COMP_VERSION.toString();
                                element = {"COMPONENT": compNameVersion,"LIB_ID":JSONResponseCompDetails[j].LIB_ID,"LIB_NAME":JSONResponseCompDetails[j].LIB_NAME, "LIB_TYPE":JSONResponseCompDetails[j].LIB_TYPE, "LIB_VERSION":JSONResponseCompDetails[j].LIB_VERSION, "LIB_RELEASE_DATE":JSONResponseCompDetails[j].LIB_DATE,"LATEST_VERSION":JSONResponseCompDetails[j].LIB_LATEST_VERSION,"LATEST_VERSION_DATE":JSONResponseCompDetails[j].LIB_LATEST_DATE, "GROUP_ID":JSONResponseCompDetails[j].LIB_GROUP_ID, "ARTIFACT_ID":JSONResponseCompDetails[j].LIB_ARTIFACT_ID};
                                returnMsg.compWithuptodateLibs[lengthof returnMsg.compWithuptodateLibs] = element;

                                if(checkCompArray(returnMsg.countCompWithuptodateLibs, JSONResponse[i].COMP_ID.toString())){
                                    element = {"COMP_ID":JSONResponse[i].COMP_ID, "COMP_NAME":JSONResponse[i].COMP_NAME , "COMP_VERSION": JSONResponse[i].COMP_VERSION};
                                    returnMsg.countCompWithuptodateLibs[lengthof  returnMsg.countCompWithuptodateLibs] =  element;
                                }
                            }

                        } else {

                            if(checkLibraryArray(returnMsg.latestVersionUnknownCompLibs,JSONResponseCompDetails[j].LIB_ID.toString())){
                                element = {"LIB_ID":JSONResponseCompDetails[j].LIB_ID,"LIB_NAME":JSONResponseCompDetails[j].LIB_NAME, "LIB_TYPE":JSONResponseCompDetails[j].LIB_TYPE, "LIB_VERSION":JSONResponseCompDetails[j].LIB_VERSION, "LIB_RELEASE_DATE":JSONResponseCompDetails[j].LIB_DATE,"LATEST_VERSION":JSONResponseCompDetails[j].LIB_LATEST_VERSION,"LATEST_VERSION_DATE":JSONResponseCompDetails[j].LIB_LATEST_DATE, "GROUP_ID":JSONResponseCompDetails[j].LIB_GROUP_ID, "ARTIFACT_ID":JSONResponseCompDetails[j].LIB_ARTIFACT_ID};
                                returnMsg.latestVersionUnknownCompLibs[lengthof returnMsg.latestVersionUnknownCompLibs] = element;
                            }
                            compNameVersion = "Name: "+JSONResponse[i].COMP_NAME.toString() + " Version: "+ JSONResponse[i].COMP_VERSION.toString();
                            element = {"COMPONENT": compNameVersion,"LIB_ID":JSONResponseCompDetails[j].LIB_ID,"LIB_NAME":JSONResponseCompDetails[j].LIB_NAME, "LIB_TYPE":JSONResponseCompDetails[j].LIB_TYPE, "LIB_VERSION":JSONResponseCompDetails[j].LIB_VERSION, "LIB_RELEASE_DATE":JSONResponseCompDetails[j].LIB_DATE,"LATEST_VERSION":JSONResponseCompDetails[j].LIB_LATEST_VERSION,"LATEST_VERSION_DATE":JSONResponseCompDetails[j].LIB_LATEST_DATE, "GROUP_ID":JSONResponseCompDetails[j].LIB_GROUP_ID, "ARTIFACT_ID":JSONResponseCompDetails[j].LIB_ARTIFACT_ID};
                            returnMsg.compWithlatestVersionUnknownLibs[lengthof returnMsg.compWithlatestVersionUnknownLibs] = element;

                            if(checkCompArray(returnMsg.countCompWithlatestVersionUnknownLibs, JSONResponse[i].COMP_ID.toString())){
                                element = {"COMP_ID":JSONResponse[i].COMP_ID, "COMP_NAME":JSONResponse[i].COMP_NAME , "COMP_VERSION": JSONResponse[i].COMP_VERSION};
                                returnMsg.countCompWithlatestVersionUnknownLibs[lengthof returnMsg.countCompWithlatestVersionUnknownLibs] =  element;
                            }
                        }
                        j = j + 1;
                    }
                } else {
                    returnMsg.compWithNoLibs[lengthof returnMsg.compWithNoLibs] = JSONResponse[i];
                }
                i = i + 1;
            }
            sqlCon.close();
            return returnMsg;
        }
    }catch (error err) {
        json errorMessage = {"responseType":"Error","responseMessage":err.msg};
        if(sqlConnectionLM !=  null){
            sqlCon.close();
        }
        log:printError(err.msg);
        return errorMessage;
    }
    json errorMessage = {"responseType":"Other","responseMessage":"NotFound"};
    sqlCon.close();
    return errorMessage;
}

public function checkCompArray(json array, string valueCheck)(boolean){
    int i = 0;

    while (i < (lengthof array)){

        if(array[i].COMP_ID.toString() == valueCheck){
            return false;
        }
        i = i + 1;
    }
    return true;
}

public function checkLibraryArray(json array, string valueCheck)(boolean){
    int i = 0;

    while (i < (lengthof array)){
        if(array[i].LIB_ID.toString() == valueCheck){
            return false;
        }
        i = i + 1;
    }
    return true;
}

public function dashboardData()(json){
    endpoint<sql:ClientConnector> sqlPQDCon {
    }
    endpoint<sql:ClientConnector> sqlLMCon {
    }
    sql:ClientConnector sqlPQDConnection = getPQDDatabaseConfiguration();
    sql:ClientConnector sqlLMConnection = getLMDatabaseConfiguration();
    datatable prAreadt;
    datatable prdtPQD;
    datatable prdtLM;
    datatable prVersiondt;
    datatable prOutLibrarydt;
    datatable prWithPrLib;
    datatable prCompdt;
    datatable dtCompDetails;

    json element   =  {};
    json returnMsg = {
                         ProductAreasWithOutdated: [],
                         ProductAreasWithoutProducts:[],
                         ProductsWithOutdated: [],
                         ProductsWithoutVersions: [],
                         ProductsWithoutLibraries: []
                     };

    try{
        bind sqlPQDConnection with sqlPQDCon;
        bind sqlLMConnection with sqlLMCon;

        sql:Parameter[] paramsProductAreaQuery = [];
        prAreadt = sqlLMCon.select(PQD_DB_PRODUCT_AREAS, paramsProductAreaQuery);

        var JSONResponse,err = <json>prAreadt;
        log:printDebug(JSONResponse.toString());
        prAreadt.close();

        if(lengthof JSONResponse != 0){
            log:printInfo("Product Areas were Successfully Retreived");
            int n = 0;

            while (n < (lengthof JSONResponse)) {
                sql:Parameter[] paramsProductPQDQuery = [];
                sql:Parameter paraName = {sqlType:"varchar", value:JSONResponse[n].pqd_area_name};
                paramsProductPQDQuery = [paraName];

                prdtPQD = sqlPQDCon.select(PQD_DB_PRODUCTS, paramsProductPQDQuery);

                var JSONPQDResponse, err = <json>prdtPQD;
                log:printDebug(JSONPQDResponse.toString());
                prdtPQD.close();

                if (lengthof JSONPQDResponse != 0) {
                    log:printInfo("PQD Products were Successfully Retreived");

                    int i = 0;
                    while (i < (lengthof JSONPQDResponse)) {

                        sql:Parameter[] paramsProductLMQuery = [];
                        string pqdName = JSONPQDResponse[i].licensemanager_name.toString();
                        string new = pqdName + "%";

                        sql:Parameter paraProdName = {sqlType:"varchar", value:new};
                        paramsProductLMQuery = [paraProdName];

                        prdtLM = sqlLMCon.select(LM_DB_PRODUCT, paramsProductLMQuery);
                        var JSONLMResponse, err = <json>prdtLM;
                        log:printDebug(JSONLMResponse.toString());
                        prdtLM.close();


                        if (lengthof JSONLMResponse != 0) {
                            log:printInfo("LM Products were Successfully Retreived");
                            int j = 0;
                            while (j < (lengthof JSONLMResponse)) {

                                sql:Parameter[] paramsVersionQuery = [];
                                sql:Parameter paraPrdName = {sqlType:"varchar", value:JSONLMResponse[j].PRODUCT_NAME};
                                paramsVersionQuery = [paraPrdName];

                                prVersiondt = sqlLMCon.select(LM_DB_PRODUCT_VERSIONS, paramsVersionQuery);

                                var JSONVersionResponse,err = <json>prVersiondt;
                                log:printDebug(JSONVersionResponse.toString());
                                prVersiondt.close();

                                if(lengthof JSONVersionResponse != 0){
                                    log:printInfo("Product Versions were Successfully Retreived");
                                    int k = 0;
                                    while (k < (lengthof JSONVersionResponse)) {
                                        //Check Product Libraries

                                        sql:Parameter[] paramsProductLibraryQuery = [];
                                        sql:Parameter paraPdName = {sqlType:"varchar", value:JSONLMResponse[j].PRODUCT_NAME};
                                        sql:Parameter paraPdVersion = {sqlType:"varchar", value:JSONVersionResponse[k].PRODUCT_VERSION};
                                        paramsProductLibraryQuery = [paraPdName,paraPdVersion];

                                        prWithPrLib=sqlLMCon.select(LM_DB_PROD_LIBRARIES, paramsProductLibraryQuery);
                                        var JSONLMProductWithLibraryResponse, err = <json>prWithPrLib;
                                        log:printDebug(JSONLMProductWithLibraryResponse.toString());
                                        prWithPrLib.close();

                                        int productVersionsWithoutLibrariesCount = 0;

                                        if(lengthof JSONLMProductWithLibraryResponse != 0){
                                            log:printInfo("Product libraries were Successfully Retreived");

                                            prOutLibrarydt = sqlLMCon.select(LM_DB_DASH_PROD_LIBRARIES_OUTDATED, paramsProductLibraryQuery);
                                            var JSONLMProductOutdatedLibraryResponse, err = <json>prOutLibrarydt;
                                            log:printDebug(JSONLMProductOutdatedLibraryResponse.toString());
                                            prOutLibrarydt.close();

                                            if(lengthof JSONLMProductOutdatedLibraryResponse != 0){
                                                log:printInfo("Product outdated libraries were Successfully Retreived");
                                                if(checkProductAreaArray(returnMsg.ProductAreasWithOutdated, JSONResponse[n].pqd_area_name.toString())){
                                                    element = {"PRODUCT_AREA_NAME":JSONResponse[n].pqd_area_name};
                                                    returnMsg.ProductAreasWithOutdated[lengthof returnMsg.ProductAreasWithOutdated] = element;
                                                }

                                                if(checkProductArray(returnMsg.ProductsWithOutdated, JSONLMResponse[j].PRODUCT_NAME.toString())){
                                                    element = {"PRODUCT_NAME":JSONLMResponse[j].PRODUCT_NAME};
                                                    returnMsg.ProductsWithOutdated[lengthof returnMsg.ProductsWithOutdated] = element;
                                                }
                                            } else {
                                                //Check Component Libraries
                                                log:printInfo("Product Outdated libraries not Found. Checking components..");

                                                prCompdt = sqlLMCon.select(LM_DB_PRODUCT_COMPONENTS, paramsProductLibraryQuery);
                                                var JSONCompResponse, err = <json>prCompdt;
                                                log:printDebug(JSONCompResponse.toString());
                                                prCompdt.close();

                                                if(lengthof JSONCompResponse != 0){
                                                    int l = 0;
                                                    log:printInfo("Components Found. Checking for Outdated Libraries..");
                                                    while(l < (lengthof JSONCompResponse)){

                                                        sql:Parameter[] paramsCQuery = [];
                                                        sql:Parameter paraCName = {sqlType:"varchar", value:JSONCompResponse[l].COMP_NAME};
                                                        sql:Parameter paraCVersion = {sqlType:"varchar", value:JSONCompResponse[l].COMP_VERSION};
                                                        paramsCQuery = [paraCName, paraCVersion];

                                                        dtCompDetails = sqlLMCon.select(LM_DB_DASH_COMP_LIBRARIES_OUTDATED, paramsCQuery);
                                                        var JSONResponseCompDetails, err = <json>dtCompDetails;
                                                        log:printDebug(JSONResponseCompDetails.toString());
                                                        dtCompDetails.close();

                                                        if(lengthof JSONResponseCompDetails !=  0){
                                                            log:printInfo("Outdated Libraries Found..");
                                                            if(checkProductArray(returnMsg.ProductsWithOutdated, JSONLMResponse[j].PRODUCT_NAME.toString())){
                                                                element = {"PRODUCT_NAME":JSONLMResponse[j].PRODUCT_NAME};
                                                                returnMsg.ProductsWithOutdated[lengthof returnMsg.ProductsWithOutdated] = element;
                                                            }
                                                            if(checkProductAreaArray(returnMsg.ProductAreasWithOutdated, JSONResponse[n].pqd_area_name.toString())){
                                                                element = {"PRODUCT_AREA_NAME":JSONResponse[n].pqd_area_name};
                                                                returnMsg.ProductAreasWithOutdated[lengthof returnMsg.ProductAreasWithOutdated] = element;
                                                            }
                                                        }
                                                        l = l + 1;
                                                    }
                                                }
                                            }
                                        } else {
                                            log:printInfo("Product libraries not Found. Checking components..");


                                            prCompdt = sqlLMCon.select(LM_DB_PRODUCT_COMPONENTS, paramsProductLibraryQuery);
                                            var JSONCompResponse, err = <json>prCompdt;
                                            log:printDebug(JSONCompResponse.toString());
                                            prCompdt.close();

                                            if(lengthof JSONCompResponse != 0){
                                                int l = 0;
                                                log:printInfo("Components Found. Checking for Outdated Libraries..");
                                                while(l < (lengthof JSONCompResponse)){

                                                    sql:Parameter[] paramsCQuery = [];
                                                    sql:Parameter paraCName = {sqlType:"varchar", value:JSONCompResponse[l].COMP_NAME};
                                                    sql:Parameter paraCVersion = {sqlType:"varchar", value:JSONCompResponse[l].COMP_VERSION};
                                                    paramsCQuery = [paraCName, paraCVersion];

                                                    dtCompDetails = sqlLMCon.select(LM_DB_DASH_COMP_LIBRARIES_OUTDATED, paramsCQuery);
                                                    var JSONResponseCompDetails, err = <json>dtCompDetails;
                                                    log:printDebug(JSONResponseCompDetails.toString());
                                                    dtCompDetails.close();

                                                    if(lengthof JSONResponseCompDetails !=  0){
                                                        log:printInfo("Outdated Libraries Found..");
                                                        if(checkProductArray(returnMsg.ProductsWithOutdated, JSONLMResponse[j].PRODUCT_NAME.toString())){
                                                            element = {"PRODUCT_NAME":JSONLMResponse[j].PRODUCT_NAME};
                                                            returnMsg.ProductsWithOutdated[lengthof returnMsg.ProductsWithOutdated] = element;
                                                        }
                                                        if(checkProductAreaArray(returnMsg.ProductAreasWithOutdated, JSONResponse[n].pqd_area_name.toString())){
                                                            element = {"PRODUCT_AREA_NAME":JSONResponse[n].pqd_area_name};
                                                            returnMsg.ProductAreasWithOutdated[lengthof returnMsg.ProductAreasWithOutdated] = element;
                                                        }
                                                    }
                                                    l=l+1;
                                                }
                                            } else {
                                                if(checkProductArray(returnMsg.ProductsWithoutLibraries, JSONLMResponse[j].PRODUCT_NAME.toString())){
                                                    element = {"PRODUCT_NAME":JSONLMResponse[j].PRODUCT_NAME};
                                                    returnMsg.ProductsWithoutLibraries[lengthof returnMsg.ProductsWithoutLibraries] = element;
                                                }
                                            }
                                        }
                                        k =  k + 1;
                                    }
                                }  else {
                                    if(checkProductArray(returnMsg.ProductsWithoutVersions,JSONLMResponse[j].PRODUCT_ID.toString())){
                                        element = {"PRODUCT_ID":JSONLMResponse[j].PRODUCT_ID,"PRODUCT_NAME":JSONLMResponse[j].PRODUCT_NAME};
                                        returnMsg.ProductsWithoutVersions[lengthof returnMsg.ProductsWithoutVersions] = element;
                                    }
                                }
                                j = j + 1;
                            }
                        }
                        i = i + 1;
                    }
                } else {
                    if(checkProductAreaArray(returnMsg.ProductAreasWithoutProducts,JSONResponse[n].pqd_area_name.toString())){
                        element = {"PRODUCT_AREA_ID":JSONResponse[n].pqd_area_id,"PRODUCT_AREA_NAME":JSONResponse[n].pqd_area_name};
                        returnMsg.ProductAreasWithoutProducts[lengthof returnMsg.ProductAreasWithoutProducts] = element;
                    }
                }
                n=n+1;
            }
            sqlPQDCon.close();
            sqlLMCon.close();
            return returnMsg;
        }
    }catch (error err) {
        json errorMessage = {"responseType":"Error","responseMessage":err.msg};
        log:printError(err.msg);
        if(sqlPQDConnection !=  null){
            sqlPQDCon.close();
        }
        if(sqlLMConnection !=  null){
            sqlLMCon.close();
        }
        return errorMessage;
    }
    json errorMessage = {"responseType":"Error","responseMessage":"Not Found"};
    sqlPQDCon.close();
    sqlLMCon.close();
    return errorMessage;
}

public function checkProductArray(json array, string valueCheck)(boolean){
    int i = 0;

    while (i < (lengthof array)){

        if(array[i].PRODUCT_NAME.toString() == valueCheck){
            return false;
        }
        i = i + 1;
    }
    return true;
}

public function checkProductAreaArray(json array, string valueCheck)(boolean){
    int i = 0;

    while (i < (lengthof array)){

        if(array[i].PRODUCT_AREA_NAME.toString() == valueCheck){
            return false;
        }
        i = i + 1;
    }
    return true;
}