angular
.module('finalProject')
.config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider

  .state('itemsIndex', {
    url: '/',
    templateUrl: 'js/views/items/index.html',
    controller: 'ItemsIndexCtrl as itemsIndex'
  })
  .state('itemsNew', {
    url: '/items/new',
    templateUrl: 'js/views/items/new.html',
    controller: 'ItemsNewCtrl as itemsNew'
  })
  .state('itemsShow', {
    url: '/items/:id',
    templateUrl: 'js/views/items/show.html',
    controller: 'ItemsShowCtrl as itemsShow'
  })
  .state('itemsEdit', {
    url: '/items/:id/edit',
    templateUrl: 'js/views/items/edit.html',
    controller: 'ItemsEditCtrl as itemsEdit'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'js/views/auth/login.html',
    controller: 'AuthCtrl as auth'
  })
  .state('register', {
    url: '/register',
    templateUrl: 'js/views/auth/register.html',
    controller: 'AuthCtrl as auth'
  })
  .state('profile', {
    url: '/profile/:id',
    templateUrl: 'js/views/auth/profile.html',
    controller: 'ProfileCtrl as profile'
  })
  .state('profileEdit', {
    url: '/profile/:id/edit',
    templateUrl: 'js/views/auth/editProfile.html',
    controller: 'EditProfileCtrl as profileEdit'
  })
  .state('conversationsIndex', {
    url: '/conversations',
    templateUrl: 'js/views/conversations/index.html',
    controller: 'ConversationsIndexCtrl as conversationsIndex'
  })
  .state('conversationsShow', {
    url: '/conversations/:id',
    templateUrl: 'js/views/conversations/show.html',
    controller: 'ConversationsShowCtrl as conversationsShow'
  });
  $urlRouterProvider.otherwise('/');
}
