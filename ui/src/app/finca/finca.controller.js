//No se han hecho los html de fincas
//import addPluginTemplate from './add-finca.tpl.html';
//import pluginCard from './finca-card.tpl.html';

/*@ngInject*/
export default function FincaController(fincaService, userService, importExport, $state, $stateParams, $filter, $translate, types, helpLinks){
    var fincaActionsList = [
        {
            onAction: function ($event, item) {
                exportFinca($event, item);
            },
            name: function() { $translate.instant('action.export') },
            details: function() { return $translate.instant('finca.export') },
            icon: "file_download"
        },
        {
            onAction: function ($event, item) {
                vm.grid.deleteItem($event, item);
            },
            name: function() { return $translate.instant('action.delete') },
            details: function() { return $translate.instant('finca.delete') },
            icon: "delete",
            isEnabled: isFincaEditable
        }
    ];

    var fincaAddItemActionsList = [
        {
            onAction: function ($event) {
                vm.grid.addItem($event);
            },
            name: function() { return $translate.instant('action.create') },
            details: function() { return $translate.instant('finca.create-new-finca') },
            icon: "insert_drive_file"
        },
        {
            onAction: function ($event) {
                importExport.importFinca($event).then(
                    function() {
                        vm.grid.refreshList();
                    }
                );
            },
            name: function() { return $translate.instant('action.import') },
            details: function() { return $translate.instant('finca.import') },
            icon: "file_upload"
        }
    ];

    var vm = this;

    vm.types = types;

    vm.helpLinkIdForFinca = helpLinkIdForFinca;

    vm.fincaGridConfig = {

        refreshParamsFunc: null,

        deleteItemTitleFunc: deleteFincaTitle,
        deleteItemContentFunc: deleteFincaText,
        deleteItemsTitleFunc: deleteFincasTitle,
        deleteItemsActionTitleFunc: deleteFincasActionTitle,
        deleteItemsContentFunc: deleteFincasText,

        fetchItemsFunc: fetchFincass,
        saveItemFunc: saveFinca,
        deleteItemFunc: deleteFinca,

        getItemTitleFunc: getFincaTitle,
        itemCardTemplateUrl: fincaCard,
        parentCtl: vm,

        actionsList: fincaActionsList,
        addItemActions: fincaAddItemActionsList,

        onGridInited: gridInited,

        addItemTemplateUrl: addFincaTemplate,

        addItemText: function() { return $translate.instant('finca.add-finca-text') },
        noItemsText: function() { return $translate.instant('finca.no-fincas-text') },
        itemDetailsText: function() { return $translate.instant('finca.finca-details') },
        isSelectionEnabled: isFincaEditable,
        isDetailsReadOnly: function(finca) {
            return !isFincaEditable(finca);
        }

    };

    if (angular.isDefined($stateParams.items) && $stateParams.items !== null) {
        vm.fincaGridConfig.items = $stateParams.items;
    }

    if (angular.isDefined($stateParams.topIndex) && $stateParams.topIndex > 0) {
        vm.fincaGridConfig.topIndex = $stateParams.topIndex;
    }

    vm.isFincaEditable = isFincaEditable;
    vm.exportFinca = exportFinca;

    function helpLinkIdForFinca() {
        return helpLinks.getFincaLink(vm.grid.operatingItem());
    }

    function deleteFincaTitle(finca) {
        return $translate.instant('finca.delete-finca-title', {fincaName: finca.name});
    }

    function deleteFincaText() {
        return $translate.instant('finca.delete-finca-text');
    }

    function deleteFincasTitle(selectedCount) {
        return $translate.instant('finca.delete-fincas-title', {count: selectedCount}, 'messageformat');
    }

    function deleteFincasActionTitle(selectedCount) {
        return $translate.instant('finca.delete-fincas-action-title', {count: selectedCount}, 'messageformat');
    }

    function deleteFincasText() {
        return $translate.instant('finca.delete-fincas-text');
    }

    function gridInited(grid) {
        vm.grid = grid;
    }

    function fetchFincas(pageLink) {
        return fincaService.getAllFincas(pageLink);
    }

    function saveFinca(finca) {
        return fincaService.saveFinca(finca);
    }

    function deleteFinca(fincaId) {
        return fincaService.deleteFinca(fincaId);
    }

    function getFincaTitle(finca) {
        return finca ? finca.name : '';
    }

    function isFincaEditable(finca) {
        if (userService.getAuthority() === 'TENANT_ADMIN') {
            return finca && finca.tenantId.id != types.id.nullUid;
        } else {
            return userService.getAuthority() === 'SYS_ADMIN';
        }
    }

    function exportFinca($event, finca) {
        $event.stopPropagation();
        importExport.exportFinca(finca.id.id);
    }

}