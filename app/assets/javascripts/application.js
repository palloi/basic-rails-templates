// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require_self
//= require_tree ./site

(function(){
  var basicRailsTemplate = function(){
    var init = function(){
      //exec binds for section on ready;
      var $onSection = $('section.on');
      
      if($onSection.data().callback != "")
        basicRailsPages.init($onSection.data().callback);

      $('a[data-page="true"]').eq($onSection.data().nav).addClass('on');

      //bind click pages
      $(document).on('click', 'a[data-page="true"]', clickPage);

      window.onpopstate = reloadPage;
      if(navigator.userAgent.toLowerCase().indexOf('msie '))
        window.onhashchange = reloadPage
    },

    reloadPage = function(event){
      location.reload();
    },

    onRequest = function(){
      return $('.loading').hasClass('on');
    },

    clickPage = function() {
      var $this = $(this);

      //return false in loading page
      if(onRequest())
        return false;

      //remove link on
      $('a[data-page="true"].on').removeClass('on');

      //add on actual link
      $this.addClass('on');

      //get page ajax
      getPage($this.prop('href'));
      return false;
    },

    getPage = function($href) {
      $('.loading').addClass('on');

      $.get($href, function(data){
        $('.loading').addClass('complete');

        $html = $(data);
        $html.removeClass('on');
        
        //add new section
        $('.content').append($html);

        //set push state of page render
        window.history.pushState($href, $html.find('h1').text(), $href);
        
        //exec binds for section on ajax;
        basicRailsPages.init($html.data().callback);

        //timeout for change pages transitions in css
        setTimeout(function(){
          $('.loading').removeClass('complete');
          $('.content section.on').addClass('off').removeClass('on');
          $html.addClass('on');

          setTimeout(function(){
            $('.loading').removeClass('on');
            
            //remove old section
            $('.content section.off').remove();
          }, 800);
        }, 1000);
      });

      return false;
    };

    return {init: init}
  }();

  $(document).ready(basicRailsTemplate.init);
})();
