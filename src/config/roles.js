const roles = ['user', 'admin'];

const roleRights = new Map();
roleRights.set(roles[0], ['getPosts', 'managePosts', 'getStores', 'manageStores']);
roleRights.set(roles[1], ['getUsers', 'manageUsers', 'getPosts', 'managePosts', 'getStores', 'manageStores']);

module.exports = {
  roles,
  roleRights,
};
