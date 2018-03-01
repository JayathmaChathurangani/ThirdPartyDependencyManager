package org.wso2.internalapps.dependencymanager;

import ballerina.net.http;
import ballerina.data.sql;
import org.wso2.internalapps.dependencymanager.Database;
import org.wso2.internalapps.dependencymanager.ConfigFiles;

@http:configuration {
    basePath:"/LMDependencyManager",
    httpsPort:9099,
    keyStoreFile:"${ballerina.home}/bre/security/wso2carbon.jks",
    keyStorePassword:"wso2carbon",
    certPassword:"wso2carbon",
    trustStoreFile:"${ballerina.home}/bre/security/client-truststore.jks",
    trustStorePassword:"wso2carbon",
    allowCredentials : false,
    allowOrigins:["*"]
}

service<http> DatabaseLM {

    @http:resourceConfig {
        methods:["GET"],
        path:"/library/names"
    }
    resource libraryNamesResource (http:Request request, http:Response response) {
        json jsonresponse = Database:selectLibraryDropDown();
        response.setJsonPayload(jsonresponse);
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.send();
    }

    @http:resourceConfig {
        methods:["GET"],
        path:"/library/versions/{libraryName}"
    }
    resource fillProductVersionDropDownResource (http:Request request, http:Response response,string libraryName) {
        json jsonresponse = Database:selectLibraryVersionDropDown(libraryName);
        response.setJsonPayload(jsonresponse);
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.send();
    }

    @http:resourceConfig {
        methods:["GET"],
        path:"/component/versions/{componentName}"
    }
    resource fillComponentVersionDropDownResource (http:Request request, http:Response response,string componentName) {
        json jsonresponse = Database:selectComponentVersionDropDown(componentName);
        response.setJsonPayload(jsonresponse);
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.send();
    }

    @http:resourceConfig {
        methods:["GET"],
        path:"/product/versions/{productName}"
    }
    resource fillLibraryVersionDropDownResource (http:Request request, http:Response response,string productName) {
        json jsonresponse = Database:selectProductVersionDropDown(productName);
        response.setJsonPayload(jsonresponse);
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.send();
    }

    @http:resourceConfig {
        methods:["GET"],
        path:"/library/artifactIDgroupID/{Name}"
    }
    resource getArtifactGroupID (http:Request request, http:Response response,string Name) {
        map params = request.getQueryParams();
        var givenVersion, _ = (string)params.reqVersion;
        json jsonresponse = Database:selectArtifactGroupIDsLibrary(Name, givenVersion);
        response.setJsonPayload(jsonresponse);
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.send();
    }

    @http:resourceConfig {
        methods:["GET"],
        path:"/library/productsandcomponents/{libraryName}"
    }
    resource getViewByLibrary (http:Request request, http:Response response,string libraryName) {
        map params = request.getQueryParams();
        var libVersion, _ = (string)params.libraryVersion;
        json jsonresponse = Database:viewByLibrary(libraryName, libVersion);
        response.setJsonPayload(jsonresponse);
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.send();
    }

    @http:resourceConfig {
        methods:["GET"],
        path:"/productsandcomponents/names"
    }
    resource getProductAndComponentList (http:Request request, http:Response response) {
        json jsonresponse = Database:selectProductsAndComponents();
        response.setJsonPayload(jsonresponse);
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.send();
    }

    @http:resourceConfig {
        methods:["GET"],
        path:"/component/libraries/{componentName}"
    }
    resource getLibrariesForSelectedComponent (http:Request request, http:Response response, string componentName) {
        map params = request.getQueryParams();
        var componentVersion, _ = (string)params.compVersion;
        json jsonresponse = Database:selectLibrariesForSelectedComp(componentName, componentVersion);
        response.setJsonPayload(jsonresponse);
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.send();
    }

    @http:resourceConfig {
        methods:["GET"],
        path:"/product/libraries/{productName}"
    }
    resource getLibrariesForSelectedProduct (http:Request request, http:Response response, string productName) {
        map params = request.getQueryParams();
        var productVersion, _ = (string)params.prodVersion;

        json jsonresponse = Database:selectLibrariesForSelectedProd(productName, productVersion);
        response.setJsonPayload(jsonresponse);
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.send();
    }

    @http:resourceConfig {
        methods:["GET"],
        path:"/component/details/{componentName}"
    }
    resource getComponentDetails (http:Request request, http:Response response, string componentName) {
        map params = request.getQueryParams();
        var componentVersion, _ = (string)params.compVersion;

        json jsonresponse = Database:selectComponentDetails(componentName, componentVersion);
        json errorMessage = {"responseType":"Error","responseMessage":"Connection Error"};
        response.setJsonPayload(errorMessage);

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.send();
    }

    @http:resourceConfig {
        methods:["GET"],
        path:"/productAreas/names"
    }
    resource productAreas (http:Request request, http:Response response) {
        json jsonresponse = Database:selectProductAreas();
        response.setJsonPayload(jsonresponse);
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.send();
    }

    @http:resourceConfig {
        methods:["GET"],
        path:"/products/names/{productAreaName}"
    }
    resource products (http:Request request, http:Response response, string productAreaName) {
        json jsonresponse = Database:selectProducts(productAreaName);
        response.setJsonPayload(jsonresponse);
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.send();
    }

    @http:resourceConfig {
        methods:["GET"],
        path:"/products/versions/{productName}"
    }
    resource productVersions (http:Request request, http:Response response, string productName) {
        json jsonresponse = Database:selectProductVersions(productName);
        response.setJsonPayload(jsonresponse);
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.send();
    }

    @http:resourceConfig {
        methods:["GET"],
        path:"/product/components/{productName}/{productVersion}"
    }
    resource productComponents(http:Request request, http:Response response, string productName,string productVersion) {
        json jsonresponse = Database:selectProductComponents(productName,productVersion);
        response.setJsonPayload(jsonresponse);
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.send();
    }

    @http:resourceConfig {
        methods:["GET"],
        path:"/product/librarydetails/{productName}/{productVersion}/{refDate}"
    }
    resource productLibraries(http:Request request, http:Response response, string productName,string productVersion,string refDate) {
        json jsonresponse = Database:selectProductLibs(productName,productVersion, refDate);
        response.setJsonPayload(jsonresponse);
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.send();
    }

    @http:resourceConfig {
        methods:["GET"],
        path:"/component/outdatedlibraries/{compName}/{compVersion}/{refDate}"
    }
    resource componentLevelOutdatedLibs(http:Request request, http:Response response, string compName,string compVersion, string refDate) {
        json jsonresponse = Database:selectOutdatedLibrariesForSelectedComponent(compName,compVersion,refDate);
        response.setJsonPayload(jsonresponse);
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.send();
    }

    @http:resourceConfig {
        methods:["GET"],
        path:"product/component/libraries/{prName}/{prVersion}/{refDate}"
    }
    resource selectProductComponentLibs(http:Request request, http:Response response, string prName,string prVersion, string refDate) {
        json jsonresponse = Database:selectProductComponentLibs(prName,prVersion,refDate);
        response.setJsonPayload(jsonresponse);
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.send();
    }

    @http:resourceConfig {
        methods:["GET"],
        path:"dashboard/productareas/products/details"
    }
    resource dashboardData(http:Request request, http:Response response, string prName,string prVersion, string refDate) {
        json jsonresponse = Database:dashboardData();
        response.setJsonPayload(jsonresponse);
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.send();
    }
}