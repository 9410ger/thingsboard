
import fincaTemplate from './fincas.tpl.html';

/*@ngInject*/
export default function FincaRoutes($stateProvider) {

    $stateProvider
        .state('home.fincas', {
            url: '/fincas',
            params: {'topIndex': 0},
            module: 'private',
            auth: ['SYS_ADMIN', 'TENANT_ADMIN'],
            views: {
                "content@home": {
                    templateUrl: fincasTemplate,
                    controllerAs: 'vm',
                    controller: 'FincaController'
                }
            },
            data: {
                searchEnabled: true,
                pageTitle: 'finca.fincas'
            },
            ncyBreadcrumb: {
                label: '{"icon": "", "label": "finca.fincas"}'
            }
        });
}