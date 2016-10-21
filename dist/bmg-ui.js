(function(angular) {
    'use strict';

    angular.module('bmg.components.util', []);

})(angular);

(function(angular) {
    'use strict';

    angular.module('bmg.components.ui', [
            'ui.bootstrap',
            'monospaced.elastic',
            'ui.select',
            'ngSanitize',
            'bmg/template/inlineEdits',
            'bmg/template/alert',
            'user/dialogs/templates'
        ])
        .config(decorateUISelectWithOpenEvent);

    decorateUISelectWithOpenEvent.$inject = ['$provide'];

    // massive kudos to Github user yvesmh for the below
    // source: https://github.com/angular-ui/ui-select/issues/432#issuecomment-109490350
    function decorateUISelectWithOpenEvent($provide) {
        $provide.decorator('uiSelectDirective', function($delegate) {
            var directive = $delegate[0];
            var directiveCompile = directive.compile;

            directive.compile = function () {
                var link = directiveCompile.apply(this, arguments);

                return function(scope) {
                    link.apply(this, arguments);
                    scope.$watch('$select.open', function(value) {
                        scope.$parent.$broadcast('uiSelect:open', value);
                    });
                };
            };

            return $delegate;
        });
    }

})(angular);

(function(undefined) {
    'use strict';

    angular
        .module('bmg/template/alert', [])
        .run(['$templateCache', function($templateCache) {
            $templateCache.put('bmg/template/alert.html', [
                '<div',
                '    class="alert alert-{{ ctrl.type }}"',
                '    role="alert">',
                '    <i',
                '        data-ng-if="ctrl.icon"',
                '        class="alert-icon fa fa-{{ ctrl.icon }}"></i>',
                '    <span data-ng-transclude></span>',
                '</div>'
            ].join(''));
        }]);
})();

(function (angular) {
    angular.module("uib/template/datepicker/datepicker.html", []).run(["$templateCache", function($templateCache) {
        $templateCache.put("uib/template/datepicker/datepicker.html",
            "<div class=\"uib-datepicker\" ng-switch=\"datepickerMode\" role=\"application\" ng-keydown=\"keydown($event)\">\n" +
            "  <uib-daypicker ng-switch-when=\"day\" tabindex=\"0\"></uib-daypicker>\n" +
            "  <uib-monthpicker ng-switch-when=\"month\" tabindex=\"0\"></uib-monthpicker>\n" +
            "  <uib-yearpicker ng-switch-when=\"year\" tabindex=\"0\"></uib-yearpicker>\n" +
            "</div>\n" +
            "");
    }]);

    angular.module("uib/template/datepicker/day.html", []).run(["$templateCache", function($templateCache) {
        $templateCache.put("uib/template/datepicker/day.html",
            "<table class=\"uib-daypicker\" role=\"grid\" aria-labelledby=\"{{::uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +
            "  <thead>\n" +
            "    <tr>\n" +
            "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-left uib-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"fa fa-chevron-left\"></i></button></th>\n" +
            "      <th colspan=\"{{::5 + showWeeks}}\"><button id=\"{{::uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-sm uib-title\" ng-click=\"toggleMode()\" ng-disabled=\"datepickerMode === maxMode\" tabindex=\"-1\"><strong>{{title}}</strong></button></th>\n" +
            "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-right uib-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"fa fa-chevron-right\"></i></button></th>\n" +
            "    </tr>\n" +
            "    <tr>\n" +
            "      <th ng-if=\"showWeeks\" class=\"text-center\"></th>\n" +
            "      <th ng-repeat=\"label in ::labels track by $index\" class=\"text-center\"><small aria-label=\"{{::label.full}}\">{{::label.abbr}}</small></th>\n" +
            "    </tr>\n" +
            "  </thead>\n" +
            "  <tbody>\n" +
            "    <tr class=\"uib-weeks\" ng-repeat=\"row in rows track by $index\">\n" +
            "      <td ng-if=\"showWeeks\" class=\"text-center h6\"><em>{{ weekNumbers[$index] }}</em></td>\n" +
            "      <td ng-repeat=\"dt in row\" class=\"uib-day text-center\" role=\"gridcell\"\n" +
            "        id=\"{{::dt.uid}}\"\n" +
            "        ng-class=\"::dt.customClass\">\n" +
            "        <button type=\"button\" class=\"btn btn-default btn-sm\"\n" +
            "          uib-is-class=\"\n" +
            "            'btn-info' for selectedDt,\n" +
            "            'active' for activeDt\n" +
            "            on dt\"\n" +
            "          ng-click=\"select(dt.date)\"\n" +
            "          ng-disabled=\"::dt.disabled\"\n" +
            "          tabindex=\"-1\"><span ng-class=\"::{'text-muted': dt.secondary, 'text-info': dt.current}\">{{::dt.label}}</span></button>\n" +
            "      </td>\n" +
            "    </tr>\n" +
            "  </tbody>\n" +
            "</table>\n" +
            "");
    }]);

    angular.module("uib/template/datepicker/month.html", []).run(["$templateCache", function($templateCache) {
        $templateCache.put("uib/template/datepicker/month.html",
            "<table class=\"uib-monthpicker\" role=\"grid\" aria-labelledby=\"{{::uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +
            "  <thead>\n" +
            "    <tr>\n" +
            "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-left uib-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"fa fa-chevron-left\"></i></button></th>\n" +
            "      <th><button id=\"{{::uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-sm uib-title\" ng-click=\"toggleMode()\" ng-disabled=\"datepickerMode === maxMode\" tabindex=\"-1\"><strong>{{title}}</strong></button></th>\n" +
            "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-right uib-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"fa fa-chevron-right\"></i></button></th>\n" +
            "    </tr>\n" +
            "  </thead>\n" +
            "  <tbody>\n" +
            "    <tr class=\"uib-months\" ng-repeat=\"row in rows track by $index\">\n" +
            "      <td ng-repeat=\"dt in row\" class=\"uib-month text-center\" role=\"gridcell\"\n" +
            "        id=\"{{::dt.uid}}\"\n" +
            "        ng-class=\"::dt.customClass\">\n" +
            "        <button type=\"button\" class=\"btn btn-default\"\n" +
            "          uib-is-class=\"\n" +
            "            'btn-info' for selectedDt,\n" +
            "            'active' for activeDt\n" +
            "            on dt\"\n" +
            "          ng-click=\"select(dt.date)\"\n" +
            "          ng-disabled=\"::dt.disabled\"\n" +
            "          tabindex=\"-1\"><span ng-class=\"::{'text-info': dt.current}\">{{::dt.label}}</span></button>\n" +
            "      </td>\n" +
            "    </tr>\n" +
            "  </tbody>\n" +
            "</table>\n" +
            "");
    }]);

    angular.module("uib/template/datepicker/year.html", []).run(["$templateCache", function($templateCache) {
        $templateCache.put("uib/template/datepicker/year.html",
            "<table class=\"uib-yearpicker\" role=\"grid\" aria-labelledby=\"{{::uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +
            "  <thead>\n" +
            "    <tr>\n" +
            "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-left uib-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"fa fa-chevron-left\"></i></button></th>\n" +
            "      <th colspan=\"{{::columns - 2}}\"><button id=\"{{::uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-sm uib-title\" ng-click=\"toggleMode()\" ng-disabled=\"datepickerMode === maxMode\" tabindex=\"-1\"><strong>{{title}}</strong></button></th>\n" +
            "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-right uib-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"fa fa-chevron-right\"></i></button></th>\n" +
            "    </tr>\n" +
            "  </thead>\n" +
            "  <tbody>\n" +
            "    <tr class=\"uib-years\" ng-repeat=\"row in rows track by $index\">\n" +
            "      <td ng-repeat=\"dt in row\" class=\"uib-year text-center\" role=\"gridcell\"\n" +
            "        id=\"{{::dt.uid}}\"\n" +
            "        ng-class=\"::dt.customClass\">\n" +
            "        <button type=\"button\" class=\"btn btn-default\"\n" +
            "          uib-is-class=\"\n" +
            "            'btn-info' for selectedDt,\n" +
            "            'active' for activeDt\n" +
            "            on dt\"\n" +
            "          ng-click=\"select(dt.date)\"\n" +
            "          ng-disabled=\"::dt.disabled\"\n" +
            "          tabindex=\"-1\"><span ng-class=\"::{'text-info': dt.current}\">{{::dt.label}}</span></button>\n" +
            "      </td>\n" +
            "    </tr>\n" +
            "  </tbody>\n" +
            "</table>\n" +
            "");
    }]);

    angular.module("uib/template/datepickerPopup/popup.html", []).run(["$templateCache", function($templateCache) {
        $templateCache.put("uib/template/datepickerPopup/popup.html",
            "<div>\n" +
            "  <ul class=\"uib-datepicker-popup dropdown-menu uib-position-measure\" dropdown-nested ng-if=\"isOpen\" ng-keydown=\"keydown($event)\" ng-click=\"$event.stopPropagation()\">\n" +
            "    <li ng-transclude></li>\n" +
            "    <li ng-if=\"showButtonBar\" class=\"uib-button-bar\">\n" +
            "      <span class=\"btn-group uib-center\">\n" +
            "        <button type=\"button\" class=\"btn btn-sm btn-primary uib-datepicker-current\" ng-click=\"select('today', $event)\" ng-disabled=\"isDisabled('today')\">{{ getText('current') }}</button>\n" +
            "      </span>\n" +
            "    </li>\n" +
            "  </ul>\n" +
            "</div>\n" +
            "");
    }]);
})(angular);

/*
 Bootstrap - File Input
 ======================

 This is meant to convert all file input tags into a set of elements that displays consistently in all browsers.

 Converts all
 <input type="file">
 into Bootstrap buttons
 <a class="btn">Browse</a>

 http://gregpike.net/demos/bootstrap-file-input/demo.html
 */
(function($) {

    $.fn.bootstrapFileInput = function() {

        this.each(function(i,elem){

                var $elem = $(elem);

                // Maybe some fields don't need to be standardized.
                if (typeof $elem.attr('data-bfi-disabled') != 'undefined') {
                    return;
                }

                // Set the word to be displayed on the button
                var buttonWord = 'Browse';

                if (typeof $elem.attr('title') != 'undefined') {
                    buttonWord = $elem.attr('title');
                }

                var className = '';

                if (!!$elem.attr('class')) {
                    className = ' ' + $elem.attr('class');
                }

                // Now we're going to wrap that input field with a Bootstrap button.
                // The input will actually still be there, it will just be float above and transparent (done with the CSS).
                $elem.wrap('<span class="file-input-wrapper btn btn-default ' + className + '"></span>').parent().prepend($('<span></span>').html(buttonWord));
            })

            // After we have found all of the file inputs let's apply a listener for tracking the mouse movement.
            // This is important because the in order to give the illusion that this is a button in FF we actually need to move the button from the file input under the cursor. Ugh.
            .promise().done( function(){

            // As the cursor moves over our new Bootstrap button we need to adjust the position of the invisible file input Browse button to be under the cursor.
            // This gives us the pointer cursor that FF denies us
            $('.file-input-wrapper').mousemove(function(cursor) {

                var input, wrapper,
                    wrapperX, wrapperY,
                    inputWidth, inputHeight,
                    cursorX, cursorY;

                // This wrapper element (the button surround this file input)
                wrapper = $(this);
                // The invisible file input element
                input = wrapper.find("input");
                // The left-most position of the wrapper
                wrapperX = wrapper.offset().left;
                // The top-most position of the wrapper
                wrapperY = wrapper.offset().top;
                // The with of the browsers input field
                inputWidth= input.width();
                // The height of the browsers input field
                inputHeight= input.height();
                //The position of the cursor in the wrapper
                cursorX = cursor.pageX;
                cursorY = cursor.pageY;

                //The positions we are to move the invisible file input
                // The 20 at the end is an arbitrary number of pixels that we can shift the input such that cursor is not pointing at the end of the Browse button but somewhere nearer the middle
                moveInputX = cursorX - wrapperX - inputWidth + 20;
                // Slides the invisible input Browse button to be positioned middle under the cursor
                moveInputY = cursorY- wrapperY - (inputHeight/2);

                // Apply the positioning styles to actually move the invisible file input
                input.css({
                    left:moveInputX,
                    top:moveInputY
                });
            });

            $('body').on('change', '.file-input-wrapper input[type=file]', function(){

                var fileName;
                fileName = $(this).val();

                // Remove any previous file names
                $(this).parent().next('.file-input-name').remove();
                if (!!$(this).prop('files') && $(this).prop('files').length > 1) {
                    fileName = $(this)[0].files.length+' files';
                }
                else {
                    fileName = fileName.substring(fileName.lastIndexOf('\\') + 1, fileName.length);
                }

                // Don't try to show the name if there is none
                if (!fileName) {
                    return;
                }

                var selectedFileNamePlacement = $(this).data('filename-placement');
                if (selectedFileNamePlacement === 'inside') {
                    // Print the fileName inside
                    $(this).siblings('span').html(fileName);
                    $(this).attr('title', fileName);
                } else {
                    // Print the fileName aside (right after the the button)
                    $(this).parent().after('<span class="file-input-name">'+fileName+'</span>');
                }
            });

        });

    };

// Add the styles before the first stylesheet
// This ensures they can be easily overridden with developer styles
    var cssHtml = '<style>'+
        '.file-input-wrapper { overflow: hidden; position: relative; cursor: pointer; z-index: 1; }'+
        '.file-input-wrapper input[type=file], .file-input-wrapper input[type=file]:focus, .file-input-wrapper input[type=file]:hover { position: absolute; top: 0; left: 0; cursor: pointer; opacity: 0; filter: alpha(opacity=0); z-index: 99; outline: 0; }'+
        '.file-input-name { margin-left: 8px; }'+
        '</style>';
    $('link[rel=stylesheet]').eq(0).before(cssHtml);
})(jQuery);

angular.module('bmg.components.ui')
    .directive('typeahead', function () {
        return {
            restrict: 'A',
            priority: 1000, // Let's ensure AngularUI Typeahead directive gets initialized first!
            link: function (scope, element, attrs) {
                // Bind keyboard events: arrows up(38) / down(40)
                element.bind('keydown', function (evt) {
                    if (evt.which === 38 || evt.which === 40) {
                        // Broadcast a possible change of the currently active option:
                        // (Note that we could pass the activeIdx value as event data but AngularUI Typeahead directive
                        //  has its own local scope which makes it hard to retrieve, see:
                        //  https://github.com/angular-ui/bootstrap/blob/7b7039b4d94074987fa405ee1174cfe7f561320e/src/typeahead/typeahead.js#L104)
                        scope.$broadcast('TypeaheadActiveChanged');
                    }
                });
            }
        };
    })
    .directive('typeaheadPopup', function () {
        return {
            restrict: 'EA',
            link: function (scope, element, attrs) {
                var unregisterFn = scope.$on('TypeaheadActiveChanged', function (event, data) {
                    if(scope.activeIdx !== -1) {
                        // Retrieve active Typeahead option:
                        var option = element.find('#' + attrs.id + '-option-' + scope.activeIdx);
                        if(option.length) {
                            // Make sure option is visible:
                            option[0].scrollIntoView(false);
                        }
                    }
                });

                // Ensure listener is unregistered when $destroy event is fired:
                scope.$on('$destroy', unregisterFn);
            }
        };
});
(function (angular) {
    angular.module("ui.select").run(["$templateCache", function($templateCache) {
        $templateCache.put("bootstrap/choices.tpl.html","<ul class=\"ui-select-choices ui-select-choices-content ui-select-dropdown dropdown-menu\" role=\"listbox\" ng-show=\"$select.open\"><li class=\"ui-select-choices-group\" id=\"ui-select-choices-{{ $select.generatedId }}\"><div class=\"divider\" ng-show=\"$select.isGrouped && $index > 0\"></div><div ng-show=\"$select.isGrouped\" class=\"ui-select-choices-group-label dropdown-header\" ng-bind=\"$group.name\"></div><div id=\"ui-select-choices-row-{{ $select.generatedId }}-{{$index}}\" class=\"ui-select-choices-row\" ng-class=\"{active: $select.isActive(this), disabled: $select.isDisabled(this)}\" role=\"option\"><a href=\"\" class=\"ui-select-choices-row-inner\"></a></div></li></ul>");
        $templateCache.put("bootstrap/match-multiple.tpl.html","<span class=\"ui-select-match\"><span ng-repeat=\"$item in $select.selected\"><span class=\"ui-select-match-item btn btn-default btn-xs\" tabindex=\"-1\" type=\"button\" ng-disabled=\"$select.disabled\" ng-click=\"$selectMultiple.activeMatchIndex = $index;\" ng-class=\"{\'btn-primary\':$selectMultiple.activeMatchIndex === $index, \'select-locked\':$select.isLocked(this, $index)}\" ui-select-sort=\"$select.selected\"><span class=\"close ui-select-match-close\" ng-hide=\"$select.disabled\" ng-click=\"$selectMultiple.removeChoice($index)\">&nbsp;&times;</span> <span uis-transclude-append=\"\"></span></span></span></span>");
        $templateCache.put("bootstrap/match.tpl.html","<div class=\"ui-select-match\" ng-hide=\"$select.open\" ng-disabled=\"$select.disabled\" ng-class=\"{\'btn-default-focus\':$select.focus}\"><span tabindex=\"-1\" class=\"btn btn-default form-control ui-select-toggle\" aria-label=\"{{ $select.baseTitle }} activate\" ng-disabled=\"$select.disabled\" ng-click=\"$select.activate()\" style=\"outline: 0;\"><span ng-show=\"$select.isEmpty()\" class=\"ui-select-placeholder text-muted\">{{$select.placeholder}}</span> <span ng-hide=\"$select.isEmpty()\" class=\"ui-select-match-text pull-left\" ng-class=\"{\'ui-select-allow-clear\': $select.allowClear && !$select.isEmpty()}\" ng-transclude=\"\"></span> <i class=\"caret pull-right\" ng-click=\"$select.toggle($event)\"></i> <a ng-show=\"$select.allowClear && !$select.isEmpty()\" aria-label=\"{{ $select.baseTitle }} clear\" style=\"margin-right: 10px;\" ng-click=\"$select.clear($event)\" class=\"btn btn-xs btn-link pull-right custom-remove-icon\"><i class=\"fa fa-remove\" aria-hidden=\"true\"></i></a></span></div>");
        $templateCache.put("bootstrap/select-multiple.tpl.html","<div class=\"ui-select-container ui-select-multiple ui-select-bootstrap dropdown form-control\" ng-class=\"{open: $select.open}\"><div><div class=\"ui-select-match\"></div><input type=\"text\" autocomplete=\"off\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"false\" class=\"ui-select-search input-xs\" placeholder=\"{{$selectMultiple.getPlaceholder()}}\" ng-disabled=\"$select.disabled\" ng-hide=\"$select.disabled\" ng-click=\"$select.activate()\" ng-model=\"$select.search\" role=\"combobox\" aria-label=\"{{ $select.baseTitle }}\" ondrop=\"return false;\"></div><div class=\"ui-select-choices\"></div></div>");
        $templateCache.put("bootstrap/select.tpl.html","<div class=\"ui-select-container ui-select-bootstrap dropdown\" ng-class=\"{open: $select.open}\"><div class=\"ui-select-match\"></div><input type=\"text\" autocomplete=\"off\" tabindex=\"-1\" aria-expanded=\"true\" aria-label=\"{{ $select.baseTitle }}\" aria-owns=\"ui-select-choices-{{ $select.generatedId }}\" aria-activedescendant=\"ui-select-choices-row-{{ $select.generatedId }}-{{ $select.activeIndex }}\" class=\"form-control ui-select-search\" placeholder=\"{{$select.placeholder}}\" ng-model=\"$select.search\" ng-show=\"$select.searchEnabled && $select.open\"><div class=\"ui-select-choices\"></div></div>");
        $templateCache.put("select2/choices.tpl.html","<ul class=\"ui-select-choices ui-select-choices-content select2-results\"><li class=\"ui-select-choices-group\" ng-class=\"{\'select2-result-with-children\': $select.choiceGrouped($group) }\"><div ng-show=\"$select.choiceGrouped($group)\" class=\"ui-select-choices-group-label select2-result-label\" ng-bind=\"$group.name\"></div><ul role=\"listbox\" id=\"ui-select-choices-{{ $select.generatedId }}\" ng-class=\"{\'select2-result-sub\': $select.choiceGrouped($group), \'select2-result-single\': !$select.choiceGrouped($group) }\"><li role=\"option\" id=\"ui-select-choices-row-{{ $select.generatedId }}-{{$index}}\" class=\"ui-select-choices-row\" ng-class=\"{\'select2-highlighted\': $select.isActive(this), \'select2-disabled\': $select.isDisabled(this)}\"><div class=\"select2-result-label ui-select-choices-row-inner\"></div></li></ul></li></ul>");
        $templateCache.put("select2/match-multiple.tpl.html","<span class=\"ui-select-match\"><li class=\"ui-select-match-item select2-search-choice\" ng-repeat=\"$item in $select.selected\" ng-class=\"{\'select2-search-choice-focus\':$selectMultiple.activeMatchIndex === $index, \'select2-locked\':$select.isLocked(this, $index)}\" ui-select-sort=\"$select.selected\"><span uis-transclude-append=\"\"></span> <a href=\"javascript:;\" class=\"ui-select-match-close select2-search-choice-close\" ng-click=\"$selectMultiple.removeChoice($index)\" tabindex=\"-1\"></a></li></span>");
        $templateCache.put("select2/match.tpl.html","<a class=\"select2-choice ui-select-match\" ng-class=\"{\'select2-default\': $select.isEmpty()}\" ng-click=\"$select.toggle($event)\" aria-label=\"{{ $select.baseTitle }} select\"><span ng-show=\"$select.isEmpty()\" class=\"select2-chosen\">{{$select.placeholder}}</span> <span ng-hide=\"$select.isEmpty()\" class=\"select2-chosen\" ng-transclude=\"\"></span> <abbr ng-if=\"$select.allowClear && !$select.isEmpty()\" class=\"select2-search-choice-close\" ng-click=\"$select.clear($event)\"></abbr> <span class=\"select2-arrow ui-select-toggle\"><b></b></span></a>");
        $templateCache.put("select2/select-multiple.tpl.html","<div class=\"ui-select-container ui-select-multiple select2 select2-container select2-container-multi\" ng-class=\"{\'select2-container-active select2-dropdown-open open\': $select.open, \'select2-container-disabled\': $select.disabled}\"><ul class=\"select2-choices\"><span class=\"ui-select-match\"></span><li class=\"select2-search-field\"><input type=\"text\" autocomplete=\"off\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"false\" role=\"combobox\" aria-expanded=\"true\" aria-owns=\"ui-select-choices-{{ $select.generatedId }}\" aria-label=\"{{ $select.baseTitle }}\" aria-activedescendant=\"ui-select-choices-row-{{ $select.generatedId }}-{{ $select.activeIndex }}\" class=\"select2-input ui-select-search\" placeholder=\"{{$selectMultiple.getPlaceholder()}}\" ng-disabled=\"$select.disabled\" ng-hide=\"$select.disabled\" ng-model=\"$select.search\" ng-click=\"$select.activate()\" style=\"width: 34px;\" ondrop=\"return false;\"></li></ul><div class=\"ui-select-dropdown select2-drop select2-with-searchbox select2-drop-active\" ng-class=\"{\'select2-display-none\': !$select.open}\"><div class=\"ui-select-choices\"></div></div></div>");
        $templateCache.put("select2/select.tpl.html","<div class=\"ui-select-container select2 select2-container\" ng-class=\"{\'select2-container-active select2-dropdown-open open\': $select.open, \'select2-container-disabled\': $select.disabled, \'select2-container-active\': $select.focus, \'select2-allowclear\': $select.allowClear && !$select.isEmpty()}\"><div class=\"ui-select-match\"></div><div class=\"ui-select-dropdown select2-drop select2-with-searchbox select2-drop-active\" ng-class=\"{\'select2-display-none\': !$select.open}\"><div class=\"select2-search\" ng-show=\"$select.searchEnabled\"><input type=\"text\" autocomplete=\"off\" autocorrect=\"false\" autocapitalize=\"off\" spellcheck=\"false\" role=\"combobox\" aria-expanded=\"true\" aria-owns=\"ui-select-choices-{{ $select.generatedId }}\" aria-label=\"{{ $select.baseTitle }}\" aria-activedescendant=\"ui-select-choices-row-{{ $select.generatedId }}-{{ $select.activeIndex }}\" class=\"ui-select-search select2-input\" ng-model=\"$select.search\"></div><div class=\"ui-select-choices\"></div></div></div>");
        $templateCache.put("selectize/choices.tpl.html","<div ng-show=\"$select.open\" class=\"ui-select-choices ui-select-dropdown selectize-dropdown single\"><div class=\"ui-select-choices-content selectize-dropdown-content\"><div class=\"ui-select-choices-group optgroup\" role=\"listbox\"><div ng-show=\"$select.isGrouped\" class=\"ui-select-choices-group-label optgroup-header\" ng-bind=\"$group.name\"></div><div role=\"option\" class=\"ui-select-choices-row\" ng-class=\"{active: $select.isActive(this), disabled: $select.isDisabled(this)}\"><div class=\"option ui-select-choices-row-inner\" data-selectable=\"\"></div></div></div></div></div>");
        $templateCache.put("selectize/match.tpl.html","<div ng-hide=\"($select.open || $select.isEmpty())\" class=\"ui-select-match\" ng-transclude=\"\"></div>");
        $templateCache.put("selectize/select.tpl.html","<div class=\"ui-select-container selectize-control single\" ng-class=\"{\'open\': $select.open}\"><div class=\"selectize-input\" ng-class=\"{\'focus\': $select.open, \'disabled\': $select.disabled, \'selectize-focus\' : $select.focus}\" ng-click=\"$select.open && !$select.searchEnabled ? $select.toggle($event) : $select.activate()\"><div class=\"ui-select-match\"></div><input type=\"text\" autocomplete=\"off\" tabindex=\"-1\" class=\"ui-select-search ui-select-toggle\" ng-click=\"$select.toggle($event)\" placeholder=\"{{$select.placeholder}}\" ng-model=\"$select.search\" ng-hide=\"!$select.searchEnabled || ($select.selected && !$select.open)\" ng-disabled=\"$select.disabled\" aria-label=\"{{ $select.baseTitle }}\"></div><div class=\"ui-select-choices\"></div></div>");
    }]);
})(angular);

(function(undefined) {
    'use strict';

    angular
        .module('user/dialogs/templates', [])
        .run(['$templateCache', function($templateCache) {
            $templateCache.put('user/dialogs/confirm.html', [
                '<div class="modal-close">',
                '    <button',
                '        type="button"',
                '        class="close"',
                '        data-ng-click="ctrl.cancel()"><i class="fa fa-times color-secondary"></i></button>',
                '</div>',
                '<div class="modal-header">',
                '    <h2',
                '        class="modal-title"',
                '        data-ng-bind="ctrl.title"></h2>',
                '</div>',
                '<div class="modal-body">',
                '    <div class="row">',
                '        <div',
                '            class="col-xs-12"',
                '            data-ng-bind="ctrl.text"></div>',
                '    </div>',
                '</div>',
                '<div class="modal-footer">',
                '    <hr>',
                '    <button',
                '        class="btn btn-secondary"',
                '        type="button"',
                '        data-ng-bind="ctrl.secondaryActionCaption"',
                '        data-ng-click="ctrl.cancel()"></button>',
                '    <button',
                '        class="btn btn-{{ ctrl.primaryClass }}"',
                '        type="button"',
                '        data-ng-bind="ctrl.primaryActionCaption"',
                '        data-ng-click="ctrl.ok()"></button>',
                '</div>'
            ].join(''));
        }]);
})();

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
                    '        data-ng-model-options="{}"',
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

(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('bmgAlert', bmgAlert);

    bmgAlert.$inject = [];

    function bmgAlert() {
        return {
            replace: true,
            templateUrl: 'bmg/template/alert.html',
            scope: {
                type: '@',
                icon: '@?'
            },
            transclude: true,
            bindToController: true,
            controller: function() {},
            controllerAs: 'ctrl'
        };
    }
})();

(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .controller('BmgDatepickerController', BmgDatepickerController);

    BmgDatepickerController.$inject = ['$scope'];

    function BmgDatepickerController($scope) {
        this.today = function() {
            this.dt = new Date();
        };
        this.today();

        $scope.dateOptions = {
            dateDisabled: disabled,
            formatYear: 'yyyy',
            formatMonth: 'MMMM',
            formatDate: 'dd',
            startingDay: 1,
            showWeeks: false
        };

        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }

        this.open = function() {
            this.popup.opened = true;
        };

        this.setDate = function(year, month, day) {
            this.dt = new Date(year, month, day);
        };

        this.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        this.format = this.formats[2];

        this.popup = {
            opened: false
        };
    }

})();

(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('bmgDatepicker', bmgDatepicker);

    function bmgDatepicker() {
        return {
            replace: true,
            require: 'ngModel',
            templateUrl: 'bmg/template/datepicker/control.html',
            controller: 'BmgDatepickerController as bmgDatepickerCtrl',
            link: function(scope, elem, attrs, ngModelCtrl) {
                scope.selectedDate = {
                    value: scope.$eval(attrs.ngModel)
                };

                scope.updateDate = function() {
                    ngModelCtrl.$setViewValue(scope.selectedDate.value);
                };
            }
        };
    }
})();

(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('bmgOneClickSelect', bmgOneClickSelect);

    function bmgOneClickSelect($timeout) {
        return {
            replace: true,
            template: '<select class="form-control"></select>',
            link: function(scope, elem, attrs) {
                var visible = false;

                scope.$watch(function() {
                    return elem.is(':visible') && elem.is(':focus');
                }, function() {
                    if (!visible) {
                        $timeout(function() {
                            openSelect(elem);
                            visible = true;
                        });
                    }
                });
            }
        };
    }

    function openSelect(elem) {
        var e = document.createEvent("MouseEvents");
        e.initMouseEvent(
            "mousedown", true, true, window, 0, 0, 0, 0, 0,
            false, false, false, false, 0, null
        );
        elem[0].dispatchEvent(e);
    }

    bmgOneClickSelect.$inject = ['$timeout'];
})();

(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('bmgTypeahead', bmgTypeahead);

    function bmgTypeahead() {
        return {
            replace: true,
            require: 'ngModel',
            templateUrl: 'bmg/template/typeahead/control.html',
            link: function(scope, elem, attrs, ngModelCtrl) {
                scope.selectedValue = scope.$eval(attrs.ngModel);

                scope.updateModel = function() {
                    ngModelCtrl.$setViewValue(scope.selectedValue);
                };
            }
        };
    }
})();

(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('collapsingNavbar', collapsingNavbar);

    // saves the previous 10 scroll positions
    var lastKnownScrollPositions = [];
    var isCollapsed = false;
    var config = {};

    function collapsingNavbar() {
        return {
            restrict: 'A',
            scope: {
                config: '=collapsingNavbar'
            },
            link: function(scope, elem) {
                config.mindFloatThead = !!scope.config.mindFloatThead;
                config.collapsedHeight = scope.config.collapsedHeight || 20;
                config.expandedHeight = scope.config.expandedHeight || 75;

                window.setInterval(checkScrollStatus, 200);

                $('nav.navbar').click(expandNavbar);

                // add expand hint
                var expandHint = angular.element(
                    '<div class="bmg-nav-expand-hint"><i class="fa fa-bars"></i></div>');

                elem.find('.container-fluid').append(expandHint);
            }
        };
    }

    function checkScrollStatus() {
        // check scroll status every 200ms
        var scrollTop = $(document).scrollTop();
        lastKnownScrollPositions.push(scrollTop);

        if (lastKnownScrollPositions.length > 10) {
            // only the last 10 positions should be saved
            lastKnownScrollPositions.shift();

            var earliestKnownScrollTop = lastKnownScrollPositions[0];
            var previousScrollTop = lastKnownScrollPositions[lastKnownScrollPositions.length - 2];

            if (scrollTop !== previousScrollTop) {
                // do not do anything if we're not scrolling anymore

                if ((scrollTop - earliestKnownScrollTop) > 200 && !isCollapsed) {
                    // more than 200px scrolled down? -> collapse
                    collapseNavbar();
                }

                // at the top of the page or more than 200px
                // scrolled up? -> expand
                if (((earliestKnownScrollTop - scrollTop) > 200 || scrollTop <= 50) &&
                    isCollapsed) {
                    expandNavbar();
                }
            }
        }
    }

    function collapseNavbar() {
        $('nav.navbar').addClass('smaller');
        rearrangeStickyBars(true);
        isCollapsed = true;
    }

    function expandNavbar() {
        $('nav.navbar').removeClass('smaller');
        rearrangeStickyBars(false);
        isCollapsed = false;
    }

    function rearrangeStickyBars(up) {
        var stickyBars = $('*[sticky]');

        if (up) {
            stickyBars.attr('offset', config.collapsedHeight);
            stickyBars.css('top', config.collapsedHeight + 'px');
        } else {
            stickyBars.attr('offset', config.expandedHeight);
            stickyBars.css('top', config.expandedHeight + 'px');
        }

        if (config.mindFloatThead) {
            changefloatTheadTop(up);
        }
    }

    function changefloatTheadTop(up) {
        var tableSelector = '.table-responsive table, ' +
            '.tableStandard-responsive table, ' +
            '.tableCondensed-responsive table';

        // reinitialize floating table headers
        $(tableSelector).floatThead('destroy');

        $(tableSelector).floatThead({
            top: function($table) {
                return up ? config.collapsedHeight : config.expandedHeight;
            },
            responsiveContainer: function($table) {
                return $table.closest('.table-responsive, ' +
                    '.tableStandard-responsive, ' +
                    '.tableCondensed-responsive');
            }
        });
    }
})();

(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('contentPlaceholder', contentPlaceholder);

    contentPlaceholder.$inject = ['$compile'];

    function contentPlaceholder($compile) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                contentPromise: '&'
            },
            bindToController: true,
            controllerAs: 'ctrl',
            transclude: true,
            require: 'contentPlaceholder',
            template: '<div data-ng-transclude></div>',
            link: function(scope, elem, attrs, ourCtrl) {
                showLoading();

                if (angular.isFunction(ourCtrl.contentPromise)) {
                    var promise = ourCtrl.contentPromise();

                    if (angular.isFunction(promise.then)) {
                        promise.then(function() {
                            showContent();
                        }, function(err) {
                            showError(err);
                        });
                    }
                }

                function showLoading() {
                    $(elem).children().hide();
                    $(elem)
                        .addClass('content-loading')
                        .append('<i class="fa fa-spin fa-spinner content-placeholder-loading"></i>');
                }

                function showContent() {
                    $(elem)
                        .removeClass('content-loading')
                        .find('.content-placeholder-loading')
                        .remove();
                    $(elem).children().show();
                }

                function showError() {
                    $(elem)
                        .removeClass('content-loading')
                        .find('.content-placeholder-loading')
                        .remove();
                    $(elem)
                        .append('<div class="content-error">' + err + '</div>');
                }
             },
            controller: function() {}
        };
    }
})();

(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('dollarSelectGrabber', dollarSelectGrabber);

    dollarSelectGrabber.$inject = ['$rootScope', '$timeout'];

    function dollarSelectGrabber($rootScope, $timeout) {
        return {
            restrict: 'A',
            require: 'uiSelect',
            link: function(scope, elem, attrs, $select) {
                $timeout(function() {
                    $rootScope.$broadcast(
                        '$selectController',
                        $select,
                        attrs.identifier
                    );
                });
            }
        };
    }
})();

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

(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('inlineCheckbox', inlineCheckbox);

    function inlineCheckbox($timeout, utilService) {
        return {
            replace: true,
            scope: {
                ngModel: '=',
                oncommit: '&',
                disabled: '=?',
                tabindex: '@?'
            },
            templateUrl: 'bmg/template/inline/checkbox.html',
            require: 'ngModel',
            link: function(scope, elem, attrs, ngModel) {
                $timeout(function() {
                    var labelElem = $(elem).find('label');
                    var checkboxElem = $(elem).find('input');
                    var successIndicator = $(elem).find('.success-indicator');
                    var container = $(elem).closest('.inline-edit-container');

                    // internal label support
                    labelElem.on('click', function() {
                        toggleModel();
                    });

                    // global label support
                    utilService.addLabelSupport(attrs.id, function() {
                        toggleModel();
                    });

                    function toggleModel() {
                        if (scope.disabled === true) {
                            return;
                        }

                        ngModel.$setViewValue(!ngModel.$viewValue);

                        // inform tabbable form about focus change
                        if (scope.tabindex) {
                            scope.$emit('inline-form.focus-changed', parseInt(scope.tabindex, 10));
                        }

                        var commitPromise = angular.isDefined(scope.oncommit) ?
                            scope.oncommit({
                                $data: ngModel.$viewValue
                            }) : undefined;

                        if (utilService.isPromise(commitPromise)) {
                            animateSuccessIndicator(commitPromise);
                        } else {
                            animateSuccessIndicator();
                        }
                    }

                    function animateSuccessIndicator(commitPromise) {
                        container.removeClass('has-error');
                        successIndicator.addClass('active');

                        if (commitPromise) {
                            successIndicator
                                .find('i')
                                .removeClass('fa-remove fa-check')
                                .addClass('fa-spin fa-spinner');

                            commitPromise.then(function() {
                                successIndicator
                                    .find('i')
                                    .removeClass('fa-spin fa-spinner')
                                    .addClass('fa-check');
                                endAnimation();
                            }, function(error) {
                                successIndicator
                                    .find('i')
                                    .removeClass('fa-spin fa-spinner')
                                    .addClass('fa-remove');
                                container.addClass('has-error');
                                scope.errorMessage = error;

                                endAnimation();
                            });
                        } else {
                            successIndicator
                                .find('i')
                                .removeClass('fa-check fa-remove')
                                .addClass('fa-check');
                            endAnimation();
                        }
                    }

                    function endAnimation() {
                        $timeout(function() {
                            successIndicator.removeClass('active');
                        }, 500);
                    }
                });
            }
        };
    }
})();

(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('inlineDatepicker', inlineDatepicker);

    function inlineDatepicker($timeout, utilService, keyConstants) {
        return {
            replace: true,
            scope: {
                ngModel: '=',
                placeholder: '@?',
                oncommit: '&?',
                datepickerOptions: '=?',
                popupPlacement: '@?',
                dateFormat: '@?',
                showButtonBar: "=?",
                disabled: '=?',
                tabindex: '@?'
            },
            templateUrl: 'bmg/template/inline/datepicker.html',
            require: 'ngModel',
            link: function(scope, elem, attrs, ngModel) {
                $timeout(function() {
                    var initialValue = ngModel.$viewValue || null;
                    var successIndicator = elem.find('.success-indicator');
                    var inputElem = elem.find('.inline-datepicker');
                    var undoBtn = elem.find('.revert-button');
                    var container = elem.closest('.inline-edit-container');

                    scope.popup = {
                        opened: false
                    };

                    scope.open = function() {
                        this.popup.opened = true;
                    };

                    scope.updateDate = function() {
                        $timeout(function() {
                            // timeout necessary because $viewValue
                            // lags one step behind otherwise
                            if (hasActuallyChanged()) {
                                if (inputElem.is(':focus')) {
                                    // change was typed in the text field
                                    utilService.showUndoBtn(undoBtn);
                                }
                            } else {
                                utilService.hideUndoBtn(undoBtn);
                            }
                        });
                    };

                    inputElem.on('keyup', function(e) {
                        if (e.keyCode === keyConstants.ENTER_KEY ||
                            e.which === keyConstants.ENTER_KEY) {
                            // ENTER pressed
                            inputElem.blur();
                        } else if (e.keyCode === keyConstants.ESCAPE_KEY ||
                            e.which === keyConstants.ESCAPE_KEY) {
                            ngModel.$setViewValue(initialValue);
                            inputElem.blur();
                        }
                    });

                    inputElem.on('focus', function() {
                        initialValue = ngModel.$viewValue;

                        // inform tabbable form about focus change
                        if (scope.tabindex) {
                            scope.$emit('inline-form.focus-changed', parseInt(scope.tabindex, 10));
                        }
                    });

                    inputElem.on('blur', function() {
                        $timeout(function() {
                            utilService.hideUndoBtn(undoBtn);

                            // reject nonsense input
                            if (!angular.isDefined(ngModel.$viewValue)) {
                                ngModel.$setViewValue(initialValue);
                                return;
                            }

                            if (hasActuallyChanged()) {
                                // actual change detected
                                // animate success
                                publish();
                            }
                        }, 100);
                    });

                    scope.$on('inline-form.focus-required', function(event, index) {
                        if (scope.tabindex && parseInt(scope.tabindex, 10) === index) {
                            inputElem.focus();
                        }
                    });

                    undoBtn.click(function() {
                        ngModel.$setViewValue(initialValue);
                        utilService.hideUndoBtn(undoBtn);
                        inputElem.focus();
                    });

                    function hasActuallyChanged() {
                        if (!ngModel.$viewValue && !initialValue) {
                            return false;
                        }

                        if (!ngModel.$viewValue && initialValue) {
                            return true;
                        }

                        if (ngModel.$viewValue && !initialValue) {
                            return true;
                        }

                        return initialValue.getTime() !== ngModel.$viewValue.getTime();
                    }

                    function publish() {
                        if (angular.isDefined(scope.oncommit)) {
                            // publish new value
                            var commitPromise = angular.isDefined(scope.oncommit) ?
                                scope.oncommit({
                                    $data: ngModel.$viewValue
                                }) : undefined;

                            if (utilService.isPromise(commitPromise)) {
                                utilService.animateSuccessIndicator(
                                    commitPromise, undoBtn, container, function(message) {
                                        scope.errorMessage = message;
                                    }
                                );
                            } else {
                                utilService.animateSuccessIndicator(
                                    undefined, undoBtn, container, function(message) {
                                        scope.errorMessage = message;
                                    }
                                );
                            }
                        }
                    }

                    // label support
                    utilService.addLabelSupport(attrs.id, function() {
                        inputElem.trigger('focus');
                    });
                });
            }
        };
    }
})();

(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('inlineErrorDisplay', inlineErrorDisplay);

    inlineErrorDisplay.$inject = ['$templateCache', '$compile'];

    function inlineErrorDisplay($templateCache, $compile) {
        return {
            scope: {
                text: '=inlineErrorDisplay'
            },
            bindToController: true,
            controller: function() {},
            controllerAs: 'ctrl',
            require: 'inlineErrorDisplay',
            link: function(scope, elem, attrs, ctrl) {
                if (angular.isUndefined(ctrl.text)) {
                    // no error text, no tooltip
                    return;
                }

                var template = $templateCache.get('bmg/template/inline/error-tooltip.html');
                var triangle = angular.element(template);
                var compiledTriangle = $compile(triangle)(scope);

                $(elem).append(compiledTriangle);

                $('body').tooltip({
                    selector: 'i.inline-error',
                    container: 'body'
                });
            }
        };
    }
})();

(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('inlineForm', inlineForm);

    inlineForm.$inject = ['$timeout', 'keyConstants'];

    function inlineForm($timeout, keyConstants) {
        return {
            restrict: 'C',
            link: function(scope, elem, attrs) {
                $timeout(function() {
                    var tabInputs = $(elem).find('*[tabindex]');
                    var sortedTabIndices = sortIndices(tabInputs);
                    var currentTabIndex;

                    elem.on('keydown', function(e) {
                        if (e.keyCode === keyConstants.TAB_KEY ||
                            e.which === keyConstants.TAB_KEY) {
                            e.preventDefault();

                            // tell next element to focus
                            var nextIndex = getSuccessorIndex(sortedTabIndices, currentTabIndex);
                            scope.$broadcast('inline-form.focus-required', nextIndex);
                            currentTabIndex = nextIndex;
                        }
                    });

                    scope.$on('inline-form.focus-changed', function(event, index) {
                        currentTabIndex = index;
                    });

                    function sortIndices(elements) {
                        var resultList = [];

                        elements.each(function() {
                            resultList.push(parseInt($(this).attr('tabindex'), 10));
                        });

                        return resultList.sort(function(a, b) {
                            return a > b;
                        });
                    }

                    function getSuccessorIndex(allIndices, currentIndex) {
                        if (angular.isUndefined(currentIndex)) {
                            return allIndices[0];
                        }

                        var where = _.indexOf(allIndices, currentIndex);

                        if (where < 0) {
                            return allIndices[0];
                        }

                        return allIndices[(where + 1) % allIndices.length];
                    }
                });
            }
        };
    }
})();

(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('inlineSelect', inlineSelect);

    inlineSelect.$inject = ['$timeout', '$templateCache', '$compile', 'utilService', 'keyConstants'];

    function inlineSelect($timeout, $templateCache, $compile, utilService, keyConstants) {
        return {
            scope: {
                ngModel: '=',
                placeholder: '@?',
                oncommit: '&?',
                items: '=',
                displayProperty: '@?',
                position: '@?',
                id: '@',
                tabindex: '@?',
                refreshDelay: '@?',
                refresh: '&?',
                disabled: '=?',
                allowClear: '=?',
                allowCommitUnchanged: '=?'
            },
            require: 'ngModel',
            link: function(scope, elem, attrs, ngModel) {
                // to identify it in rootScope events
                var identifier = guid();

                /* like ngTransclude, but manual …
                 * ngTransclude does not work in this case because
                 * the transcluded html uses the 'item' variable which
                 * is only made available inside an ng-repeat inside
                 * ui-select, where it doesn't have access to the ng-repeat scope
                 * see: https://github.com/angular/angular.js/issues/8182
                 */
                var children = elem.children();
                var template = angular.element($templateCache.get('bmg/template/inline/select.html'));

                // attach identifier
                template.find('ui-select').attr('data-identifier', identifier);

                if (children.length > 0) {
                    // copy 'transcluded' html into our template
                    template.find('.ui-select-choices').append(children);
                } else {
                    // no transcluded html given -> default to item, assuming it's a string
                    template.find('.ui-select-choices').append(
                        angular.element('<span data-ng-bind-html="item | highlight:$select.search"></span>')
                    );
                }

                // if necessary, bind the ui-select-match to the correct property
                // on the selected item
                if (scope.displayProperty) {
                    template.find('.ui-select-match').attr(
                        'data-ng-bind', '$select.selected.' + scope.displayProperty);
                }

                elem.replaceWith(template); // equivalent to 'replace: true' in directive definition

                var uiSelect = elem.find('.inline-select');
                $compile(template)(scope);

                $timeout(function() {
                    // save initial value for later comparison
                    var initialValue = ngModel.$viewValue;

                    var container = $(template).closest('.inline-edit-container');
                    var dropdownHint = angular.element('<span class="dropdown-hint fa fa-angle-down"></span>');
                    var indicatorButton = angular.element('<button class="revert-button"></button>');
                    var successIndicator = angular.element('<span class="success-indicator fa fa-check"></span>');
                    var inputWrapper = $(template).find('div.selectize-input');
                    var inlineSelectElement = $(template).find('div.inline-select');
                    var uiSelectMatch = $(template).find('div.ui-select-match');
                    var $select;

                    indicatorButton.append(successIndicator);
                    inputWrapper.append(indicatorButton);
                    inputWrapper.append(dropdownHint);

                    // attach id attribute to make label support possible
                    inlineSelectElement.attr('id', scope.id);

                    // attach tabindex attribute to make tab key navigation possible
                    if (scope.tabindex) {
                        inputWrapper.find('input').attr('tabindex', scope.tabindex);
                    }

                    // hide success indicator by default unless needed
                    successIndicator.css('opacity', '0');

                    showClearButton();

                    scope.$on('uiSelect:open', function(e, opened) {
                        if (opened) {
                            dropdownHint.hide();
                            successIndicator.hide();

                            // inform tabbable form about focus change
                            if (scope.tabindex) {
                                scope.$emit('inline-form.focus-changed', parseInt(scope.tabindex, 10));
                            }
                        } else {
                            dropdownHint.show();
                            successIndicator.show();
                        }
                    });

                    scope.onSelect = function(newValue) {
                        var shouldUpdate = scope.allowCommitUnchanged || (initialValue !== newValue);
                        if (shouldUpdate) {
                            ngModel.$setViewValue(newValue);

                            var commitPromise = angular.isDefined(scope.oncommit) ?
                                scope.oncommit({ $data: newValue }) : undefined;

                            if (utilService.isPromise(commitPromise)) {
                                animateSuccessIndicator(commitPromise);
                            } else {
                                animateSuccessIndicator();
                            }
                        }

                        // update initial value
                        initialValue = newValue;
                    };

                    scope.refreshData = function(query) {
                        if (scope.refresh) {
                            scope.refresh({
                                $query: query
                            });
                        }
                    };

                    scope.$on('inline-form.focus-required', function(event, index) {
                        if (scope.tabindex && parseInt(scope.tabindex, 10) === index) {
                            uiSelectMatch.click();
                        }
                    });

                    scope.$on('$selectController', function(event, selectCtrl, selectIdentifier) {
                        if (selectIdentifier === identifier) {
                            $select = selectCtrl;
                        }
                    });

                    successIndicator.click(function(e) {
                        if (scope.allowClear && successIndicator.hasClass('clear-button')) {
                            e.stopPropagation();

                            $select.clear(e);
                        }
                    });

                    function showClearButton() {
                        if ((scope.allowClear && !$select) ||
                            (scope.allowClear && $select && $select.selected)) {
                            indicatorButton.css('opacity', '1');
                            successIndicator.css('opacity', '1');
                            successIndicator
                                .removeClass('fa-check fa-remove')
                                .addClass('fa-times-thin clear-button');
                        }
                    }

                    function animateSuccessIndicator(commitPromise) {
                        container.removeClass('has-error');
                        indicatorButton.css('opacity', '1');
                        successIndicator.removeClass('clear-button');

                        if (commitPromise) {
                            successIndicator
                                .css('opacity', '1')
                                .removeClass('fa-check fa-remove fa-times-thin')
                                .addClass('fa-spin fa-spinner');

                            commitPromise.then(function() {
                                successIndicator
                                    .removeClass('fa-spin fa-spinner')
                                    .addClass('fa-check');
                                endAnimation();
                            }, function(error) {
                                successIndicator
                                    .removeClass('fa-spin fa-spinner')
                                    .addClass('fa-remove');
                                container.addClass('has-error');
                                container
                                    .find('.inline-error')
                                    .empty()
                                    .append(error);

                                endAnimation();
                            });
                        } else {
                            successIndicator
                                .css('opacity', '1')
                                .addClass('fa-check');
                            endAnimation();
                        }
                    }

                    function endAnimation() {
                        $timeout(function() {
                            successIndicator.css('opacity', '0');
                            indicatorButton.css('opacity', '0');
                        }, 500);

                        $timeout(function() {
                            showClearButton();
                        }, 600);
                    }
                });
            }
        };
    }

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }
})();

(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('inlineText', inlineText);

    inlineText.$inject = ['$timeout', 'utilService', 'keyConstants'];

    function inlineText($timeout, utilService, keyConstants) {
        return {
            replace: true,
            scope: {
                ngModel: '=',
                placeholder: '@',
                oncommit: '&',
                tabindex: '@?',
                disabled: '=?',
                inputType: '@?'
            },
            templateUrl: 'bmg/template/inline/text.html',
            require: 'ngModel',
            link: function(scope, elem, attrs, ngModel) {
                // timeout necessary, otherview $viewValue is still NaN
                $timeout(function() {
                    // save original input value for undo
                    var initialValue = ngModel.$viewValue;
                    var container = $(elem).closest('.inline-edit-container');
                    var undoBtn = $(elem).find('.revert-button');
                    var inputElem = $(elem).find('.inline-text');

                    // set input type for validation
                    if (scope.inputType) {
                        inputElem.attr('type', scope.inputType);
                    }

                    inputElem.focus(function() {
                        // update initial value on new focus
                        initialValue = ngModel.$viewValue;

                        // inform tabbable form about focus change
                        if (scope.tabindex) {
                            scope.$emit('inline-form.focus-changed', parseInt(scope.tabindex, 10));
                        }
                    });

                    inputElem.blur(function() {
                        // show visual indicator of possible change
                        $timeout(function() {
                            utilService.hideUndoBtn(undoBtn);

                            if (ngModel.$viewValue !== initialValue) {
                                // call the callback function with the new input value
                                var commitPromise = angular.isDefined(scope.oncommit) ?
                                    scope.oncommit({
                                        $data: inputElem.val()
                                    }) : undefined;

                                if (utilService.isPromise(commitPromise)) {
                                    utilService.animateSuccessIndicator(
                                        commitPromise, undoBtn, container, function(message) {
                                            scope.errorMessage = message;
                                        }
                                    );
                                } else {
                                    utilService.animateSuccessIndicator(
                                        undefined, undoBtn, container, function(message) {
                                            scope.errorMessage = message;
                                        }
                                    );
                                }
                            }
                        }, 100); // to make sure this happens after undo button click
                    });

                    inputElem.on('keyup change', function(e) {
                        if (e.keyCode === keyConstants.ENTER_KEY ||
                            e.which === keyConstants.ENTER_KEY) {
                            // ENTER pressed -> commit and leave
                            inputElem.blur();
                        } else if (e.keyCode === keyConstants.ESCAPE_KEY ||
                            e.which === keyConstants.ESCAPE_KEY) {
                            // ESCAPE pressed -> undo and leave
                            ngModel.$setViewValue(initialValue);
                            inputElem.blur();
                        }

                        var newValue = inputElem.val();

                        if (newValue != initialValue) {
                            utilService.showUndoBtn(undoBtn);
                        } else {
                            utilService.hideUndoBtn(undoBtn);
                        }
                    });

                    scope.$on('inline-form.focus-required', function(event, index) {
                        if (scope.tabindex && parseInt(scope.tabindex, 10) === index) {
                            inputElem.focus();
                        }
                    });

                    undoBtn.click(function() {
                        ngModel.$setViewValue(initialValue);
                        utilService.hideUndoBtn(undoBtn);
                        inputElem.focus();
                    });

                    // label support
                    utilService.addLabelSupport(attrs.id, function() {
                        inputElem.trigger('focus');
                    });
                });
            }
        };
    }
})();

(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('inlineTextarea', inlineTextarea);

    inlineTextarea.$inject = ['$timeout', 'utilService', 'keyConstants'];

    function inlineTextarea($timeout, utilService, keyConstants) {
        return {
            replace: true,
            scope: {
                ngModel: '=',
                placeholder: '@',
                oncommit: '&',
                tabindex: '@?',
                disabled: '=?'
            },
            templateUrl: 'bmg/template/inline/textarea.html',
            require: 'ngModel',
            link: function(scope, elem, attrs, ngModel) {
                // timeout necessary, otherview $viewValue is still NaN
                $timeout(function() {
                    // save original input value for undo
                    var initialValue = ngModel.$viewValue;
                    var container = $(elem).closest('.inline-edit-container');
                    var undoBtn = $(elem).find('.revert-button');
                    var inputElem = $(elem).find('.inline-textarea');

                    container.css('height', inputElem.css('height'));

                    scope.$on('elastic:resize', function(event, element, oldHeight, newHeight) {
                        container.css('height', newHeight + 'px');
                    });

                    inputElem.focus(function() {
                        // update initial value on new focus
                        initialValue = ngModel.$viewValue;

                        // inform tabbable form about focus change
                        if (scope.tabindex) {
                            scope.$emit('inline-form.focus-changed', parseInt(scope.tabindex, 10));
                        }
                    });

                    inputElem.blur(function() {
                        // show visual indicator of possible change
                        $timeout(function() {
                            utilService.hideUndoBtn(undoBtn);

                            if (ngModel.$viewValue !== initialValue) {
                                // call the callback function with the new input value
                                var commitPromise = angular.isDefined(scope.oncommit) ?
                                    scope.oncommit({
                                        $data: inputElem.val()
                                    }) : undefined;

                                if (utilService.isPromise(commitPromise)) {
                                    utilService.animateSuccessIndicator(
                                        commitPromise, undoBtn, container, function(message) {
                                            scope.errorMessage = message;
                                        }
                                    );
                                } else {
                                    utilService.animateSuccessIndicator(
                                        undefined, undoBtn, container, function(message) {
                                            scope.errorMessage = message;
                                        }
                                    );
                                }
                            }
                        }, 100); // to make sure this happens after undo button click
                    });

                    inputElem.on('keyup change', function(e) {
                        // don't listen for ENTER key in textarea. it should
                        // cause a line break only

                        if (e.keyCode === keyConstants.ESCAPE_KEY ||
                            e.which === keyConstants.ESCAPE_KEY) {
                            // ESCAPE pressed -> undo and leave
                            ngModel.$setViewValue(initialValue);
                            inputElem.blur();
                        }

                        var newValue = inputElem.val();

                        if (newValue != initialValue) {
                            utilService.showUndoBtn(undoBtn);
                        } else {
                            utilService.hideUndoBtn(undoBtn);
                        }
                    });

                    scope.$on('inline-form.focus-required', function(event, index) {
                        if (scope.tabindex && parseInt(scope.tabindex, 10) === index) {
                            inputElem.focus();
                        }
                    });

                    undoBtn.click(function() {
                        ngModel.$setViewValue(initialValue);
                        utilService.hideUndoBtn(undoBtn);
                        inputElem.focus();
                    });

                    // label support
                    utilService.addLabelSupport(attrs.id, function() {
                        inputElem.trigger('focus');
                    });
                });
            }
        };
    }
})();

(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('inlineTypeahead', inlineTypeahead);

    function inlineTypeahead($timeout, utilService, keyConstants) {
        return {
            replace: true,
            scope: {
                ngModel: '=',
                placeholder: '@',
                oncommit: '&',
                items: '=',
                disabled: '=?',
                tabindex: '@?'
            },
            templateUrl: 'bmg/template/inline/typeahead.html',
            require: 'ngModel',
            link: function(scope, elem, attrs, ngModel) {
                $timeout(function() {
                    // save original input value for undo
                    var initialValue = ngModel.$viewValue;
                    var undoBtn = $(elem).find('.revert-button');
                    var inputElem = $(elem).find('.inline-typeahead');
                    var container = $(elem).closest('.inline-edit-container');

                    scope.handleUndoBtnVisibility = function() {
                        $timeout(function() {
                            // timeout necessary because $viewValue would lag
                            // one character behind otherwise
                            var newValue = ngModel.$viewValue;

                            if (newValue != initialValue) {
                                utilService.showUndoBtn(undoBtn);
                            } else {
                                utilService.hideUndoBtn(undoBtn);
                            }
                        });
                    };

                    scope.focusHandler = function() {
                        // update initial value on new focus
                        initialValue = ngModel.$viewValue;

                        // inform tabbable form about focus change
                        if (scope.tabindex) {
                            scope.$emit('inline-form.focus-changed', parseInt(scope.tabindex, 10));
                        }
                    };

                    scope.blurHandler = function() {
                        // show visual indicator of possible change
                        var oldInitialValue = initialValue;

                        $timeout(function() {
                            utilService.hideUndoBtn(undoBtn);

                            var newNgModel = ngModel.$viewValue;

                            if (newNgModel !== oldInitialValue) {
                                // call the callback function with the new input value
                                var commitPromise = angular.isDefined(scope.oncommit) ?
                                    scope.oncommit({
                                        $data: newNgModel
                                    }) : undefined;

                                if (utilService.isPromise(commitPromise)) {
                                    utilService.animateSuccessIndicator(
                                        commitPromise, undoBtn, container, function(message) {
                                            scope.errorMessage = message;
                                        }
                                    );
                                } else {
                                    utilService.animateSuccessIndicator(
                                        undefined, undoBtn, container, function(message) {
                                            scope.errorMessage = message;
                                        }
                                    );
                                }
                            }
                        }, 100); // to make sure this happens after undo button click
                    };

                    scope.$on('inline-form.focus-required', function(event, index) {
                        if (scope.tabindex && parseInt(scope.tabindex, 10) === index) {
                            inputElem.focus();
                        }
                    });

                    undoBtn.click(function() {
                        ngModel.$setViewValue(initialValue);
                        utilService.hideUndoBtn(undoBtn);
                        inputElem.trigger('focus');
                    });

                    inputElem.on('keyup', function(e) {
                        if (e.keyCode === keyConstants.ENTER_KEY ||
                            e.which === keyConstants.ENTER_KEY) {
                            // ENTER pressed
                            inputElem.blur();
                        } else if (e.keyCode === keyConstants.ESCAPE_KEY ||
                            e.which === keyConstants.ESCAPE_KEY) {
                            // ESCAPE pressed
                            ngModel.$setViewValue(initialValue);
                            inputElem.blur();
                        }
                    });

                    // label support
                    utilService.addLabelSupport(attrs.id, function() {
                        inputElem.trigger('focus');
                    });
                });
            }
        };
    }
})();

(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .constant('keyConstants', {
            ENTER_KEY: 13,
            ESCAPE_KEY: 27,
            TAB_KEY: 9
        });
})();

(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('rowExpander', rowExpander);

    rowExpander.$inject = [];

    function rowExpander() {
        return {
            restrict: 'A',
            scope: {
                expandedByDefault: '=rowExpandedByDefault'
            },
            link: function(scope, elem) {
                var slave = $(elem).closest('tr').next('tr.slave-row').children('td');
                var expandedByDefault = !!scope.expandedByDefault;

                if (!expandedByDefault) {
                    slave.slideToggle();
                }

                $(elem).on('click', function(e) {
                    // otherwise the page jumps back to the top
                    e.preventDefault();

                    if (slave && slave.length) {
                        slave.slideToggle(200);
                    }
                });
            }
        };
    }
})();

(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('sidebarBadge', sidebarBadge);

    function sidebarBadge() {
        return {
            replace: true,
            template: '<span class="tab-status"></span>',
            scope: {
                status: '@?'
            },
            link: function(scope, elem, attrs) {
                var badgeId = attrs.id;
                var possibleStatii = ['warning', 'success', 'error'];

                // initialize
                convertBadgeToType(scope.status || 'error');

                for (var i = 0; i < possibleStatii.length; i++) {
                    scope.$on(
                        'sidebarBadge.' + badgeId + '.' + possibleStatii[i],
                        convertBadgeToType.bind(null, possibleStatii[i])
                    );
                }

                function convertBadgeToType(type) {
                    if (type === 'error') {
                        elem
                            .addClass('status-error')
                            .removeClass('status-warning')
                            .removeClass('status-success');

                        elem.text('!');
                    } else if (type === 'warning') {
                        elem
                            .addClass('status-warning')
                            .removeClass('status-error')
                            .removeClass('status-success');

                        elem.text('?');
                    } else if (type === 'success') {
                        elem
                            .addClass('status-success')
                            .removeClass('status-error')
                            .removeClass('status-warning');

                        elem.text('');
                        var i = angular.element('<i class="fa fa-check"></i>');
                        elem.append(i);
                    }
                }
            }
        };
    }
})();

(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .factory('userDialogs', userDialogs)
        .controller('UserDialogConfirmCtrl', UserDialogConfirmCtrl);

    userDialogs.$inject = ['$uibModal'];

    function userDialogs($uibModal) {
        return {
            askForConfirmation: askForConfirmation
        };

        function askForConfirmation(title, text, primaryActionCaption, secondaryActionCaption,
                primaryClass) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'user/dialogs/confirm.html',
                controller: 'UserDialogConfirmCtrl as ctrl',
                resolve: {
                    title: function() {
                        return title;
                    },
                    text: function() {
                        return text;
                    },
                    primaryActionCaption: function() {
                        return primaryActionCaption;
                    },
                    secondaryActionCaption: function() {
                        return secondaryActionCaption;
                    },
                    primaryClass: function() {
                        return angular.isDefined(primaryClass) ? primaryClass : 'primary';
                    }
                }
            });

            return modalInstance.result;
        }
    }

    UserDialogConfirmCtrl.$inject = ['$uibModalInstance', 'title', 'text',
        'primaryActionCaption', 'secondaryActionCaption', 'primaryClass'];

    function UserDialogConfirmCtrl($uibModalInstance, title, text,
            primaryActionCaption, secondaryActionCaption, primaryClass) {
        var vm = this;

        vm.ok = ok;
        vm.cancel = cancel;
        vm.title = title;
        vm.text = text;
        vm.primaryActionCaption = primaryActionCaption;
        vm.secondaryActionCaption = secondaryActionCaption;
        vm.primaryClass = primaryClass;

        function ok() {
            $uibModalInstance.close();
        }

        function cancel() {
            $uibModalInstance.dismiss();
        }
    }
})();

(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .factory('utilService', utilService);

    utilService.$inject = ['$timeout'];

    function utilService($timeout) {
        return {
            isPromise: isPromise,
            hideUndoBtn: hideUndoBtn,
            showUndoBtn: showUndoBtn,
            animateSuccessIndicator: animateSuccessIndicator,
            endAnimation: endAnimation,
            addLabelSupport: addLabelSupport
        };

        function isPromise(promise) {
            // if it looks like a promise and walks like a promise …
            return angular.isDefined(promise) &&
                angular.isDefined(promise.then) &&
                angular.isFunction(promise.then);
        }

        function hideUndoBtn(undoBtn) {
            undoBtn.removeClass('active');
            undoBtn.attr('disabled', 'disabled');
        }

        function showUndoBtn(undoBtn) {
            undoBtn.addClass('active');
            undoBtn.removeAttr('disabled');
        }

        function animateSuccessIndicator(commitPromise, undoBtn, container, errorCallback) {
            container.removeClass('has-error');
            showUndoBtn(undoBtn);

            if (commitPromise) {
                undoBtn
                    .find('i')
                    .removeClass('fa-undo')
                    .addClass('fa-spin fa-spinner');

                commitPromise.then(function() {
                    undoBtn
                        .find('i')
                        .removeClass('fa-spin fa-spinner')
                        .addClass('fa-check');
                    endAnimation(undoBtn);
                }, function(error) {
                    undoBtn
                        .find('i')
                        .removeClass('fa-spin fa-spinner')
                        .addClass('fa-remove');
                    container.addClass('has-error');
                    errorCallback(error);

                    endAnimation(undoBtn);
                });
            } else {
                undoBtn
                    .find('i')
                    .removeClass('fa-undo')
                    .addClass('fa-check');
                endAnimation(undoBtn);
            }
        }

        function endAnimation(undoBtn) {
            $timeout(function() {
                hideUndoBtn(undoBtn);
            }, 500);

            $timeout(function() {
                undoBtn
                    .find('i')
                    .removeClass('fa-check fa-remove')
                    .addClass('fa-undo');
            }, 600);
        }

        function addLabelSupport(id, callback) {
            if (id) {
                var labels = $('body').find('label[for=' + id + ']');

                labels.on('click', callback);
            }
        }
    }
})();
