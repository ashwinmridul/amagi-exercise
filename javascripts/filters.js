angular.module('amagi.filters', [])

.filter('formatDate', ['ConstantsService',
	function(ConstantsService) {
		return function(datestr) {
			var fullDateArray = datestr.split('/');
			var year = "20" + fullDateArray[2];
			var month = fullDateArray[0];
			var date = fullDateArray[1];
			return ConstantsService.getVal('dateMapping')[date] + " " + ConstantsService.getVal('monthMapping')[month] + " " + year;
		}
	}])
.filter("trustUrl", ['$sce', 
	function ($sce) {
        return function (recordingUrl) {
            return $sce.trustAsResourceUrl(recordingUrl);
        };
    }])

.filter('resultsFilter', ['$filter',
	function($filter) {
		return function(input, searchText) {
			var data = null;
			for(var i = 0; i < input.length; i++) {
				var longDate = $filter('formatDate')($filter('date')(input[i].aired_at, 'shortDate'));
				if(longDate.toLowerCase().indexOf(searchText.toLowerCase()) != -1 || input[i].client_name.toLowerCase().indexOf(searchText.toLowerCase()) != -1 || input[i].channel_name.toLowerCase().indexOf(searchText.toLowerCase()) != -1 || input[i].city_name.toLowerCase().indexOf(searchText.toLowerCase()) != -1 || input[i].campaign_name.toLowerCase().indexOf(searchText.toLowerCase()) != -1 || input[i].brand_name.toLowerCase().indexOf(searchText.toLowerCase()) != -1) {
					if(!data) {
						data = {};
					}
					if(!data.hasOwnProperty(longDate)) {
						data[longDate] = {values: [], clients: [], channels: [], cities: [], campaigns: [], brands: []};
					}
					input[i].local_time = $filter('date')(input[i].aired_at, 'shortTime');
					input[i].thumbnail_path = $filter('trustUrl')(input[i].thumbnail_path);
					input[i].video_path = $filter('trustUrl')(input[i].video_path);
					input[i].duration = input[i].duration.split(".").join(":");
					data[longDate].values.push(input[i]);
					if(data[longDate].clients.indexOf(input[i].client_name) == -1) {
						data[longDate].clients.push(input[i].client_name);
					}
					if(data[longDate].channels.indexOf(input[i].channel_name) == -1) {
						data[longDate].channels.push(input[i].channel_name);
					}
					if(data[longDate].cities.indexOf(input[i].city_name) == -1) {
						data[longDate].cities.push(input[i].city_name);
					}
					if(data[longDate].campaigns.indexOf(input[i].campaign_name) == -1) {
						data[longDate].campaigns.push(input[i].campaign_name);
					}
					if(data[longDate].brands.indexOf(input[i].brand_name) == -1) {
						data[longDate].brands.push(input[i].brand_name);
					}
				}
				
			}
			return data;
		}
	}]);