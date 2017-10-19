'use strict';

const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { User, Post, Tag } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const slugify = require('slugify');
require('dotenv').config();

// Define resolvers
const resolvers = {
    Query: {
        // Fetch all users
        async allUsers() {
           return await User.all();
        },

        // Get a user by it ID
        async fetchUser(_, { id }) {
            return await User.findById(id);
        },

        // Fetch all posts
        async allPosts() {
            return await Post.all();
        },

        // Get a post by it ID
        async fetchPost(_, { id }) {
            return await Post.findById(id);
        },

        // Fetch all tags
        async allTags(_, args, { user }) {
            return await Tag.all();
        },

        // Get a tag by it ID
        async fetchTag(_, { id }) {
            return await Tag.findById(id);
        },
    },

    Mutation: {
        // Handles user login
        async login(_, { email, password }) {
            const user = await User.findOne({ where: { email } });

            if (!user) {
                throw new Error('No user with that email');
            }

            const valid = await bcrypt.compare(password, user.password);

            if (!valid) {
                throw new Error('Incorrect password');
            }

            // Return json web token
            return jwt.sign({
                id: user.id,
                email: user.email
            }, process.env.JWT_SECRET, { expiresIn: '1y' });
        },

        // Create new user
        async createUser(_, { firstName, lastName, email, password }) {
            return await User.create({
                firstName,
                lastName,
                email,
                password: await bcrypt.hash(password, 10)
            });
        },

        // Update a particular user
        async updateUser(_, { id, firstName, lastName, email, password }, { authUser }) {
            // Make sure user is logged in
            if (!authUser) {
                throw new Error('You must log in to continue!')
            }

            // fetch the user by it ID
            const user = await User.findById(id);

            // Update the user
            await user.update({
                firstName,
                lastName,
                email,
                password: await bcrypt.hash(password, 10)
            });

            return user;
        },

        // Add a new post
        async addPost(_, { title, content, status, tags }, { authUser }) {
            // Make sure user is logged in
            if (!authUser) {
                throw new Error('You must log in to continue!')
            }

            const user = await User.findOne({ where: { id: authUser.id } });

            const post = await Post.create({
                userId: user.id,
                title,
                slug: slugify(title, { lower: true }),
                content,
                status
            });

            // Assign tags to post
            await post.setTags(tags);

            return post;
        },

        // Update a particular post
        async updatePost(_, { id, title, content, status, tags }, { authUser }) {
            // Make sure user is logged in
            if (!authUser) {
                throw new Error('You must log in to continue!')
            }

            // fetch the post by it ID
            const post = await Post.findById(id);

            // Update the post
            await post.update({
                title,
                slug: slugify(title, { lower: true }),
                content,
                status
            });

            // Assign tags to post
            await post.setTags(tags);

            return post;
        },

        // Delete a specified post
        async deletePost(_, { id }, { authUser }) {
            // Make sure user is logged in
            if (!authUser) {
                throw new Error('You must log in to continue!')
            }

            // fetch the post by it ID
            const post = await Post.findById(id);

            return await post.destroy();
        },

        // Add a new tag
        async addTag(_, { name, description }, { authUser }) {
            // Make sure user is logged in
            if (!authUser) {
                throw new Error('You must log in to continue!')
            }

            return await Tag.create({
                name,
                slug: slugify(name, { lower: true }),
                description
            });
        },

        // Update a particular tag
        async updateTag(_, { id, name, description }, { authUser }) {
            // Make sure user is logged in
            if (!authUser) {
                throw new Error('You must log in to continue!')
            }

            // fetch the tag by it ID
            const tag = await Tag.findById(id);

            // Update the tag
            await tag.update({
                name,
                slug: slugify(name, { lower: true }),
                description
            });

            return tag;
        },

        // Delete a specified tag
        async deleteTag(_, { id }, { authUser }) {
            // Make sure user is logged in
            if (!authUser) {
                throw new Error('You must log in to continue!')
            }

            // fetch the tag by it ID
            const tag = await Tag.findById(id);

            return await tag.destroy();
        }
    },

    User: {
        // Fetch all posts created by a user
        async posts(user) {
            return await user.getPosts();
        }
    },

    Post: {
        // Fetch the author of a particular post
        async user(post) {
            return await post.getUser();
        },

        // Fetch alls tags that a post belongs to
        async tags(post) {
            return await post.getTags();
        }
    },

    Tag: {
        // Fetch all posts belonging to a tag
        async posts(tag) {
            return await tag.getPosts();
        }
    },

    DateTime: new GraphQLScalarType({
        name: 'DateTime',
        description: 'DateTime type',

        parseValue(value) {
            // value from the client
            return new Date(value);
        },

        serialize(value) {
            const date = new Date(value);

            // value sent to the client
            return date.toISOString();
        },

        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                // ast value is always in string format
                return parseInt(ast.value, 10);
            }

            return null;
        }
    })
};

module.exports = resolvers;