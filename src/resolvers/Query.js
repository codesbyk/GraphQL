// Query
const Query = {
  // Fetching all the comments
  comments(parent, args, { db }, info) {
    return db.dummyComments;
  },

  // All User Info Data
  // (parent, args, ctx, info) ===> ctx argument in function, returns object that can be destructure like this ctx.someObjectName as {someObjectName}
  users(parent, args, { db }, info) {
    if (!args.searchQuery) {
      return db.dummyUsers;
    }
    return db.dummyUsers.filter(user => {
      return user.name.toLowerCase().includes(args.searchQuery.toLowerCase());
    });
  },

  // post() {
  //   return {
  //     id: Math.floor(Math.random() * 9999),
  //     title: "How GraphQL works under the hood",
  //     body: "How to fit into the frameworks with the GraphQL Technology",
  //     published: true
  //   };
  // },

  // All Posts Info Data
  posts(parent, args, { db }, info) {
    if (!args.searchQuery) {
      return db.dummyPosts;
    }
    return db.dummyPosts.filter(post => {
      const isTitleMatch = post.title
        .toLowerCase()
        .includes(args.searchQuery.toLowerCase());
      const isPostBodyMatch = post.body
        .toLowerCase()
        .includes(args.searchQuery.toLowerCase());
      return isTitleMatch || isPostBodyMatch;
    });
  }
};

export { Query as default };
