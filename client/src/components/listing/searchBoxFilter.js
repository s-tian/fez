(function() {
  angular.module('app.listing')
  .filter('searchBoxFilter', function () {
    return function (items, query) {
      var filtered = [];
      if (!items) {
        return filtered;
      }
      var letterMatch = new RegExp(query, 'i');
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (letterMatch.test(item.title)) {
          filtered.push(item);
        }
      }
      return filtered;
    };
  });

})();