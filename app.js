// Declare app level module which depends on views, and components
(function () {
    var app = angular.module('myApp', ['ngRoute','ui.router']);

  app.config(function($stateProvider, $urlRouterProvider,$provide) {

    $urlRouterProvider.otherwise('/Home');

    $stateProvider
        .state('home', {
          url:'/Home',
          templateUrl: 'partial-home.html',
          controller: 'HomeController'
        })

        // nested list with custom controller
        .state('home.list', {
            url: '/list',
            templateUrl: 'partial-home-list.html',
            controller: function($scope) {
                $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
            }
        })

        .state('home.paragraph', {
            url: '/paragraph',
            template: 'I could sure use a drink right now.'
        })

        .state('about', {
            url: '/about',
            views: {

                // the main template will be placed here (relatively named)
                '': { templateUrl: 'partial-about.html' },

                // the child views will be defined here (absolutely named)
                'columnOne@about': { template: 'Look I am a column!' },

                // for column two, we'll define a separate controller
                'columnTwo@about': {
                    templateUrl: 'table-data.html',
                    controller: 'scotchController'
                }
            }
        })

        .state('resume', {
            url:'/Resume',
            templateUrl: 'resume.html',
            controller: 'ResumeController'
        })

        .state('projects', {
            url:'/Projects',
            templateUrl: 'partial-home.html',
            controller: 'HomeController'
        });

      $provide.decorator('$uiViewScroll', function ($delegate) {
      return function (uiViewElement) {
        // var top = uiViewElement.getBoundingClientRect().top;
        // window.scrollTo(0, (top - 30));
        // Or some other custom behaviour...
      };
    });
  });

    //Set up controller for the HTML to use
    app.controller('HomeController', ['$scope',function($scope) {
        $scope.hi = "swagggggg";

    }]);

    app.controller('AboutController', ['$scope',function($scope) {
        $scope.five = "5";
    }]);

    app.controller('ResumeController', ['$scope', function($scope) {
        $scope.six = "8";
    }]);

    app.controller('scotchController', function($scope) {

        $scope.message = 'test';

        $scope.scotches = [
            {
                name: 'Macallan 12',
                price: 50
            },
            {
                name: 'Chivas Regal Royal Salute',
                price: 10000
            },
            {
                name: 'Glenfiddich 1937',
                price: 20000
            }
        ];

    });

    app.controller('gradientController', function($scope) {

         $scope.colors = new Array(
            [62,35,255],
            [60,255,60],
            [255,35,98],
            [45,175,230],
            [255,0,255],
            [255,128,0]);

        var step = 0;
//color table indices for:
// current color left
// next color left
// current color right
// next color right
        var colorIndices = [0,1,2,3];

//transition speed
        var gradientSpeed = 0.002;

        function updateGradient()
        {

            if ( $===undefined ) return;

            var c0_0 = colors[colorIndices[0]];
            var c0_1 = colors[colorIndices[1]];
            var c1_0 = colors[colorIndices[2]];
            var c1_1 = colors[colorIndices[3]];

            var istep = 1 - step;
            var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
            var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
            var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
            var color1 = "rgb("+r1+","+g1+","+b1+")";

            var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
            var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
            var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
            var color2 = "rgb("+r2+","+g2+","+b2+")";

            $('#gradient').css({
                background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
                background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});

            step += gradientSpeed;
            if ( step >= 1 )
            {
                step %= 1;
                colorIndices[0] = colorIndices[1];
                colorIndices[2] = colorIndices[3];

                //pick two new target color indices
                //do not pick the same as the current one
                colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
                colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;

            }
        }

        setInterval(updateGradient,10);

    });

})();
