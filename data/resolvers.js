'use strict';

const { User, Post, Tag } = require('../models');
const bcrypt = require('bcrypt');

// Define resolvers
const resolvers = {
    Query: {
        // Fetach all users
        async allUsers() {
           return await User.all()
        },

        // Get a user by it ID
        async fetchUser(_, { id }) {
            return await User.findById(id)
        },

        // Fetch all posts
        async allPosts() {
            return await Post.all()
        },

        // Get a post by it ID
        async fetchPost(_, { id }) {
            return await Post.findById(id)
        },

        // Fetch all tags
        async allTags() {
            return await Tag.all()
        },

        // Get a tag by it ID
        async fetchTag(_, { id }) {
            return await Tag.findById(id)
        },
    },

    Mutation: {
        // Handles user login
        login(_, args) {

        },

        // Create new user
        async createUser(_, { firstName, lastName, email, password }) {
            return await User.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: await bcrypt.hash(password, 10)
            })
        },

        // Update a particular user
        async updateUser(_, { id, firstName, lastName, email, password }) {
            // fetch the user by it ID
            const user = await User.findById(id)

            // Update the user
            await user.update({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: await bcrypt.hash(password, 10)
            })

            return user
        },

        // Add a new post
        async addPost(_, { title, content, status }) {
            // TODO: get the authenticated user

            return await Post.create({
                userId: 1,
                title: title,
                content: content,
                status: status,
                tags: [
                    { id: 1 }
                ]
            }, {
                include: [ Tag ]
            })
        },

        // Update a particular post
        async updatePost(_, { id, title, content, status }) {
            // fetch the post by it ID
            const post = await Post.findById(id)

            // Update the post
            await post.update({
                title: title,
                content: content,
                status: status
            })

            return post
        },

        // Delete a specified post
        async deletePost(_, { id }) {
            // fetch the post by it ID
            const post = await Post.findById(id)

            return await post.destroy()
        },

        // Add a new tag
        async addTag(_, { name, description }) {
            return await Tag.create({
                name: name,
                description: description
            })
        },

        // Update a particular tag
        async updateTag(_, { id, name, description }) {
            // fetch the tag by it ID
            const tag = await Tag.findById(id)

            // Update the tag
            await tag.update({
                name: name,
                description: description
            })

            return tag
        },

        // Delete a specified tag
        async deleteTag(_, { id }) {
            // fetch the tag by it ID
            const tag = await Tag.findById(id)

            return await tag.destroy()
        }
    },

    User: {
        // Fetch all posts created by a user
        posts(user) {
            return user.getPosts()
        }
    },

    Post: {
        // Fetch the author of a particular post
        user(post) {
            return post.getUser()
        },

        // Fetch alls tags that a post belongs to
        tags(post) {
            return post.getTags()
        }
    },

    Tag: {
        // Fetch all posts belonging to a tag
        posts(tag) {
            return tag.getPosts()
        }
    },

    DateTime: {

    }
};

module.exports = resolvers;