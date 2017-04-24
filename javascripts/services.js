angular.module('amagi.services', []).factory('AmagiService', ['$http', 
	function($http) {
		var displaySpot = {};
		return {
			getSpotsList : function() {
				return $http.get('https://amagi.herokuapp.com/ui-test/api/v1/spots');
			},
			getDisplaySpot : function() {
				return this.displaySpot;
			},
			setDisplaySpot : function(spot) {
				this.displaySpot = spot;
			}
		};
	}]);
angular.module('amagi.services').factory('ModalService', ['$uibModal',
	function($uibModal) {
		return {
			openModal : function(url, scope) {
				return $uibModal.open({
					templateUrl : url,
					controller: 'AmagiCtrl',
					controllerAs: 'amagictrl',
					size: 'lg'
				});
			}
		};
	}]);