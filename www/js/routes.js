angular.module('app.routes', ['ionicUIRouter'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('tabsController', {
    url: '/tabs',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('tabsController.repositories', {
    url: '/repos',
    views: {
      'tab1': {
        templateUrl: 'templates/repositories.html',
        controller: 'repositoriesCtrl'
      }
    }
  })

  .state('tabsController.account', {
    url: '/account',
    views: {
      'tab4': {
        templateUrl: 'templates/account.html',
        controller: 'accountCtrl'
      }
    }
  })

  .state('loginUsingGitHub', {
    url: '/login',
    templateUrl: 'templates/loginUsingGitHub.html',
    controller: 'loginUsingGitHubCtrl'
  })

  $urlRouterProvider.otherwise('/login')

});