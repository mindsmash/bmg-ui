(function(undefined) {
    'use strict';

    angular
        .module('bmg-ui.docs')
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
                    showWeeks: options.showWeeks ? options.showWeeks.toLowerCase() === 'true' : true,
                    startingDay: options.startingDay || 0,
                    initDate: this.scope.$eval(options.initDate) || new Date(),
                    datepickerMode: options.datepickerMode || 'day',
                    maxDate: this.scope.$eval(options.maxDate) || null,
                    minDate: this.scope.$eval(options.minDate) || null
                };

                this.scope.placeholder = this.attrs.placeholder || '';
                this.scope.uibDatepickerPopup = this.attrs.popup || 'dd.MM.yyyy';
            }
        });
    }

    editableBmgDate.$inject = ['editableDirectiveFactory'];

})();
