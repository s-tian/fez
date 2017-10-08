(function () {

    'use strict';

    angular.module('app.front')
    .directive('tmplFront', directiveFunction)
    .controller('FrontController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/front/front.html',
            scope: {
            },
            controller: 'FrontController',
            controllerAs: 'vm'
        };

        return directive;
    }


    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['logger', 'dataService', '$state', '$scope'];

    /* @ngInject */
    function ControllerFunction(logger, dataService, $state, $scope) {

        var vm = this;

        /**
         * Helper function from Stack Overflow question #6274339.
         * Utility for mixing up the popular movies array.
         * Shuffles array in place.
         * @param {Array} a items The array containing the items.
         */
         function shuffle(a) {
            var j, x, i;
            for (i = a.length; i; i--) {
                j = Math.floor(Math.random() * i);
                x = a[i - 1];
                a[i - 1] = a[j];
                a[j] = x;
            }
        }

        

        // Animation and style source from http://tobiasahlin.com/moving-letters/#11
        // Wrap every letter in a span
        

        vm.animate_movie_title = function(index) {
            console.log(vm.popular_movie_list);
            $('.ml11 .letters').text(vm.popular_movie_list[index]);
            $('.ml11 .letters').each(function(){
                $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
                $(this).append("<span class='letter'>?</span>")
            });
            anime.timeline({complete: function(anim) {
                if($state.includes("front")) {
                    vm.animate_movie_title((index+1) % vm.popular_movie_list.length)
                } else {
                    return; //If no longer viewing the front page, stop the animation.s
                }
            }})
            .add({
                targets: '.ml11 .line',
                scaleY: [0,1],
                opacity: [0.5,1],
                easing: "easeOutExpo",
                duration: 1000
            })
            .add({
                targets: '.ml11 .line',
                translateX: [0,$(".ml11 .letters").width()],
                easing: "easeOutExpo",
                duration: 700,
                delay: 100
            }).add({
                targets: '.ml11 .letter',
                opacity: [0,1],
                easing: "easeOutExpo",
                duration: 600,
                offset: '-=775',
                delay: function(el, i) {
                  return 34 * (i+1)
              }
            }).add({
                targets: '.ml11',
                opacity: 0,
                duration: 1000,
                easing: "easeOutExpo",
                delay: 1000
            }).add({
                targets: '.ml11',
                opacity: 1,
                duration: 0
          });   // At the end, add a 0 duration animation to reset the opacity
        }

        // First, get a list of popular movies from the API
        vm.popular_movie_list = null;
        if(!dataService.state.animationStarted) {
            dataService.getPopular()
            .success(function(data) {
                vm.popular_movie_list = JSON.parse(data);
                shuffle(vm.popular_movie_list);
                dataService.state.animationStarted = true; // Ensure the animation is only started once.
                vm.animate_movie_title(0);  // Start the recursive calls going 
            })
            .error(function (e) {
                console.log(e);
                $('.ml11 .letters').text("good movies lately?");  // Default in failure case
            }); 
        }
        
    }
     


})();
