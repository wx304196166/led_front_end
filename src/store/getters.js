const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  map: state => state.app.map,
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  nickname: state => state.user.nickname

  // avatar: state => state.user.avatar,
  // name: state => state.user.name,
  // roles: state => state.user.roles
};
export default getters;
