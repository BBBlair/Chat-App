//addUser(id, name, room)
//removeUser(id)
//getUser(id)
//getUserList(room)

 class Users {
    constructor () {
      this.usersList = [];
    }

    addUser (id, name, room) {
      var user = {id, name, room};
      this.usersList.push(user);
      return user;
    }

    removeUser (id) {
      var removedUser = this.getUser(id);
      if(removedUser){
        this.usersList = this.usersList.filter((each) => each.id !== id);
      }
      return removedUser;
    }

    getUser (id) {
      return this.usersList.filter((each) => each.id === id)[0];
    }

    getUserList (room) {
      var usersAry = this.usersList.filter((each) => each.room === room);
      var namesAry = usersAry.map((each) => each.name);
      return namesAry;
    }
 }

module.exports = {Users};
