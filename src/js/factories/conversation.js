angular
  .module('finalProject')
  .factory('Conversation', Conversation)
  .factory('Message', Message);

Conversation.$inject = ['$resource', 'API_URL'];
function Conversation($resource, API_URL) {
  return new $resource(`${API_URL}/conversations/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}

Message.$inject = ['$resource', 'API_URL'];
function Message($resource, API_URL) {
  return new $resource(`${API_URL}/conversations/:id/messages`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
