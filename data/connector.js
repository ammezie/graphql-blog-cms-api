'use strict'

const Sequelize = require('sequelize')
require('dotenv').config()

// Create instance of DB Connection.
const db = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
})

// Importa our models
const UserModel = db.import('../models/user')
const PostModel = db.import('../models/post')
const TagModel = db.import('../models/tag')

// Define relationships between models
UserModel.hasMany(PostModel)
PostModel.belongsTo(UserModel)
PostModel.belongsToMany(TagModel, { through: 'PostTag' })
TagModel.belongsToMany(PostModel, { through: 'PostTag' })

const User = db.models.user
const Post = db.models.post
const Tag = db.models.tag

module.exports = { User, Post, Tag }