angular
.module('finalProject')
.controller('ProfileCtrl', ProfileCtrl)
.controller('EditProfileCtrl', EditProfileCtrl);

ProfileCtrl.$inject = ['$auth', 'User', '$state', 'Item'];
function ProfileCtrl($auth, User, $state, Item) {
  const vm = this;

  vm.user = User.get($state.params);

  function logout() {
    $auth.logout();
    $state.go('login');
  }

  vm.logout = logout;

  // function itemsDelete(item) {
  //   Item
  //   .$remove({ userId: vm.user.id, id: item.id})
  //   .then(() => $state.go('itemsIndex'));
  // }

  function deleteItem(item) {
    Item
    .delete({ userId: vm.user.id, id: item.id })
    .$promise
    .then(() => {
      const index = vm.user.items.indexOf(item);
      vm.user.items.splice(index, 1);
    });
  }
  vm.delete = deleteItem;
}


EditProfileCtrl.$inject = ['$auth', 'User','$state'];
function EditProfileCtrl($auth, User, $state) {
  const vm = this;

  vm.user = User.get($state.params);
  vm.update = userUpdate;

  function userUpdate() {
    User
    .update($state.params, vm.user)
    .$promise
    .then(() => {
      $state.go('profile', $state.params);
    });
  }

}
