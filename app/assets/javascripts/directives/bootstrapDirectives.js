AngularAppDirectives.directive('btModal', function() {
  return function(scope, element, attrs) {
    var $content;
    $content = $(element.attr('href'));
    scope.$watch(attrs.btModal, function(v) {
      return $content.modal('hide');
    });
    return element.click(function(e) {
      e.preventDefault();
      return $content.on('shown.bs.modal', function() {
        return $content.find('form').find('.auto-focus').focus();
      }).modal();
    });
  };
});
