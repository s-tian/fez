(function() {
  angular.module('app.listing')
  .filter('searchBoxFilter', function () {
    return function (items, query) {
      var filtered = [];
      if (!items) {
        return filtered;
      }
      var letterMatch = new RegExp(query, 'i');
      var timeMatch = getTimeQuery(query);
      console.log(timeMatch);
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (letterMatch.test(item.title) || item.runtime <= timeMatch)  {
          filtered.push(item);
        }
      }
      return filtered;
    };
  });

  function getTimeQuery(query) {
    var reqtime = null;
    var split_markers = [":", "hour", "h", "hr", "and"];
    split_markers.forEach(function(element) {
      if(query.includes(element)) {
        components = query.split(element);
        reqtime = 60*parseInt(components[0]);
        if(components[1] != "") {
          reqtime += parseInt(components[1]);
        }
      }
    });
    if(reqtime === null) {
      return parseInt(query); // Best guess
    }
    return reqtime;
  }

})();