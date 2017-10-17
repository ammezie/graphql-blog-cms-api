'use strict';

const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

// Define our schema using the GraphQL schema language
const typeDefs = `
    scalar DateTime

    type User {
        id: Int!
        firstName: String!
        lastName: String
        email: String!
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
        tags: [Tag!]!
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
        allUsers: [User]
        fetchUser(id: Int!): User
        allPosts: [Post]
        fetchPost(id: Int!): Post
        allTags: [Tag]
        fetchTag(id: Int!): Tag
    }

    input TagInput {
        id: Int!
    }

    type Mutation {
        login (
            email: String!,
            password: String!
        ): String
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
            status: Boolean
            tags: [TagInput!]!
        ): Post
        updatePost (
            id: Int!,
            title: String!,
            content: String!,
            status: Boolean,
            tags: [TagInput!]!
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