(function(undefined) {
    'use strict';

    // angular
    //     .module('bmg/template/typeahead/control.html', [])
    //     .run(['$templateCache', function($templateCache) {
    //         $templateCache.put('bmg/template/typeahead/control.html',
    //         '<p class="input-group typeahead-wrapper">' +
    //         '<input' +
    //         '    type="text"' +
    //         '    class="form-control"' +
    //         '    uib-typeahead="item for item in items | filter:$viewValue"' +
    //         '    data-ng-model="selectedValue"' +
    //         '    data-ng-model-options="{}"' +
    //         '    data-ng-change="updateModel()"' +
    //         '    data-ng-selected="updateModel()"' +
    //         '    placeholder="{{ placeholder }}">' +
    //         '<span class="fa fa-search form-control-feedback"></span>' +
    //         '</p>');
    //     }]);

    angular
        .module('bmg/template/inlineEdits', [])
        .run(['$templateCache', function($templateCache) {
            $templateCache.put('bmg/template/inline/text.html',
                [
                    '<div class="inline-edit-container">',
                    '   <input',
                    '       type="text"',
                    '       data-ng-model="ngModel"',
                    '       placeholder="{{placeholder}}"',
                    '       class="inline-text" /><button', // sic! no whitespace between elements
                    '       type="button"',
                    '       class="revert-button">',
                    '       <i class="fa fa-undo"></i>',
                    '   </button>',
                    '</div>'
                ].join(''));

            $templateCache.put('bmg/template/inline/typeahead.html',
                [
                    '<div class="inline-edit-container">',
                    '   <input',
                    '       type="text"',
                    '       data-ng-model="ngModel"',
                    '       data-ng-model-options="{}"',
                    '       uib-typeahead="item for item in items | filter:$viewValue"',
                    '       typeahead-on-select="handleUndoBtnVisibility()"',
                    '       data-ng-change="handleUndoBtnVisibility()"',
                    '       data-ng-blur="blurHandler()"',
                    '       data-ng-focus="focusHandler()"',
                    '       placeholder="{{placeholder}}"',
                    '       class="inline-typeahead" /><button' + // sic! no whitespace between elements
                    '       type="button"',
                    '       class="revert-button">',
                    '       <i class="fa fa-undo"></i>',
                    '   </button><span',
                    '       class="fa fa-search typeahead-hint"></span>',
                    '</div>'
                ].join(''));

            $templateCache.put('bmg/template/inline/select.html',
                [
                    '<div class="inline-edit-container">',
                    '    <ui-select',
                    '        append-to-body="true"',
                    '        class="inline-select"',
                    '        data-ng-model="ngModel"',
                    '        on-select="onSelect($item)"',
                    '        theme="selectize"',
                    '        data-ng-disabled="false">',
                    '        <ui-select-match',
                    '            class="ui-select-match"',
                    '            placeholder="{{placeholder}}"',
                    '            data-ng-bind="$select.selected"></ui-select-match>',
                    '        <ui-select-choices',
                    '            class="ui-select-choices"',
                    '            repeat="item in items | filter: $select.search">',
                    '        </ui-select-choices>',
                    '    </ui-select>',
                    '</div>'
                ].join(''));

            $templateCache.put('bmg/template/inline/datepicker.html',
                [
                    '<div class="inline-edit-container">',
                    '    <input',
                    '        type="text"',
                    '        class="inline-datepicker"',
                    '        uib-datepicker-popup="{{ uibDatepickerPopup }}"',
                    '        datepicker-append-to-body="true"',
                    '        data-ng-model="ngModel"',
                    '        data-ng-model-options="{}"',
                    '        data-ng-change="updateDate()"',
                    '        datepicker-options="datepickerOptions"',
                    '        placeholder="{{ placeholder }}"',
                    '        is-open="popup.opened"',
                    '        popup-placement="{{ popupPlacement }}" /><span',
                    '            class="fa fa-check success-indicator color-success"></span><button',
                    '            type="button"',
                    '            data-ng-click="open()"',
                    '            class="calendar-button">',
                    '            <i class="fa fa-calendar"></i>',
                    '        </button>',
                    '</div>'
                ].join(''));
        }]);

    angular
        .module('bmg/template/datepicker/control.html', [])
        .run(['$templateCache', function($templateCache) {
            $templateCache.put('bmg/template/datepicker/control.html',
            '<p' +
            '    class="input-group datepicker-group">' +
            '    <input' +
            '        type="text"' +
            '        class="inline-datepicker"' +
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
