// Custom User Type
// Getting Individual user type data in posts for fetching the author userId (----this is outside of the Query global property----) Same for all the posts.js and comments.js
const User = {
  // posts is inside of the custom User type
  posts(parent, args, { db }, info) {
    return db.dummyPosts.filter(post => {
      return post.userId === parent.id;
    });
  },
  // comments is inside of the custom User type
  comments(parent, args, { db }, info) {
    return db.dummyComments.filter(comment => {
      return comment.authorId === parent.id;
    });
  }
};

export { User as default };
