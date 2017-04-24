angular.module('amagi.directives', [])
// Custom Directive to capture the return or enter key press on the UI from the user
.directive('amEnter', function() {//track return keypress
	return function(scope, element, attrs) {
		element.bind("keydown keypress", function(event) {
			if (event.keyCode === 13) {
				scope.$apply(function() {
					scope.$eval(attrs.amEnter);
				});

				event.preventDefault();
			}
		});
	};
});