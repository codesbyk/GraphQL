// Custom Comments Type
const Comments = {
  // author is inside of the custom Comments type
  author(parent, args, { db }, info) {
    return db.dummyUsers.filter(user => {
      return user.id === parent.authorId;
    });
  },
  // posts is inside of the custom Comments type
  posts(parent, args, { db }, info) {
    return db.dummyPosts.find(post => {
      return post.id === parent.post;
    });
  }
};

export { Comments as default };
