(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('editableTypeahead', editableTypeahead);

    function editableTypeahead(editableDirectiveFactory) {
        return editableDirectiveFactory({
            directiveName: 'editableTypeahead',
            inputTpl: '<data-bmg-typeahead />',
            render: function() {
                this.parent.render.call(this);

                this.scope.items = this.scope.$eval(this.attrs.items) || [];
                this.scope.placeholder = this.attrs.placeholder || 'Type to search …';
            }
        });
    }

    editableTypeahead.$inject = ['editableDirectiveFactory'];
})();
