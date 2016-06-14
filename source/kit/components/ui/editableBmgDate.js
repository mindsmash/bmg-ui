(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('editableBmgDate', editableBmgDate);

    function editableBmgDate(editableDirectiveFactory) {
        return editableDirectiveFactory({
            directiveName: 'editableBmgDate',
            inputTpl: '<data-bmg-datepicker />',
            render: function() {
                this.parent.render.call(this);

                var options = this.scope.$eval(this.attrs.datepickerOptions);

                this.scope.datepickerOptions = {
                    minMode: options.minMode || 'day',
                    maxMode: options.maxMode || 'year',
                    formatDay: options.formatDay || 'dd',
                    formatMonth: options.formatMonth || 'MMMM',
                    formatYear: options.formatYear || 'yyyy',
                    formatDayHeader: options.formatDayHeader || 'EEE',
                    formatDayTitle: options.formatDayTitle || 'MMMM yyyy',
                    formatMonthTitle: options.formatMonthTitle || 'yyyy',
                    showWeeks: options.showWeeks,
                    startingDay: options.startingDay || 0,
                    initDate: options.initDate || new Date(),
                    datepickerMode: options.datepickerMode || 'day',
                    maxDate: options.maxDate || null,
                    minDate: options.minDate || null
                };

                this.scope.placeholder = this.attrs.placeholder || '';
                this.scope.uibDatepickerPopup = this.attrs.popup || 'dd.MM.yyyy';
                this.scope.popupPlacement = this.attrs.popupPlacement || 'auto top bottom';
                this.scope.closeText = this.attrs.closeText || 'Close';
                this.scope.required = this.attrs.required || true;
                this.scope.modelOptions = this.scope.$eval(this.attrs.modelOptions) || {};
            }
        });
    }

    editableBmgDate.$inject = ['editableDirectiveFactory'];

})();
