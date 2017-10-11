const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

// Define our schema using the GraphQL schema language
const typeDefs = `
    scalar DateTime

    type User {
        id: Int!
        fisrtName: String!
        lastName: String
        email: String!
        password: String!
        posts: [Post]
        createdAt: DateTime! # will be generated
        updatedAt: DateTime! # will be generated
    }

    type Post {
        id: Int!
        title: String!
        content: String!
        status: Boolean!
        user: User!
        tags: [Tag]!
        createdAt: DateTime! # will be generated
        updatedAt: DateTime! # will be generated
    }

    type Tag {
        id: Int!
        name: String!
        description: String
        posts: [Post]
        createdAt: DateTime! # will be generated
        updatedAt: DateTime! # will be generated
    }

    type Query {
        users: [User]
        posts: [Post]
        fetchPost(id: Int!): Post
        tags: [Tag]
        fetchTag(id: Int!): Tag
    }

    type Mutation {
        login (
            email: String!,
            password: String!
        ): User
        createUser (
            firstName: String!,
            lastName: String,
            email: String!,
            password: String!
        ): User
        updateUser (
            id: Int!,
            firstName: String!,
            lastName: String,
            email: String!,
            password: String!
        ): User

        addPost (
            title: String!,
            content: String!,
            status: Boolean!
            user: Int!,
            tags: Tag
        ): Post
        updatePost (
            id: Int!,
            title: String!,
            content: String!,
            status: Boolean!,
            user: Int!,
            tags: Tag
        ): Post
        deletePost (
            id: Int!
        ): Boolean

        addTag (
            name: String!,
            description: String
        ): Tag
        updateTag (
            id: Int!,
            name: String!,
            description: String
        ): Tag
        deleteTag (
            id: Int!
        ): Boolean
    }
`;

module.exports = makeExecutableSchema({ typeDefs, resolvers });