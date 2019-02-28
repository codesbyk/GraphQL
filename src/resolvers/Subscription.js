const Subscription = {
  comment: {
    subscribe(parent, args, { pubsub, db }, info) {
      const { postId } = args;
      const post = db.dummyPosts.find(post => {
        return post.id === postId && post.published;
      });

      if (!post) {
        throw new Error("Post not found..!");
      }
      return pubsub.asyncIterator("comment");
    }
  },
  post: {
    subscribe(parent, args, { pubsub, db }, info) {
      return pubsub.asyncIterator("post");
    }
  }
};

export { Subscription as default };
