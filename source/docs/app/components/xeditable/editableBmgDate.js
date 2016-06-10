(function(undefined) {
    'use strict';

    angular
        .module('bmg-ui.docs')
        .directive('editableBmgDate', editableBmgDate);

    function editableBmgDate(editableDirectiveFactory) {
        return editableDirectiveFactory({
            directiveName: 'editableBmgDate',
            inputTpl: '<data-bmg-datepicker />'
        });
    }

    editableBmgDate.$inject = ['editableDirectiveFactory'];

})();
