AngularAppDirectives.directive('autoFocus', function() {
  return function(scope, element) {
    return element.focus();
  };
});

AngularAppDirectives.directive('hideFlashMessage', function() {
  return function(scope, element) {
    return element.click(function() {
      scope.flash_message = null;
      return scope.$digest();
    });
  };
});
