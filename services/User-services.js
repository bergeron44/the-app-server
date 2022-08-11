const User = require('../models/User')

const getUser = (userId) => {
    return User.findOne({_id: userId})
}

const getAllUsers = () => {
    return User.find({})
}

const getBulkUsers = (usersIdsList) => {
    const usersList = []
    usersIdsList.forEach(questionId => {
        const q = Question.findOne({_id: questionId})
        usersList.push(q)
    })
    return usersList
}

const addUser = async (UserObject) => {
    UserObject = new User(UserObject)
    return UserObject.save()
}

const removeUser = (userId) => {
    return User.findOneAndRemove({_id: userId})
}

const removeAllUsers = (UserListIds) => {
    UserListIds.forEach(userId => {
        User.findOneAndRemove({_id: userId})
    })
}

const updateUser = (userId, newContent) => {
    return Question.findOneAndUpdate({_id:userId}, newContent, {new:true})
}

module.exports = {
    getUser,
    getAllUsers,
    getBulkUsers,
    addUser,
    removeUser,
    removeAllUsers,
    updateUser,
}