

function checkAuth(user) {
  if (user.name === 'admin' && user.pass === '123456') {
    return true;
  }
  return false;
}

module.exports = {
  checkAuth: checkAuth
}
