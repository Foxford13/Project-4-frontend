angular
.module('finalProject')
.controller('ItemsIndexCtrl', ItemsIndexCtrl)
.controller('ItemsShowCtrl', ItemsShowCtrl)
.controller('ItemsEditCtrl', ItemsEditCtrl)
.controller('ItemsNewCtrl', ItemsNewCtrl);



ItemsIndexCtrl.$inject = ['Item', 'filterFilter', '$scope'];
function ItemsIndexCtrl(Item, filterFilter, $scope) {
  const vm = this;


  Item.query()
  .$promise
  .then((items) => {
    vm.all = items;
    itemFilter();

  });


  function itemFilter() {

    const params = { title: vm.q };



    vm.filtered = filterFilter(vm.all, params);


  }
  $scope.$watch(() => vm.q, itemFilter);



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
