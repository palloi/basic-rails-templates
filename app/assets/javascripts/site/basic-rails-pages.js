var basicRailsPages = function(){
  var init = function($eventPage) {
    //exec event page
    eval($eventPage);
  },

  index = function() {
    console.log('index root page');
  },

  about = function() {
    console.log('about page');
  },

  contact = function() {
    console.log('contact page');
  };

  return {init: init}
}();
