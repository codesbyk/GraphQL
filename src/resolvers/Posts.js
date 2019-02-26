// Custom Posts Type
const Posts = {
  // author is inside of the custom Posts type
  author(parent, args, { db }, info) {
    return db.dummyUsers.find(user => {
      // Here parent argument refers to the dummyposts array objects of each for every iteration
      return user.id === parent.userId;
    });
  },
  // comments is inside of the custom Posts type
  comments(parent, args, { db }, info) {
    return db.dummyComments.filter(comment => {
      return comment.post === parent.id;
    });
  }
};

export { Posts as default };
