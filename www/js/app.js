var aplicativo=angular.module('starter', ['ionic']);

console.log("Aqui1");
aplicativo.controller('ListaCtrl', function($http, $scope) {

  $scope.enquetes=[{"nome":"valor"}];
  $http.get('https://munif.com.br/encatman-api/api/enquete?gumgaToken=fafiman')
  .success(function(response) {
    $scope.enquetes=response;
  });




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
