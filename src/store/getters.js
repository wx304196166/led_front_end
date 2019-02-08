const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  username: state => state.user.username,
  realName: state => state.user.realName

  // avatar: state => state.user.avatar,
  // name: state => state.user.name,
  // roles: state => state.user.roles
}
export default getters
