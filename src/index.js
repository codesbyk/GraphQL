import { GraphQLServer } from "graphql-yoga";

// We have the following Scalar Types below
// -------> String, Boolean, Int, Float, ID

// Demo User Data
var dummyUsers = [
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
    id: 11,
    title: "et ea vero quia laudantium autem",
    body:
      "delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus\naccusamus in eum beatae sit\nvel qui neque voluptates ut commodi qui incidunt\nut animi commodi",
    published: true
  },
  {
    userId: 2,
    id: 12,
    title: "in quibusdam tempore odit est dolorem",
    body:
      "itaque id aut magnam\npraesentium quia et ea odit et ea voluptas et\nsapiente quia nihil amet occaecati quia id voluptatem\nincidunt ea est distinctio odio",
    published: true
  },
  {
    userId: 2,
    id: 20,
    title: "doloribus ad provident suscipit at",
    body:
      "qui consequuntur ducimus possimus quisquam amet similique\nsuscipit porro ipsam amet\neos veritatis officiis exercitationem vel fugit aut necessitatibus totam\nomnis rerum consequatur expedita quidem cumque explicabo",
    published: true
  },
  {
    userId: 3,
    id: 29,
    title: "iusto eius quod necessitatibus culpa ea",
    body:
      "odit magnam ut saepe sed non qui\ntempora atque nihil\naccusamus illum doloribus illo dolor\neligendi repudiandae odit magni similique sed cum maiores",
    published: true
  },
  {
    userId: 3,
    id: 30,
    title: "a quo magni similique perferendis",
    body:
      "alias dolor cumque\nimpedit blanditiis non eveniet odio maxime\nblanditiis amet eius quis tempora quia autem rem\na provident perspiciatis quia",
    published: true
  },
  {
    userId: 4,
    id: 38,
    title: "explicabo et eos deleniti nostrum ab id repellendus",
    body:
      "animi esse sit aut sit nesciunt assumenda eum voluptas\nquia voluptatibus provident quia necessitatibus ea\nrerum repudiandae quia voluptatem delectus fugit aut id quia\nratione optio eos iusto veniam iure",
    published: true
  },
  {
    userId: 4,
    id: 39,
    title: "eos dolorem iste accusantium est eaque quam",
    body:
      "corporis rerum ducimus vel eum accusantium\nmaxime aspernatur a porro possimus iste omnis\nest in deleniti asperiores fuga aut\nvoluptas sapiente vel dolore minus voluptatem incidunt ex",
    published: false
  },
  {
    userId: 4,
    id: 40,
    title: "enim quo cumque",
    body:
      "ut voluptatum aliquid illo tenetur nemo sequi quo facilis\nipsum rem optio mollitia quas\nvoluptatem eum voluptas qui\nunde omnis voluptatem iure quasi maxime voluptas nam",
    published: true
  },
  {
    userId: 5,
    id: 41,
    title: "non est facere",
    body:
      "molestias id nostrum\nexcepturi molestiae dolore omnis repellendus quaerat saepe\nconsectetur iste quaerat tenetur asperiores accusamus ex ut\nnam quidem est ducimus sunt debitis saepe",
    published: true
  },
  {
    userId: 5,
    id: 42,
    title:
      "commodi ullam sint et excepturi error explicabo praesentium voluptas",
    body:
      "odio fugit voluptatum ducimus earum autem est incidunt voluptatem\nodit reiciendis aliquam sunt sequi nulla dolorem\nnon facere repellendus voluptates quia\nratione harum vitae ut",
    published: false
  },
  {
    userId: 6,
    id: 51,
    title: "soluta aliquam aperiam consequatur illo quis voluptas",
    body:
      "sunt dolores aut doloribus\ndolore doloribus voluptates tempora et\ndoloremque et quo\ncum asperiores sit consectetur dolorem",
    published: true
  },
  {
    userId: 6,
    id: 52,
    title: "qui enim et consequuntur quia animi quis voluptate quibusdam",
    body:
      "iusto est quibusdam fuga quas quaerat molestias\na enim ut sit accusamus enim\ntemporibus iusto accusantium provident architecto\nsoluta esse reprehenderit qui laborum",
    published: false
  },
  {
    userId: 7,
    id: 61,
    title: "voluptatem doloribus consectetur est ut ducimus",
    body:
      "ab nemo optio odio\ndelectus tenetur corporis similique nobis repellendus rerum omnis facilis\nvero blanditiis debitis in nesciunt doloribus dicta dolores\nmagnam minus velit",
    published: true
  },
  {
    userId: 8,
    id: 71,
    title: "et iusto veniam et illum aut fuga",
    body:
      "occaecati a doloribus\niste saepe consectetur placeat eum voluptate dolorem et\nqui quo quia voluptas\nrerum ut id enim velit est perferendis",
    published: false
  },
  {
    userId: 8,
    id: 72,
    title: "sint hic doloribus consequatur eos non id",
    body:
      "quam occaecati qui deleniti consectetur\nconsequatur aut facere quas exercitationem aliquam hic voluptas\nneque id sunt ut aut accusamus\nsunt consectetur expedita inventore velit",
    published: true
  },
  {
    userId: 8,
    id: 73,
    title: "consequuntur deleniti eos quia temporibus ab aliquid at",
    body:
      "voluptatem cumque tenetur consequatur expedita ipsum nemo quia explicabo\naut eum minima consequatur\ntempore cumque quae est et\net in consequuntur voluptatem voluptates aut",
    published: true
  },
  {
    userId: 9,
    id: 88,
    title: "sapiente omnis fugit eos",
    body:
      "consequatur omnis est praesentium\nducimus non iste\nneque hic deserunt\nvoluptatibus veniam cum et rerum sed",
    published: false
  },
  {
    userId: 9,
    id: 89,
    title: "sint soluta et vel magnam aut ut sed qui",
    body:
      "repellat aut aperiam totam temporibus autem et\narchitecto magnam ut\nconsequatur qui cupiditate rerum quia soluta dignissimos nihil iure\ntempore quas est",
    published: false
  },
  {
    userId: 9,
    id: 90,
    title: "ad iusto omnis odit dolor voluptatibus",
    body:
      "minus omnis soluta quia\nqui sed adipisci voluptates illum ipsam voluptatem\neligendi officia ut in\neos soluta similique molestias praesentium blanditiis",
    published: true
  },
  {
    userId: 10,
    id: 91,
    title: "aut amet sed",
    body:
      "libero voluptate eveniet aperiam sed\nsunt placeat suscipit molestias\nsimilique fugit nam natus\nexpedita consequatur consequatur dolores quia eos et placeat",
    published: true
  },
  {
    userId: 10,
    id: 92,
    title: "ratione ex tenetur perferendis",
    body:
      "aut et excepturi dicta laudantium sint rerum nihil\nlaudantium et at\na neque minima officia et similique libero et\ncommodi voluptate qui",
    published: false
  },
  {
    userId: 10,
    id: 93,
    title: "beatae soluta recusandae",
    body:
      "dolorem quibusdam ducimus consequuntur dicta aut quo laboriosam\nvoluptatem quis enim recusandae ut sed sunt\nnostrum est odit totam\nsit error sed sunt eveniet provident qui nulla",
    published: true
  },
  {
    userId: 10,
    id: 94,
    title: "qui qui voluptates illo iste minima",
    body:
      "aspernatur expedita soluta quo ab ut similique\nexpedita dolores amet\nsed temporibus distinctio magnam saepe deleniti\nomnis facilis nam ipsum natus sint similique omnis",
    published: false
  },
  {
    userId: 10,
    id: 95,
    title: "id minus libero illum nam ad officiis",
    body:
      "earum voluptatem facere provident blanditiis velit laboriosam\npariatur accusamus odio saepe\ncumque dolor qui a dicta ab doloribus consequatur omnis\ncorporis cupiditate eaque assumenda ad nesciunt",
    published: true
  },
  {
    userId: 10,
    id: 96,
    title: "quaerat velit veniam amet cupiditate aut numquam ut sequi",
    body:
      "in non odio excepturi sint eum\nlabore voluptates vitae quia qui et\ninventore itaque rerum\nveniam non exercitationem delectus aut",
    published: false
  }
];

// Type Definitions [schema]
const typeDefs = `
  type Query {
    users(searchQuery: String): [User!]!
    me: User!
    post: Post!
    posts(searchQuery: String): [Posts!]!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }

  type Posts {
    userId: ID!
    id: ID!
    title: String!
    body: String!
    published: Boolean
  }
`;

// Resolvers
const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.searchQuery) {
        return dummyUsers;
      }
      return dummyUsers.filter(user => {
        return user.name.toLowerCase().includes(args.searchQuery.toLowerCase());
      });
    },
    me() {
      return {
        id: Math.floor(Math.random() * 9999),
        name: "Code Resolvers",
        email: "kiran.ray99@gmail.com",
        age: 25
      };
    },

    post() {
      return {
        id: Math.floor(Math.random() * 9999),
        title: "How GraphQL works under the hood",
        body: "How to fit into the frameworks with the GraphQL Technology",
        published: true
      };
    },
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
  }
};

const server = new GraphQLServer({
  typeDefs: typeDefs,
  resolvers: resolvers
});

server.start(() => {
  console.log("The server is running.");
});
