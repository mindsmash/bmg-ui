(function(angular) {
	'use strict';

	angular
		.module('templates.inline-edit', []);

	angular
		.module('templates.inline-edit')
		.run(['$templateCache', function($templateCache) {
			$templateCache.put('bmg/template/inline/error-tooltip.html',
				'<i' +
				'    class="fa fa-exclamation-triangle inline-error"' +
				'    title="{{ ctrl.text }}"' +
				'    data-placement="top"' +
				'    data-toggle="tooltip"' +
				'    rel="tooltip"' +
				'></i>');
		}]);

	angular
		.module('templates.inline-edit')
		.run(['$templateCache', function($templateCache) {
			$templateCache.put('bmg/template/inline/text.html',
				'<div class="inline-edit-container">' +
				'   <input' +
				'       type="text"' +
				'       data-ng-model="ngModel"' +
				'       data-ng-disabled="disabled"' +
				'       data-ng-class="{ \'inline-edit-disabled\': disabled }"' +
				'       placeholder="{{placeholder}}"' +
				'       class="inline-text" /><button' + // sic! no whitespace between elements
				'       type="button"' +
				'       class="revert-button">' +
				'       <i class="fa fa-undo"></i>' +
				'   </button>' +
				'   <div' +
				'      class="inline-error"' +
				'      data-ng-bind="errorMessage"></div>' +
				'</div>');
		}]);

	angular
		.module('templates.inline-edit')
		.run(['$templateCache', function($templateCache) {
			$templateCache.put('bmg/template/inline/textarea.html',
				'<div class="inline-edit-container textarea-container">' +
				'    <textarea' +
				'        msd-elastic' +
				'        rows="1"' +
				'        class="inline-textarea"' +
				'        data-ng-model="ngModel"' +
				'        tabindex="{{tabindex}}"' +
				//'        maxlength="{{maxlength}}"' + // dismissed in favor of custom max length
				'        minlength="{{minlength}}"' +
				'        data-ng-disabled="disabled"' +
				'        data-ng-trim="false"' +
				'        placeholder="{{placeholder}}"></textarea><button' + // sic! no whitespace between elements
				'        type="button"' +
				'        class="revert-button">' +
				'        <i class="fa fa-undo"></i>' +
				'    </button>' +
				'    <div' +
				'        class="inline-error"' +
				'        data-ng-bind="errorMessage"></div>' +
				'</div>');

		}]);

	angular
		.module('templates.inline-edit')
		.run(['$templateCache', function($templateCache) {
			$templateCache.put('bmg/template/inline/checkbox.html',
				'<div class="inline-edit-container">' +
				'    <div class="bmg-checkbox-with-label">' +
				'        <div class="bmg-checkbox">' +
				'            <input' +
				'                type="checkbox"' +
				'                data-ng-disabled="disabled"' +
				'                data-ng-model="ngModel"/>' +
				'            <label data-ng-disabled="disabled"><div></div></label>' +
				'        </div>' +
				'    </div><button' +
				'        class="success-indicator">' +
				'        <i class="fa fa-check"></i>' +
				'    </button>' +
				'    <div' +
				'        class="inline-error"' +
				'        data-ng-bind="errorMessage"></div>' +
				'</div>');
		}]);

	angular
		.module('templates.inline-edit')
		.run(['$templateCache', function($templateCache) {
			$templateCache.put('bmg/template/inline/typeahead.html',
				'<div class="inline-edit-container">' +
				'   <input' +
				'       type="text"' +
				'       data-ng-model="ngModel"' +
				'		data-ng-model-options="ngModelOptions" ' +
				'       uib-typeahead="item for item in items | filter: $viewValue"' +
				'       typeahead-on-select="handleUndoBtnVisibility()"' +
				'       data-ng-change="handleUndoBtnVisibility()"' +
				'       data-ng-blur="blurHandler()"' +
				'       data-ng-focus="focusHandler()"' +
				'       data-ng-disabled="disabled"' +
				'       data-ng-class="{ \'inline-edit-disabled\': disabled }"' +
				'       placeholder="{{placeholder}}"' +
				'       class="inline-typeahead" /><button' + // sic! no whitespace between elements
				'       type="button"' +
				'       class="revert-button">' +
				'       <i class="fa fa-undo"></i>' +
				'   </button><span' +
				'       class="fa fa-search typeahead-hint"></span>' +
				'   <div' +
				'      class="inline-error"' +
				'      data-ng-bind="errorMessage"></div>' +
				'</div>');
		}]);

	angular
		.module('templates.inline-edit')
		.run(['$templateCache', function($templateCache) {
			$templateCache.put('bmg/template/inline/async-typeahead.html',
				'<div class="inline-edit-container">' +
				'   <input' +
				'       type="text"' +
				'       data-ng-model="ngModel"' +
				'		data-ng-model-options="ngModelOptions" ' +
				'       uib-typeahead="item for item in items($viewValue)"' +
				'		typeahead-loading="loading"' +
				'		typeahead-no-results="noResults"' +
				'       typeahead-on-select="handleUndoBtnVisibility()"' +
				'       data-ng-change="handleUndoBtnVisibility()"' +
				'       data-ng-blur="blurHandler()"' +
				'       data-ng-focus="focusHandler()"' +
				'       data-ng-disabled="disabled"' +
				'       data-ng-class="{ \'inline-edit-disabled\': disabled }"' +
				'       placeholder="{{placeholder}}"' +
				'       class="inline-async-typeahead" /><button' + // sic! no whitespace between elements
				'       type="button"' +
				'       class="revert-button">' +
				'       <i class="fa" data-ng-class="{\'fa-undo\': !loading, ' +
				'\'fa-spinner fa-pulse\': loading, \'fa-ban\': noResults && !loading}"></i>' +
				'   </button><span' +
				'       class="fa fa-search typeahead-hint"></span>' +
				'   <div' +
				'      class="inline-error"' +
				'      data-ng-bind="errorMessage"></div>' +
				'</div>');
		}]);

	angular
		.module('templates.inline-edit')
		.run(['$templateCache', function($templateCache) {
			$templateCache.put('bmg/template/inline/select.html',
				'<div class="inline-edit-container">' +
				'    <ui-select' +
				'        append-to-body="true"' +
				'        data-dollar-select-grabber' +
				'        class="inline-select"' +
				'        data-ng-model="ngModel"' +
				'        on-select="onSelect($item)"' +
				'        theme="selectize"' +
				'        data-ng-class="{ \'inline-edit-disabled\': disabled }"' +
				'        data-ng-disabled="disabled">' +
				'        <ui-select-match' +
				'            class="ui-select-match"' +
				'            placeholder="{{placeholder}}"' +
				'            data-ng-bind="$select.selected"></ui-select-match>' +
				'        <ui-select-choices' +
				'            class="ui-select-choices"' +
				'            position="{{position}}"' +
				'            refresh="refreshData($select.search)"' +
				'            refresh-delay="{{refreshDelay}}"' +
				'            repeat="item in items | filter: $select.search">' +
				'        </ui-select-choices>' +
				'    </ui-select>' +
				'    <div' +
				'        class="inline-error"></div>' +
				'</div>');
		}]);

	angular
		.module('templates.inline-edit')
		.run(['$templateCache', function($templateCache) {
			$templateCache.put('bmg/template/inline/datepicker.html',
				'<div class="inline-edit-container">' +
				'    <input' +
				'        type="text"' +
				'        class="inline-datepicker"' +
				'        uib-datepicker-popup="{{ dateFormat || \'yyyy-MM-dd\' }}"' +
				'        datepicker-append-to-body="true"' +
				'        data-ng-model="ngModel"' +
				'        data-ng-model-options="ngModelOptions || {}"' +
				'        data-ng-change="updateDate()"' +
				'        data-ng-disabled="disabled"' +
				'        data-ng-class="{ \'inline-edit-disabled\': disabled }"' +
				'        datepicker-options="datepickerOptions"' +
				'        placeholder="{{ placeholder }}"' +
				'        is-open="popup.opened"' +
				'        show-button-bar="showButtonBar"' +
				'        popup-placement="{{ popupPlacement }}" /><button' +
				'            type="button"' +
				'            class="revert-button">' +
				'            <i class="fa fa-undo"></i>' +
				'        </button><button' +
				'            type="button"' +
				'            data-ng-disabled="disabled"' +
				'            data-ng-click="open()"' +
				'            class="calendar-button">' +
				'            <i class="fa fa-calendar"></i>' +
				'        </button>' +
				'    <div' +
				'        class="inline-error"' +
				'        data-ng-bind="errorMessage"></div>' +
				'</div>');
		}]);
})(angular);
