(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('editableOneClickSelect', editableOneClickSelect);

    function editableOneClickSelect(editableDirectiveFactory) {
        return editableDirectiveFactory({
            directiveName: 'editableOneClickSelect',
            inputTpl: '<data-bmg-one-click-select />',
            render: function() {
                this.parent.render.call(this);
            }
        });
    }

    editableOneClickSelect.$inject = ['editableDirectiveFactory'];
})();
