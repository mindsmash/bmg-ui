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

    angular.module('bmg/template/datepicker/control.html', []).run(['$templateCache', function($templateCache) {
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
})(angular);
