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
        .module('bmg/template/inlineEdits', [])
        .run(['$templateCache', function($templateCache) {
            $templateCache.put('bmg/template/inline/error-tooltip.html', [
                '<i',
                '    class="fa fa-exclamation-triangle inline-error"',
                '    title="{{ ctrl.text }}"',
                '    data-placement="top"',
                '    data-toggle="tooltip"',
                '    rel="tooltip"',
                '    ></i>'
            ].join(''));

            $templateCache.put('bmg/template/inline/text.html',
                [
                    '<div class="inline-edit-container">',
                    '   <input',
                    '       type="text"',
                    '       data-ng-model="ngModel"',
                    '       data-ng-disabled="disabled"',
                    '       data-ng-class="{ \'inline-edit-disabled\': disabled }"',
                    '       placeholder="{{placeholder}}"',
                    '       class="inline-text" /><button', // sic! no whitespace between elements
                    '       type="button"',
                    '       class="revert-button">',
                    '       <i class="fa fa-undo"></i>',
                    '   </button>',
                    '   <div',
                    '      class="inline-error"',
                    '      data-ng-bind="errorMessage"></div>',
                    '</div>'
                ].join(''));

            $templateCache.put('bmg/template/inline/textarea.html',
                [
                    '<div class="inline-edit-container textarea-container">',
                    '    <textarea',
                    '        msd-elastic',
                    '        rows="1"',
                    '        class="inline-textarea"',
                    '        data-ng-model="ngModel"',
                    '        tabindex="{{tabindex}}"',
                    '        data-ng-disabled="disabled"',
                    '        placeholder="{{placeholder}}"></textarea><button', // sic! no whitespace between elements
                    '        type="button"',
                    '        class="revert-button">',
                    '        <i class="fa fa-undo"></i>',
                    '    </button>',
                    '    <div',
                    '        class="inline-error"',
                    '        data-ng-bind="errorMessage"></div>',
                    '</div>'
                ].join(''));

            $templateCache.put('bmg/template/inline/checkbox.html',
                [
                    '<div class="inline-edit-container">',
                    '    <div class="bmg-checkbox-with-label">',
                    '        <div class="bmg-checkbox">',
                    '            <input',
                    '                type="checkbox"',
                    '                data-ng-disabled="disabled"',
                    '                data-ng-model="ngModel"/>',
                    '            <label data-ng-disabled="disabled"><div></div></label>',
                    '        </div>',
                    '    </div><button',
                    '        class="success-indicator">',
                    '        <i class="fa fa-check"></i>',
                    '    </button>',
                    '    <div',
                    '        class="inline-error"',
                    '        data-ng-bind="errorMessage"></div>',
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
                    '       data-ng-disabled="disabled"',
                    '       data-ng-class="{ \'inline-edit-disabled\': disabled }"',
                    '       placeholder="{{placeholder}}"',
                    '       class="inline-typeahead" /><button' + // sic! no whitespace between elements
                    '       type="button"',
                    '       class="revert-button">',
                    '       <i class="fa fa-undo"></i>',
                    '   </button><span',
                    '       class="fa fa-search typeahead-hint"></span>',
                    '   <div',
                    '      class="inline-error"',
                    '      data-ng-bind="errorMessage"></div>',
                    '</div>'
                ].join(''));

            $templateCache.put('bmg/template/inline/select.html',
                [
                    '<div class="inline-edit-container">',
                    '    <ui-select',
                    '        append-to-body="true"',
                    '        data-dollar-select-grabber',
                    '        class="inline-select"',
                    '        data-ng-model="ngModel"',
                    '        on-select="onSelect($item)"',
                    '        theme="selectize"',
                    '        data-ng-class="{ \'inline-edit-disabled\': disabled }"',
                    '        data-ng-disabled="disabled">',
                    '        <ui-select-match',
                    '            class="ui-select-match"',
                    '            placeholder="{{placeholder}}"',
                    '            data-ng-bind="$select.selected"></ui-select-match>',
                    '        <ui-select-choices',
                    '            class="ui-select-choices"',
                    '            position="{{position}}"',
                    '            refresh="refreshData($select.search)"',
                    '            refresh-delay="{{refreshDelay}}"',
                    '            repeat="item in items | filter: $select.search">',
                    '        </ui-select-choices>',
                    '    </ui-select>',
                    '    <div',
                    '        class="inline-error"></div>',
                    '</div>'
                ].join(''));

            $templateCache.put('bmg/template/inline/datepicker.html',
                [
                    '<div class="inline-edit-container">',
                    '    <input',
                    '        type="text"',
                    '        class="inline-datepicker"',
                    '        uib-datepicker-popup="{{ dateFormat || \'yyyy-MM-dd\' }}"',
                    '        datepicker-append-to-body="true"',
                    '        data-ng-model="ngModel"',
                    '        data-ng-model-options="ngModelOptions || {}"',
                    '        data-ng-change="updateDate()"',
                    '        data-ng-disabled="disabled"',
                    '        data-ng-class="{ \'inline-edit-disabled\': disabled }"',
                    '        datepicker-options="datepickerOptions"',
                    '        placeholder="{{ placeholder }}"',
                    '        is-open="popup.opened"',
                    '        show-button-bar="showButtonBar"',
                    '        popup-placement="{{ popupPlacement }}" /><button',
                    '            type="button"',
                    '            class="revert-button">',
                    '            <i class="fa fa-undo"></i>',
                    '        </button><button',
                    '            type="button"',
                    '            data-ng-disabled="disabled"',
                    '            data-ng-click="open()"',
                    '            class="calendar-button">',
                    '            <i class="fa fa-calendar"></i>',
                    '        </button>',
                    '    <div',
                    '        class="inline-error"',
                    '        data-ng-bind="errorMessage"></div>',
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
