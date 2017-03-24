// Initiating our Auth0Lock
var lock = new Auth0Lock(
  'ZBgZu1h3ONgtddqB2ZiaReRuCb9Dp180',
  'nudj.eu.auth0.com', {
    auth: {
      redirectUrl: location.origin + '/callback',
      responseType: 'code',
      params: {
        scope: 'openid email' // Learn about scopes: https://auth0.com/docs/scopes
      }
    }
  }
)

// Listening for the authenticated event
lock.on("authenticated", function(authResult) {
  // Use the token in authResult to getUserInfo() and save it to localStorage
  lock.getUserInfo(authResult.accessToken, function(error, profile) {
    if (error) {
      console.error(error)
      return
    }

    localStorage.setItem('accessToken', authResult.accessToken)
    localStorage.setItem('profile', JSON.stringify(profile))
  })
})
let loginButton = document.getElementById('login')
if (loginButton) {
  loginButton.addEventListener('click', function () {
    lock.show()
  })
}
// document.getElementById('logout').addEventListener('click', function () {
//   // logout
// })
