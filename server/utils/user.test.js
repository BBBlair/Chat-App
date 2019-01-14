const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
 var users;

  beforeEach(() => {
    users = new Users();
    users.usersList = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    }, {
      id: '2',
      name: 'Jenny',
      room: 'React Course'
    }, {
      id: '3',
      name: 'Blair',
      room: 'Node Course'
    }]
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Blair',
      room: 'Node Course'
    };
    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.usersList).toEqual([user]);
  });

  it('should return names for Node Course', () => {
    var userInRoom = users.getUserList('Node Course');
    expect(userInRoom).toEqual(['Mike', 'Blair']);
  });

  it('should remove a user', () => {
      var removedUser = users.removeUser('2');
      expect(removedUser.id).toBe('2');
      expect(users.usersList).toHaveLength(2);
  });

  it('should not remove a user', () => {
    var removedUser = users.removeUser('4');
    expect(removedUser).toBeFalsy();
    expect(users.usersList).toHaveLength(3);
  });

  it('should find user', () => {
    var targetUser = users.getUser('3');
    expect(targetUser.id).toBe('3');
  });

  it('should not find user', () => {
    var targetUser = users.getUser('0');
    expect(targetUser).toBeFalsy();
  });

  it('should return names for React Course', () => {
    var userInRoom = users.getUserList('React Course');
    expect(userInRoom).toEqual(['Jenny']);
  });
})
