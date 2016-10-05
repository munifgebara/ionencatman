
var aplicativo=angular.module('encatman', ['ionic']);

aplicativo.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  $httpProvider.defaults.headers.common = {
          'gumgaToken': 'fafiman'
        };

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

  $stateProvider.state('criar', {
    url: '/criar',
    templateUrl: 'templates/criar.html',
    controller: 'CriarCtrl'

  });

  $urlRouterProvider.otherwise('/list');
});

aplicativo.controller('ListaCtrl', function($http, $scope, $state) {
  $scope.vaiParaCriar = function() {
     $state.go('criar');
  };

  $scope.enquetes=[];
  $http.get('https://munif.com.br/encatman-api/api/enquete?gumgaToken=fafiman')
  .success(function(response) {
    $scope.enquetes=response;
  });

});

aplicativo.controller('CriarCtrl', function ($scope, $state) {
  $scope.status="Não Criou";
  $scope.Criou=false;
  $scope.titulo;
  $scope.texto;
  $scope.name="";
  $scope.items = [];
  $scope.addItem = function (itemName) {
    $scope.items.push({
      name: itemName
    });
    $scope.itemName = "";
  };
  $scope.removeItem = function (index) {
    $scope.items.splice(index, 1);
 };


});


aplicativo.controller('VotaCtrl', function($http, $scope, $state, $stateParams) {
  $scope.enquete={};
  $scope.status="Não votou";
  $scope.votou=false;
  id=$stateParams.enqueteId;
  $http.get('https://munif.com.br/encatman-api/api/enquete/')
  .success(function(response) {
    $scope.enquete=response;
  });

  $scope.responde=function(resposta){
    data={opcao:resposta};
    $http.post('https://munif.com.br/encatman-api/api/resposta',data)
    .then(function(response) {
      $scope.status="Votou "+resposta.texto;
      $scope.votou=true;
    },
    function(response) {
      $scope.status="Problemas ao votar";
    });
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
