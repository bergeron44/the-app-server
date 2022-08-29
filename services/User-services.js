const User = require('../models/User')

const getUser = (userId) => {
    return User.findOne({_id: userId})
}

const getAllUsers = () => {
    return User.find({})
}

const getBulkUsers = (usersIdsList) => {
    const usersList = []
    usersIdsList.forEach(UserId => {
        const q = User.findOne({_id: UserId})
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

const removeBulkUsers = (UserListIds) => {
    UserListIds.forEach(userId => {
        User.findOneAndRemove({_id: userId})
    })

}
const getAllUsersWithSameAttribute = (attribute,whatMatch) => {
    return User.find({[attribute]:whatMatch})
}
const getAllUsersWithSameCode = (whatMatch) => {
    return User.find({code:whatMatch})
}
const removeAllUsersWithSameAttribute =(attribute,whatMatch) => {
    return User.findOneAndRemove({[attribute]:whatMatch})
}
const updateUser = (userId, newContent) => {
    return User.findOneAndUpdate({_id:userId}, newContent, {new:true})
}

module.exports = {
    getUser,
    getAllUsers,
    getBulkUsers,
    addUser,
    removeUser,
    removeBulkUsers,
    updateUser,
    getAllUsersWithSameAttribute,
    removeAllUsersWithSameAttribute,
    getAllUsersWithSameCode,
}