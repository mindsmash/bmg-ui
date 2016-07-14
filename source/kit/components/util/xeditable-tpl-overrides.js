(function(undefined) {
    'use strict';

    angular
        .module('bmg/template/typeahead/control.html', [])
        .run(['$templateCache', function($templateCache) {
            $templateCache.put('bmg/template/typeahead/control.html',
            '<p class="input-group typeahead-wrapper">' +
            '<input' +
            '    type="text"' +
            '    class="form-control"' +
            '    uib-typeahead="item for item in items | filter:$viewValue"' +
            '    data-ng-model="selectedValue"' +
            '    data-ng-model-options="{}"' +
            '    data-ng-change="updateModel()"' +
            '    data-ng-selected="updateModel()"' +
            '    placeholder="{{ placeholder }}">' +
            '<span class="fa fa-search form-control-feedback"></span>' +
            '</p>');
        }]);

    angular
        .module('bmg/template/datepicker/control.html', [])
        .run(['$templateCache', function($templateCache) {
            $templateCache.put('bmg/template/datepicker/control.html',
            '<p' +
            '    class="input-group datepicker-group">' +
            '    <input' +
            '        type="text"' +
            '        class="form-control"' +
            '        uib-datepicker-popup="{{ uibDatepickerPopup }}"' +
            '        data-ng-model="selectedDate.value"' +
            '        data-ng-model-options="modelOptions"' +
            '        data-ng-change="updateDate()"' +
            '        is-open="bmgDatepickerCtrl.popup.opened"' +
            '        datepicker-options="datepickerOptions"' +
            '        data-ng-required="{{ required }}"' +
            '        close-text="{{ closeText }}"' +
            '        placeholder="{{ placeholder }}"' +
            '        popup-placement="{{ popupPlacement }}" />' +
            '    <span class="input-group-btn">' +
            '        <button' +
            '            type="button"' +
            '            class="btn btn-default shrink"' +
            '            ng-click="bmgDatepickerCtrl.open()">' +
            '            <i class="color-primary fa fa-calendar"></i>' +
            '        </button>' +
            '    </span>' +
            '</p>');
    }]);
})();
