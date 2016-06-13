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

                this.scope.datepickerOptions = this.scope.$eval(this.attrs.datepickerOptions);

                /*this.scope.datepickerOptions = {
                    minMode: this.attrs.minMode || 'day',
                    maxMode: this.attrs.maxMode || 'year',
                    formatDay: this.attrs.formatDay || 'dd',
                    formatMonth: this.attrs.formatMonth || 'MMMM',
                    formatYear: this.attrs.formatYear || 'yyyy',
                    formatDayHeader: this.attrs.formatDayHeader || 'EEE',
                    formatDayTitle: this.attrs.formatDayTitle || 'MMMM yyyy',
                    formatMonthTitle: this.attrs.formatMonthTitle || 'yyyy',
                    showWeeks: this.attrs.showWeeks ? this.attrs.showWeeks.toLowerCase() === 'true' : true,
                    startingDay: this.attrs.startingDay || 0,
                    initDate: this.scope.$eval(this.attrs.initDate) || new Date(),
                    datepickerMode: this.attrs.datepickerMode || 'day',
                    maxDate: this.scope.$eval(this.attrs.maxDate) || null,
                    minDate: this.scope.$eval(this.attrs.minDate) || null
                };*/
            }
        });
    }

    editableBmgDate.$inject = ['editableDirectiveFactory'];

})();
