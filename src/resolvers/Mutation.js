import nanoid from "nanoid";

// Mutations
const Mutation = {
  // Creating the Users
  createUser(parent, args, { db }, info) {
    const emailTaken = db.dummyUsers.some(user => {
      return user.email === args.userData.email;
    });
    if (emailTaken) {
      throw new Error("Email is already taken");
    }

    const user = {
      id: nanoid(2),
      // name: args.name,
      // email: args.email,
      // age: args.age
      ...args.userData
    };

    db.dummyUsers.push(user);
    return user;
  },

  // Updating the User
  updateUser(parent, args, { db }, info) {
    const { id, userData } = args;
    const user = db.dummyUsers.find(user => {
      return user.id === id;
    });
    if (!user) {
      throw new Error("User not found");
    }

    if (typeof userData.email === "string") {
      const emailTaken = db.dummyUsers.some(user => {
        return user.email === userData.email;
      });

      if (emailTaken) {
        throw new Error("Email is already in use.!");
      }

      user.email = userData.email;
    }

    if (typeof userData.name === "string") {
      user.name = userData.name;
    }

    if (typeof userData.age !== "undefined") {
      user.age = userData.age;
    }

    return user;
  },

  // Deleting the User
  deleteUser(parent, args, { db }, info) {
    const userIndex = db.dummyUsers.findIndex(user => {
      return user.id === args.id;
    });
    if (userIndex === -1) {
      throw new Error("User not found..!");
    }
    const deletedUsers = db.dummyUsers.splice(userIndex, 1);

    db.dummyPosts = db.dummyPosts.filter(post => {
      const match = post.userId === args.id;

      if (match) {
        db.dummyComments = db.dummyComments.filter(comment => {
          return comment.post !== post.userId;
        });
      }

      return !match;
    });
    db.dummyComments = db.dummyComments.filter(comment => {
      return comment.authorId !== args.id;
    });
    return deletedUsers[0];
  },
  // Creating the post by the existed user
  createPost(parent, args, { db, pubsub }, info) {
    const userExists = db.dummyUsers.some(user => {
      return user.id === args.postData.userId;
    });

    if (!userExists) {
      throw new Error("User not found");
    }

    const post = {
      id: nanoid(2),
      // title: args.title,
      // body: args.body,
      // published: args.published,
      // userId: args.userId
      ...args.postData
    };

    db.dummyPosts.push(post);
    if (args.postData.published) {
      pubsub.publish("post", {
        post: {
          mutation: "CREATED",
          data: post
        }
      });
    }
    return post;
  },

  // Updating the Post by the existed User
  updatePost(parent, args, { db, pubsub }, info) {
    const { id, postData } = args;

    const post = db.dummyPosts.find(post => {
      return post.id === id;
    });

    const originalPost = { ...post };

    if (!post) {
      throw new Error("Post not exists..!");
    }

    if (typeof postData.title === "string") {
      post.title = postData.title;
    }

    if (typeof postData.body === "string") {
      post.body = postData.body;
    }

    if (typeof postData.published === "boolean") {
      post.published = postData.published;

      if (originalPost.published && !post.published) {
        pubsub.publish("post", {
          post: {
            mutation: "DELETED",
            data: originalPost
          }
        });
      } else if (!originalPost.published && post.published) {
        pubsub.publish("post", {
          post: {
            mutation: "CREATED",
            data: post
          }
        });
      }
    } else if (post.published) {
      pubsub.publish("post", {
        post: {
          mutation: "UPDATED",
          data: post
        }
      });
    }

    return post;
  },

  // Deleting the Post
  deletePost(parent, args, { db, pubsub }, info) {
    const postIndex = db.dummyPosts.findIndex(post => {
      return post.id === args.id;
    });
    if (postIndex === -1) {
      throw new Error("Post not Exists..!");
    }

    const deletedPosts = db.dummyPosts.splice(postIndex, 1);

    db.dummyComments = db.dummyComments.filter(comment => {
      return comment.post !== args.id;
    });

    if (deletedPosts[0].published) {
      pubsub.publish("post", {
        post: {
          mutation: "DELETED",
          data: deletedPosts[0]
        }
      });
    }

    return deletedPosts[0];
  },
  // Creating the comment for the post by the existing user
  createComment(parent, args, { db, pubsub }, info) {
    const userExists = db.dummyUsers.some(user => {
      return user.id === args.commentData.authorId;
    });

    const postExists = db.dummyPosts.find(post => {
      return post.id === args.commentData.post && post.published;
    });

    if (!userExists || !postExists) {
      throw new Error("User/Post/Post Not Published Not Found");
    }

    const comment = {
      id: nanoid(2),
      // commentText: args.commentText,
      // authorId: args.authorId,
      // post: args.post
      ...args.commentData
    };
    db.dummyComments.push(comment);
    pubsub.publish("comment", {
      comment: {
        mutation: "CREATED",
        data: comment
      }
    });
    return comment;
  },

  // Updating the comment
  updateComment(parent, args, { db, pubsub }, info) {
    const { id, commentData } = args;

    const comment = db.dummyComments.find(comment => {
      return comment.id === id;
    });

    if (!comment) {
      throw new Error("Comment not Found...!");
    }

    if (typeof commentData.commentText === "string") {
      comment.commentText = commentData.commentText;
    }
    pubsub.publish("comment", {
      comment: {
        mutation: "UPDATED",
        data: comment
      }
    });
    return comment;
  },

  // Deleting the Comment
  deleteComment(parent, args, { db, pubsub }, info) {
    const commentIndex = db.dummyComments.findIndex(comment => {
      return comment.id === args.id;
    });

    if (commentIndex === -1) {
      throw new Error("Comment not found...!");
    }

    const deletedComments = db.dummyComments.splice(commentIndex, 1);
    pubsub.publish("comment", {
      comment: {
        mutation: "DELETED",
        data: deletedComments[0]
      }
    });
    return deletedComments[0];
  }
};

export { Mutation as default };
