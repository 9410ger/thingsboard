
export default angular.module('thingsboard.api.finca', [])
    .factory('fincaService', FincaService).name;

/*@ngInject*/
function FincaService($http, $q, $rootScope, $filter, componentDescriptorService, types, utils) {
    var allFincas = undefined;
    var allActionFincas = undefined;
    var systemFincas = undefined;
    var tenantFincas = undefined;

    $rootScope.fincaServiceStateChangeStartHandle = $rootScope.$on('$stateChangeStart', function () {
        invalidateFincasCache();
    });

    var service = {
        getSystemFincas: getSystemFincas,
        getTenantFincas: getTenantFincas,
        getAllFincas: getAllFincas,
        getAllActionFincas: getAllActionFincas,
        getFincaByToken: getFincaByToken,
        getFinca: getFinca,
        deleteFinca: deleteFinca,
        saveFinca: saveFinca
    }

    return service;

    function invalidateFincasCache() {
        allFincas = undefined;
        allActionFincas = undefined;
        systemFincas = undefined;
        tenantFincas = undefined;
    }

    function loadFincasCache(config) {
        var deferred = $q.defer();
        if (!allFincas) {
            var url = '/api/fincas';
            $http.get(url, config).then(function success(response) {
                componentDescriptorService.getComponentDescriptorsByType(types.componentType.finca).then(
                    function success(fincaComponents) {
                        allFincas = response.data;
                        allActionFincas = [];
                        systemFincas = [];
                        tenantFincas = [];
                        allFincas = $filter('orderBy')(allFincas, ['+name', '-createdTime']);
                        var fincaHasActionsByClazz = {};
                        for (var index in fincaComponents) {
                            fincaHasActionsByClazz[fincaComponents[index].clazz] =
                                (fincaComponents[index].actions != null && fincaComponents[index].actions.length > 0);
                        }
                        for (var i = 0; i < allFincas.length; i++) {
                            var finca = allFincas[i];
                            if (fincaHasActionsByClazz[finca.clazz] === true) {
                                allActionFincas.push(finca);
                            }
                            if (finca.tenantId.id === types.id.nullUid) {
                                systemFincas.push(finca);
                            } else {
                                tenantFincas.push(finca);
                            }
                        }
                        deferred.resolve();
                    },
                    function fail() {
                        deferred.reject();
                    }
                );
            }, function fail() {
                deferred.reject();
            });
        } else {
            deferred.resolve();
        }
        return deferred.promise;
    }

    function getSystemFincas(pageLink, config) {
        var deferred = $q.defer();
        loadFincasCache(config).then(
            function success() {
                utils.filterSearchTextEntities(systemFincas, 'name', pageLink, deferred);
            },
            function fail() {
                deferred.reject();
            }
        );
        return deferred.promise;
    }

    function getTenantFincas(pageLink, config) {
        var deferred = $q.defer();
        loadFincasCache(config).then(
            function success() {
                utils.filterSearchTextEntities(tenantFincas, 'name', pageLink, deferred);
            },
            function fail() {
                deferred.reject();
            }
        );
        return deferred.promise;
    }

    function getAllActionFincas(pageLink, config) {
        var deferred = $q.defer();
        loadFincasCache(config).then(
            function success() {
                utils.filterSearchTextEntities(allActionFincas, 'name', pageLink, deferred);
            },
            function fail() {
                deferred.reject();
            }
        );
        return deferred.promise;
    }

    function getAllFincas(pageLink, config) {
        var deferred = $q.defer();
        loadFincasCache(config).then(
            function success() {
                utils.filterSearchTextEntities(allFincas, 'name', pageLink, deferred);
            },
            function fail() {
                deferred.reject();
            }
        );
        return deferred.promise;
    }

    function getFincaByToken(fincaToken) {
        var deferred = $q.defer();
        var url = '/api/finca/token/' + fincaToken;
        $http.get(url, null).then(function success(response) {
            deferred.resolve(response.data);
        }, function fail() {
            deferred.reject();
        });
        return deferred.promise;
    }

    function getFinca(fincaId, config) {
        var deferred = $q.defer();
        var url = '/api/finca/' + fincaId;
        $http.get(url, config).then(function success(response) {
            deferred.resolve(response.data);
        }, function fail(response) {
            deferred.reject(response.data);
        });
        return deferred.promise;
    }

    function saveFinca(finca) {
        var deferred = $q.defer();
        var url = '/api/finca';
        $http.post(url, finca).then(function success(response) {
            invalidateFincasCache();
            deferred.resolve(response.data);
        }, function fail(response) {
            deferred.reject(response.data);
        });
        return deferred.promise;
    }

    function deleteFinca(fincaId) {
        var deferred = $q.defer();
        var url = '/api/finca/' + fincaId;
        $http.delete(url).then(function success() {
            invalidateFincasCache();
            deferred.resolve();
        }, function fail(response) {
            deferred.reject(response.data);
        });
        return deferred.promise;
    }


}