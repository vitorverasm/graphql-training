const { GraphQLServer } = require("graphql-yoga");

let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL"
  },
  {
    id: "link-1",
    url: "www.teste1.com",
    description: "Teste 1"
  },
  {
    id: "link-2",
    url: "www.teste2.com",
    description: "Teste 2"
  }
];
let idCount = links.length;

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (parent, args) => {
      const { id } = args;
      return links.find(post => {
        if (post.id === id) {
          return true;
        }
      });
    }
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    },
    updateLink: (parent, args) => {
      const { id, url, description } = args;
      let postIndex = links.findIndex(post => {
        if (post.id === id) {
          return true;
        }
      });
      if (postIndex !== -1) {
        links[postIndex].url = url;
        links[postIndex].description = description;
      }
      return links[postIndex];
    },
    deleteLink: (parent, args) => {
      const { id } = args;
      let deletedPost;
      let postIndex = links.findIndex(post => {
        if (post.id === id) {
          return true;
        }
      });
      if (postIndex !== -1) {
        deletedPost = links.splice(postIndex, 1).pop();
      }
      return deletedPost;
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
