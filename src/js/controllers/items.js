angular
.module('finalProject')
.controller('ItemsIndexCtrl', ItemsIndexCtrl)
.controller('ItemsShowCtrl', ItemsShowCtrl)
.controller('ItemsEditCtrl', ItemsEditCtrl)
.controller('ItemsNewCtrl', ItemsNewCtrl);



ItemsIndexCtrl.$inject = ['Item'];
function ItemsIndexCtrl(Item) {
  const vm = this;

  vm.all = Item.query();
  console.log(vm.all);
  console.log('index items');
}
ItemsNewCtrl.$inject = ['Item', 'User', '$state'];
function ItemsNewCtrl(Item, User, $state) {
  const vm = this;
  vm.item = {};
  vm.users = User.query();

  function itemsCreate() {
    Item
    .save(vm.item)
    .$promise
    .then(() => $state.go('itemsIndex'));
  }

  vm.create = itemsCreate;
}

ItemsShowCtrl.$inject = ['Item', 'User',  '$stateParams', '$state', '$auth'];
function ItemsShowCtrl(Item, User, $stateParams, $state, $auth) {
  const vm = this;
  if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });

  vm.item = Item.get($stateParams);

  function itemsDelete() {
    vm.item
    .$remove()
    .then(() => $state.go('itemsIndex'));
  }

  vm.delete = itemsDelete;

  function itemsUpdate() {
    Item
    .update({ id: vm.item.id }, vm.item);
  }
  vm.update = itemsUpdate;

}
ItemsEditCtrl.$inject = ['Item', 'User', '$stateParams', '$state'];
function ItemsEditCtrl(Item, User, $stateParams, $state) {
  const vm = this;

  Item.get($stateParams).$promise.then((item) => {
    vm.item = item;
    vm.item.date = new Date(item.date);
  });

  vm.users = User.query();

  function itemsUpdate() {
    Item
    .update({ id: vm.item.id }, vm.item)
    .$promise
    .then(() => $state.go('itemsShow', { id: vm.item.id }));
  }

  vm.update = itemsUpdate;
}
