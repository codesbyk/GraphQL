import { GraphQLServer } from "graphql-yoga";
import uuidv4 from "uuid/v4";

// We have the following Scalar Types below
// -------> String, Boolean, Int, Float, ID

// Demo User Data
const dummyUsers = [
  {
    id: 1,
    name: "Leanne Graham",
    email: "Sincere@april.biz",
    age: 25
  },
  {
    id: 2,
    name: "Ervin Howell",
    age: 24,
    email: "Shanna@melissa.tv"
  },
  {
    id: 3,
    name: "Clementine Bauch",
    age: 31,
    email: "Nathan@yesenia.net"
  },
  {
    id: 4,
    name: "Patricia Lebsack",
    age: 28,
    email: "Julianne.OConner@kory.org"
  },
  {
    id: 5,
    name: "Chelsey Dietrich",
    age: 29,
    email: "Lucio_Hettinger@annie.ca"
  },
  {
    id: 6,
    name: "Mrs. Dennis Schulist",
    age: 35,
    email: "Karley_Dach@jasper.info"
  },
  {
    id: 7,
    name: "Kurtis Weissnat",
    age: 45,
    email: "Telly.Hoeger@billy.biz"
  },
  {
    id: 8,
    name: "Nicholas Runolfsdottir V",
    age: 38,
    email: "Sherwood@rosamond.me"
  },
  {
    id: 9,
    name: "Glenna Reichert",
    age: 51,
    email: "Chaim_McDermott@dana.io"
  },
  {
    id: 10,
    name: "Clementina DuBuque",
    age: 21,
    email: "Rey.Padberg@karina.biz"
  }
];

const dummyPosts = [
  {
    userId: 1,
    id: 1,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body:
      "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
    published: true
  },
  {
    userId: 1,
    id: 2,
    title: "qui est esse",
    body:
      "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
    published: true
  },
  {
    userId: 1,
    id: 3,
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    body:
      "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
    published: true
  },
  {
    userId: 2,
    id: 4,
    title: "et ea vero quia laudantium autem",
    body:
      "delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus\naccusamus in eum beatae sit\nvel qui neque voluptates ut commodi qui incidunt\nut animi commodi",
    published: true
  },
  {
    userId: 2,
    id: 28,
    title: "in quibusdam tempore odit est dolorem",
    body:
      "itaque id aut magnam\npraesentium quia et ea odit et ea voluptas et\nsapiente quia nihil amet occaecati quia id voluptatem\nincidunt ea est distinctio odio",
    published: true
  },
  {
    userId: 2,
    id: 5,
    title: "doloribus ad provident suscipit at",
    body:
      "qui consequuntur ducimus possimus quisquam amet similique\nsuscipit porro ipsam amet\neos veritatis officiis exercitationem vel fugit aut necessitatibus totam\nomnis rerum consequatur expedita quidem cumque explicabo",
    published: true
  },
  {
    userId: 3,
    id: 6,
    title: "iusto eius quod necessitatibus culpa ea",
    body:
      "odit magnam ut saepe sed non qui\ntempora atque nihil\naccusamus illum doloribus illo dolor\neligendi repudiandae odit magni similique sed cum maiores",
    published: true
  },
  {
    userId: 3,
    id: 7,
    title: "a quo magni similique perferendis",
    body:
      "alias dolor cumque\nimpedit blanditiis non eveniet odio maxime\nblanditiis amet eius quis tempora quia autem rem\na provident perspiciatis quia",
    published: true
  },
  {
    userId: 4,
    id: 8,
    title: "explicabo et eos deleniti nostrum ab id repellendus",
    body:
      "animi esse sit aut sit nesciunt assumenda eum voluptas\nquia voluptatibus provident quia necessitatibus ea\nrerum repudiandae quia voluptatem delectus fugit aut id quia\nratione optio eos iusto veniam iure",
    published: true
  },
  {
    userId: 4,
    id: 9,
    title: "eos dolorem iste accusantium est eaque quam",
    body:
      "corporis rerum ducimus vel eum accusantium\nmaxime aspernatur a porro possimus iste omnis\nest in deleniti asperiores fuga aut\nvoluptas sapiente vel dolore minus voluptatem incidunt ex",
    published: false
  },
  {
    userId: 4,
    id: 10,
    title: "enim quo cumque",
    body:
      "ut voluptatum aliquid illo tenetur nemo sequi quo facilis\nipsum rem optio mollitia quas\nvoluptatem eum voluptas qui\nunde omnis voluptatem iure quasi maxime voluptas nam",
    published: true
  },
  {
    userId: 5,
    id: 11,
    title: "non est facere",
    body:
      "molestias id nostrum\nexcepturi molestiae dolore omnis repellendus quaerat saepe\nconsectetur iste quaerat tenetur asperiores accusamus ex ut\nnam quidem est ducimus sunt debitis saepe",
    published: true
  },
  {
    userId: 5,
    id: 12,
    title:
      "commodi ullam sint et excepturi error explicabo praesentium voluptas",
    body:
      "odio fugit voluptatum ducimus earum autem est incidunt voluptatem\nodit reiciendis aliquam sunt sequi nulla dolorem\nnon facere repellendus voluptates quia\nratione harum vitae ut",
    published: false
  },
  {
    userId: 6,
    id: 13,
    title: "soluta aliquam aperiam consequatur illo quis voluptas",
    body:
      "sunt dolores aut doloribus\ndolore doloribus voluptates tempora et\ndoloremque et quo\ncum asperiores sit consectetur dolorem",
    published: true
  },
  {
    userId: 6,
    id: 14,
    title: "qui enim et consequuntur quia animi quis voluptate quibusdam",
    body:
      "iusto est quibusdam fuga quas quaerat molestias\na enim ut sit accusamus enim\ntemporibus iusto accusantium provident architecto\nsoluta esse reprehenderit qui laborum",
    published: false
  },
  {
    userId: 7,
    id: 15,
    title: "voluptatem doloribus consectetur est ut ducimus",
    body:
      "ab nemo optio odio\ndelectus tenetur corporis similique nobis repellendus rerum omnis facilis\nvero blanditiis debitis in nesciunt doloribus dicta dolores\nmagnam minus velit",
    published: true
  },
  {
    userId: 8,
    id: 16,
    title: "et iusto veniam et illum aut fuga",
    body:
      "occaecati a doloribus\niste saepe consectetur placeat eum voluptate dolorem et\nqui quo quia voluptas\nrerum ut id enim velit est perferendis",
    published: false
  },
  {
    userId: 8,
    id: 17,
    title: "sint hic doloribus consequatur eos non id",
    body:
      "quam occaecati qui deleniti consectetur\nconsequatur aut facere quas exercitationem aliquam hic voluptas\nneque id sunt ut aut accusamus\nsunt consectetur expedita inventore velit",
    published: true
  },
  {
    userId: 8,
    id: 18,
    title: "consequuntur deleniti eos quia temporibus ab aliquid at",
    body:
      "voluptatem cumque tenetur consequatur expedita ipsum nemo quia explicabo\naut eum minima consequatur\ntempore cumque quae est et\net in consequuntur voluptatem voluptates aut",
    published: true
  },
  {
    userId: 9,
    id: 19,
    title: "sapiente omnis fugit eos",
    body:
      "consequatur omnis est praesentium\nducimus non iste\nneque hic deserunt\nvoluptatibus veniam cum et rerum sed",
    published: false
  },
  {
    userId: 9,
    id: 20,
    title: "sint soluta et vel magnam aut ut sed qui",
    body:
      "repellat aut aperiam totam temporibus autem et\narchitecto magnam ut\nconsequatur qui cupiditate rerum quia soluta dignissimos nihil iure\ntempore quas est",
    published: false
  },
  {
    userId: 9,
    id: 21,
    title: "ad iusto omnis odit dolor voluptatibus",
    body:
      "minus omnis soluta quia\nqui sed adipisci voluptates illum ipsam voluptatem\neligendi officia ut in\neos soluta similique molestias praesentium blanditiis",
    published: true
  },
  {
    userId: 10,
    id: 22,
    title: "aut amet sed",
    body:
      "libero voluptate eveniet aperiam sed\nsunt placeat suscipit molestias\nsimilique fugit nam natus\nexpedita consequatur consequatur dolores quia eos et placeat",
    published: true
  },
  {
    userId: 10,
    id: 23,
    title: "ratione ex tenetur perferendis",
    body:
      "aut et excepturi dicta laudantium sint rerum nihil\nlaudantium et at\na neque minima officia et similique libero et\ncommodi voluptate qui",
    published: false
  },
  {
    userId: 10,
    id: 24,
    title: "beatae soluta recusandae",
    body:
      "dolorem quibusdam ducimus consequuntur dicta aut quo laboriosam\nvoluptatem quis enim recusandae ut sed sunt\nnostrum est odit totam\nsit error sed sunt eveniet provident qui nulla",
    published: true
  },
  {
    userId: 10,
    id: 25,
    title: "qui qui voluptates illo iste minima",
    body:
      "aspernatur expedita soluta quo ab ut similique\nexpedita dolores amet\nsed temporibus distinctio magnam saepe deleniti\nomnis facilis nam ipsum natus sint similique omnis",
    published: false
  },
  {
    userId: 10,
    id: 26,
    title: "id minus libero illum nam ad officiis",
    body:
      "earum voluptatem facere provident blanditiis velit laboriosam\npariatur accusamus odio saepe\ncumque dolor qui a dicta ab doloribus consequatur omnis\ncorporis cupiditate eaque assumenda ad nesciunt",
    published: true
  },
  {
    userId: 10,
    id: 27,
    title: "quaerat velit veniam amet cupiditate aut numquam ut sequi",
    body:
      "in non odio excepturi sint eum\nlabore voluptates vitae quia qui et\ninventore itaque rerum\nveniam non exercitationem delectus aut",
    published: false
  }
];

const dummyComments = [
  {
    id: 1,
    authorId: 1,
    post: 10,
    commentText:
      "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
  },
  {
    id: 2,
    authorId: 4,
    post: 9,
    commentText:
      "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et"
  },
  {
    id: 3,
    authorId: 2,
    post: 8,
    commentText:
      "quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione"
  },
  {
    id: 4,
    authorId: 3,
    post: 7,
    commentText:
      "non et atque\noccaecati deserunt quas accusantium unde odit nobis qui voluptatem\nquia voluptas consequuntur itaque dolor\net qui rerum deleniti ut occaecati"
  },
  {
    id: 5,
    authorId: 5,
    post: 6,
    commentText:
      "harum non quasi et ratione\ntempore iure ex voluptates in ratione\nharum architecto fugit inventore cupiditate\nvoluptates magni quo et"
  },
  {
    id: 6,
    authorId: 8,
    post: 5,
    commentText:
      "doloribus at sed quis culpa deserunt consectetur qui praesentium\naccusamus fugiat dicta\nvoluptatem rerum ut voluptate autem\nvoluptatem repellendus aspernatur dolorem in"
  },
  {
    id: 7,
    authorId: 8,
    post: 4,
    commentText:
      "maiores sed dolores similique labore et inventore et\nquasi temporibus esse sunt id et\neos voluptatem aliquam\naliquid ratione corporis molestiae mollitia quia et magnam dolor"
  },
  {
    id: 8,
    authorId: 9,
    post: 2,
    commentText:
      "ut voluptatem corrupti velit\nad voluptatem maiores\net nisi velit vero accusamus maiores\nvoluptates quia aliquid ullam eaque"
  },
  {
    id: 9,
    authorId: 10,
    post: 1,
    commentText:
      "sapiente assumenda molestiae atque\nadipisci laborum distinctio aperiam et ab ut omnis\net occaecati aspernatur odit sit rem expedita\nquas enim ipsam minus"
  },
  {
    id: 10,
    authorId: 5,
    post: 1,
    commentText:
      "voluptate iusto quis nobis reprehenderit ipsum amet nulla\nquia quas dolores velit et non\naut quia necessitatibus\nnostrum quaerat nulla et accusamus nisi facilis"
  }
];

// Type Definitions [schema]
const typeDefs = `

  # Query is a type in GraphQL for fetching Data
  type Query {
    posts(searchQuery: String): [Posts!]!
    users(searchQuery: String): [User!]!
    comments: [Comments!]!
  }

  # Mutation is a type in GraphQL for Create, Update, Delete
  type Mutation {
    createUser(name: String!, email: String!, age: Int): User!
    createPost(title: String!, body: String!, published: Boolean!, userId: ID!): Posts!
    createComment(commentText: String!, post: ID!, authorId: ID!): Comments!
  }

  type Comments {
    id: ID!
    commentText: String!
    author: [User!]!
    posts: Posts!
  }
  
  type Posts {
    userId: ID!
    id: ID!
    title: String!
    body: String!
    published: Boolean
    author: User!
    comments: [Comments]!

  }

  #This is to retrive the user info
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Posts!]!
    comments: [Comments!]!
  }
  `;

// Resolvers
const resolvers = {
  Query: {
    comments() {
      return dummyComments;
    },

    // All User Info Data
    users(parent, args, ctx, info) {
      if (!args.searchQuery) {
        return dummyUsers;
      }
      return dummyUsers.filter(user => {
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
    posts(parent, args, ctx, info) {
      if (!args.searchQuery) {
        return dummyPosts;
      }
      return dummyPosts.filter(post => {
        const isTitleMatch = post.title
          .toLowerCase()
          .includes(args.searchQuery.toLowerCase());
        const isPostBodyMatch = post.body
          .toLowerCase()
          .includes(args.searchQuery.toLowerCase());
        return isTitleMatch || isPostBodyMatch;
      });
    }
  },

  // Mutations
  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailTaken = dummyUsers.some(user => {
        return user.email === args.email;
      });
      if (emailTaken) {
        throw new Error("Email is already taken");
      }
      const user = {
        id: uuidv4(),
        name: args.name,
        email: args.email,
        age: args.age
      };

      dummyUsers.push(user);
      return user;
    },
    createPost(parent, args, ctx, info) {
      const userExists = dummyUsers.some(user => {
        return user.id === args.userId;
      });

      if (!userExists) {
        throw new Error("User not found");
      }

      const post = {
        id: uuidv4(),
        title: args.title,
        body: args.body,
        published: args.published,
        userId: args.userId
      };

      dummyPosts.push(post);
      return post;
    },
    createComment(parent, args, ctx, info) {
      const userExists = dummyUsers.some(user => {
        return user.id === args.authorId;
      });

      const postExists = dummyPosts.find(post => {
        return post.id === args.post;
      });

      if (!userExists || !postExists) {
        throw new Error("User/Post Not Found");
      }

      const comment = {
        id: uuidv4(),
        commentText: args.commentText,
        authorId: args.authorId,
        post: args.post
      };
      dummyComments.push(comment);
      return comment;
    }
  },

  // Getting Individual user type data in posts for fetching the author userId this is outside of the Query global property

  Comments: {
    author(parent, args, ctx, info) {
      return dummyUsers.filter(user => {
        return user.id === parent.authorId;
      });
    },
    posts(parent, args, ctx, info) {
      return dummyPosts.find(post => {
        return post.id === parent.post;
      });
    }
  },

  Posts: {
    author(parent, args, ctx, info) {
      return dummyUsers.find(user => {
        // Here parent argument refers to the dummyposts array objects of each for every iteration
        return user.id === parent.userId;
      });
    },
    comments(parent, args, ctx, info) {
      return dummyComments.filter(comment => {
        return comment.post === parent.id;
      });
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      return dummyPosts.filter(post => {
        return post.userId === parent.id;
      });
    },
    comments(parent, args, ctx, info) {
      return dummyComments.filter(comment => {
        return comment.authorId === parent.id;
      });
    }
  }
};

const server = new GraphQLServer({
  typeDefs: typeDefs,
  resolvers: resolvers
});

server.start(() => {
  console.log("The server is running.");
});
