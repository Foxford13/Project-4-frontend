angular
.module('finalProject')
.config(Auth);

Auth.$inject = ['$authProvider', 'API_URL'];
function Auth($authProvider, API_URL) {
  $authProvider.signupUrl = `${API_URL}/register`;
  $authProvider.loginUrl = `${API_URL}/login`;


  $authProvider.github({
    clientId: '396e3effbb692a6d1151',
    url: `${API_URL}/oauth/github`
  });

  $authProvider.facebook({
    clientId: '845758695579882',
    url: `${API_URL}/oauth/facebook`
  });
}
