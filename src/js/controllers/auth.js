angular
.module('finalProject')
.controller('AuthCtrl', AuthCtrl);

AuthCtrl.$inject = ['$auth', '$state'];
function AuthCtrl($auth, $state) {
  const vm = this;

  function register() {
    $auth.signup(vm.user)
    .then(() => $state.go('login'));
  }

  vm.register = register;

  function login() {
    $auth.login(vm.credentials)
    .then(() => $state.go('itemsIndex'));


  }
  function authenticate(provider) {
    console.log('works');
    $auth.authenticate(provider)
    .then(() => $state.go('itemsIndex'));
  }


  vm.authenticate = authenticate;
  vm.login = login;
}
