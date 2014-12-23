AngularAppDirectives.directive('popCard', function() {
  return function(scope, element) {
    return element.on('mouseenter', function() {
      return element.animate({
        marginTop: '-=20'
      }, 100);
    }).on('mouseleave', function() {
      return element.animate({
        marginTop: '+=20'
      }, 100);
    });
  };
});
