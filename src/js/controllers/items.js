angular
.module('finalProject')
.controller('ItemsIndexCtrl', ItemsIndexCtrl)
.controller('ItemsShowCtrl', ItemsShowCtrl)
.controller('ItemsEditCtrl', ItemsEditCtrl)
.controller('ItemsNewCtrl', ItemsNewCtrl);



ItemsIndexCtrl.$inject = ['Item', 'filterFilter', '$scope'];
function ItemsIndexCtrl(Item, filterFilter, $scope) {
  const vm = this;
  vm.super_type = null;
  vm.sub_type = null;
  vm.q = null;

  Item.query()
  .$promise
  .then((items) => {
    vm.all = items;
    itemFilter();

  });


  function itemFilter() {
    const params = {};
    if(vm.super_type) params.super_type = vm.super_type;
    if(vm.sub_type) params.sub_type = vm.sub_type;
    if(vm.title) params.title = vm.title;
    vm.filtered = filterFilter(vm.all, params);
  }
  $scope.$watchGroup([
    () => vm.title,
    () => vm.super_type,
    () => vm.sub_type
  ], itemFilter);

  $scope.$watch(() => vm.super_type, () => {
    vm.sub_type = null;
  });
}
ItemsNewCtrl.$inject = ['Item', 'User','$state'];
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

ItemsShowCtrl.$inject = ['Item', 'User',  '$stateParams', '$state', '$auth', 'Conversation'];
function ItemsShowCtrl(Item, User, $stateParams, $state, $auth, Conversation) {
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

  function contactCreator(sender_id, receiver_id) {
    console.log('works');
    Conversation
    .save({ sender_id, receiver_id })
    .$promise
    .then(() => $state.go('conversationsIndex'));


  }
  vm.contact = contactCreator;

  function toggleWatching() {
    console.log(vm.item);
    const index = vm.item.watcher_ids.indexOf(vm.currentUser.id);
    if(index > -1){
      vm.item.watcher_ids.splice(index, 1);
      vm.item.watchers.splice(index, 1);
    } else {
      vm.item.watcher_ids.push(vm.currentUser.id);
      vm.item.watchers.push(vm.currentUser);
    }
    itemsUpdate();
  }
  vm.toggleWatching = toggleWatching;


  function isWatching() {
    return $auth.getPayload() && vm.item.$resolved && vm.item.watcher_ids.includes(vm.currentUser.id);
  }

  vm.isWatching = isWatching;

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
