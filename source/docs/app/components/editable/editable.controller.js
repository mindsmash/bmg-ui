(function(angular) {
	'use strict';

	angular.module('bmg-ui.docs')
		.controller('EditableController', EditableController);

	EditableController.$inject = ['$filter', '$rootScope', '$q', '$timeout'];

	function EditableController($filter, $rootScope, $q, $timeout) {
		var self = this;

		self.site = {
			value: 2,
			text: 'BMG Rights Management GE'
		};

		self.badgeStatus = 'Success';

		self.data = {
			numberField: {},
			sites: [
				{
					value: 1,
					text: 'BMG Rights Management UK',
					location: 'London'
				}, {
					value: 2,
					text: 'BMG Rights Management GE',
					location: 'Berlin'
				}, {
					value: 3,
					text: 'BMG Rights Management US',
					location: 'Los Angeles'
				}
			],
			badgeStatii: [
				'Success', 'Warning', 'Error'
			],
			barcode: '5016027101519',
			productCode: 'BFFP151',
			altProductCode: '',
			artistName: 'The Merry Pranksters',
			title: 'Peggy the Pistol/Hogs Are a Coming',
			date: new Date(1999, 4, 15),
			stateOfBirth: 'Arkansas',
			releaseDateTentative: true,
			notesComments: 'This is an auto-resizing textarea that will grow and shrink as you type text into it. What an amazing advance in technology.'
		};

		self.errors = {
			barcode: 'Number must be prime.'
		};

		self.loadAsync = function(query) {
			// reload list items based on query
		};

		self.showSites = function() {
			var selected = $filter('filter')(self.data.sites, {value: self.site.value});
			return (this.site.value && selected.length) ? selected[0].text : 'Not set';
		};

		self.opened = {};

		self.open = function($event, elementOpened) {
			$event.preventDefault();
			$event.stopPropagation();

			self.opened[elementOpened] = !self.opened[elementOpened];
		};

		self.updateDate = function(newDate) {
			self.data.date = newDate;
		};

		self.datepickerOptions = {
			maxDate: new Date(),
			minMode: 'day',
			datepickerMode: 'month',
			showWeeks: false,
			startingDay: 1
		};

		self.datepickerModelOptions = {
			//timezone: '+0000'
		};

		self.updateBadge = function(newStatus) {
			var eventName = 'sidebarBadge.generalStatus.';

			$rootScope.$broadcast(eventName + newStatus.toLowerCase());
		};

		self.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

		self.saveValue = function(value) {
			// Do something with the value
		};

		self.promiseValue = function(value) {
			var deferred = $q.defer();

			$timeout(function() {
				if (Math.random() > 0.5) {
					deferred.reject('A disruption in the force was detected.');
				} else {
					deferred.resolve();
				}
			}, 1000);
			return deferred.promise;
		};
	}

})(angular);
