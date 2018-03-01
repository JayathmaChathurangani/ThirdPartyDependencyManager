var configs = {
    "databaseService": [
        {"host": "https://localhost:9099/"},
        {"basePath":"LMDependencyManager/"},
        {"resourcePaths":[
            {"libraryNames":"library/names"},
            {"libraryVersions":"library/versions/"},
            {"libraryGroupIDArtifactID":"library/artifactIDgroupID/"},
            {"productsAndComponentsUsingLibrary":"library/productsandcomponents/"},
            {"productComponentNames":"productsandcomponents/names"},
            {"componentDetails":"component/details/"},
            {"librariesofComponent":"component/libraries/"},
            {"componentVersion":"component/versions/"},
            {"librariesofProduct":"product/libraries/"},
            {"productVersion":"product/versions/"},
            {"productAreas":"productAreas/names"},
            {"products":"products/names/"},
            {"versions":"products/versions/"},
            {"productLibraryDetails":"product/librarydetails/"},
            {"productComponentLibraries":"product/component/libraries/"},
            {"outdatedComponentLibraries":"component/outdatedlibraries/"},
            {"dashboardSummary":"dashboard/productareas/products/details"}
        ]}
    ],
    "routingService": [
        {"host": "https://localhost:9091/"},
        {"basePath":"dependencyManager/"},
        {"resourcePaths":[
            {"requestResolve":"router/"}
        ]}
    ],
    "referencePoints": [
        {"OutdatedDate":"2017-07-30"}
    ]
};
