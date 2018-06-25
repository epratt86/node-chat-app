const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
  let users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Eric',
      room: 'Node Course'
    }, {
      id: '2',
      name: 'Mike',
      room: 'Cooking Course'
    }, {
      id: '3',
      name: 'Sally',
      room: 'Node Course'
    }];
  });

  it('should add new user', () => {
    let users = new Users();
    let user = {
      id: '123',
      name: 'Eric',
      room: 'The Simpsons Fans'
    };
    let testUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    let userId = '1';
    let user = users.removeUser(userId);
    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user', () => {
    let userId = '00';
    let user = users.removeUser(userId);
    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should find a user', () => {
    let userId = '2';
    let user = users.getUser(userId);
    expect(user.id).toBe(userId);
  });

  it('should not find a user', () => {
    let userId = '99';
    let user = users.getUser(userId);
    expect(user).toNotExist();
  });

  it('should return names for node course', () => {
    let userList = users.getUserList('Node Course');

    expect(userList).toEqual(['Eric', 'Sally']);
  });
});
