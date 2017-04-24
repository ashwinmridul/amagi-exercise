angular.module('amagi.controllers', []).controller('AmagiCtrl', ['$filter', '$localStorage', 'AmagiService', 'ModalService', 
	function($filter, $localStorage, AmagiService, ModalService) {
		var vm = this;

		// Stores the list of spots fetched from API
		vm.spotsList = [];
		vm.spotsDistributed = {};
		vm.spotsLoading = false;
		vm.searchText = "";		
		vm.selectedSearchItem = null;
		vm.searchHistory = $localStorage.searchHistory || [];

		vm.getSpots = getSpots;
		vm.populateSpotsData = populateSpotsData;
		vm.saveSearch = saveSearch;
		vm.getSavedSearch = getSavedSearch;
		vm.openVideo = openVideo;
		vm.autoSuggest = autoSuggest;

		vm.getSpots();

		function getSpots() {
			vm.spotsLoading = true;
			AmagiService.getSpotsList().then(getSpotsSuccess, getSpotsError);
			if(!!arguments.length) {
				vm.searchText = angular.element(document.getElementById('searchText')).val();
			}
		}

		function getSpotsSuccess(response) {
			vm.spotsList = $filter('orderBy')(response.data, 'aired_at', true) || [];
			populateSpotsData();
		}

		function getSpotsError(response) {
			vm.spotsLoading = false;
		}

		function populateSpotsData() {
			vm.spotsLoading = false;
			vm.spotsDistributed = $filter('resultsFilter')(vm.spotsList, vm.searchText);
		}

		function saveSearch() {
			if(!Array.isArray($localStorage.searchHistory)) {
				$localStorage.searchHistory = [];
			}
			if(vm.searchText.length && $localStorage.searchHistory.indexOf(vm.searchText) == -1) {
				$localStorage.searchHistory.push(vm.searchText);
			}
			getSavedSearch();
		}

		function getSavedSearch() {
			vm.searchHistory = $localStorage.searchHistory;
		}

		function openVideo(spot) {
			AmagiService.setDisplaySpot(spot);
			vm.modal = ModalService.openModal('custom/videoModal', vm);
		}

		function autoSuggest() {
			$( "#searchText" ).autocomplete({
				source: vm.searchHistory
			});
		}
	}]);

angular.module('amagi.controllers').controller('VideoCtrl', ['AmagiService', 
	function(AmagiService) {
		var vm = this;

		vm.displaySpot = AmagiService.getDisplaySpot();
	}]);