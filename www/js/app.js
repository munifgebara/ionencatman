var aplicativo=angular.module('encatman', ['ionic']);

aplicativo.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('list', {
    url: '/list',
    templateUrl: 'templates/list.html',
    controller: 'ListaCtrl'
  });

  $stateProvider.state('votar', {
    url: '/votar/:enqueteId',
    templateUrl: 'templates/votar.html',
    controller: 'VotaCtrl'
  });

  $urlRouterProvider.otherwise('/list');
});

aplicativo.controller('ListaCtrl', function($http, $scope) {
  $scope.enquetes=[];
  $http.get('https://munif.com.br/encatman-api/api/enquete?gumgaToken=fafiman')
  .success(function(response) {
    $scope.enquetes=response;
  });
});

aplicativo.controller('VotaCtrl', function($http, $scope, $state, $stateParams) {
  $scope.enquete={};
  id=$stateParams.enqueteId;
  $http.get('https://munif.com.br/encatman-api/api/enquete/'+id+'?gumgaToken=fafiman')
  .success(function(response) {
    $scope.enquete=response;
  });
  $scope.responde=function(enqueteId,respostaId){
    console.log(enqueteId,respostaId);
    //http://munif.com.br/encatman-api/api/resposta
  }

});



aplicativo.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
