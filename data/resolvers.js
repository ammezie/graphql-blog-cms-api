'use strict'

const { User, Post, Tag } = require('./connector')
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
            return await findById(id)
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
            return await User.update({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: await bcrypt.hash(password, 10)
            }, {
                where: { id: id }
            })
        },
        addPost(_, args) {

        },
        updatePost(_, args) {

        },
        deletePost(_, args) {

        },
        addTag(_, args) {

        },
        updateTag(_, args) {

        },
        deleteTag(_, args) {

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
}

module.exports = resolvers