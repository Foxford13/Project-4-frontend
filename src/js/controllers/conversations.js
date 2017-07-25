angular
.module('finalProject')
.controller('ConversationsCtrl', ConversationsCtrl);



ConversationsCtrl.$inject = ['Conversation', 'Message'];
function ConversationsCtrl(Conversation, Message) {
  const vm = this;
  vm.message = {};
  Conversation
    .query()
    .$promise
    .then((conversations) => {
      vm.all = conversations;
      vm.message.conversation_id = vm.all[0].id;
    });

  //
  // console.log(vm.all);
  // console.log(vm.all[0]);


  function sendMessage() {
    // vm.message.conversation_id = vm.conversation.id;
    
    Message
    .save({ id: vm.message.conversation_id }, vm.message)
    .$promise
    .then((message) => {
      console.log(message);
      const newMessage = message.messages.pop();
      vm.all[0].messages.push(newMessage);
      vm.message = {};

    });

  }
  vm.sendMessage = sendMessage;
}
