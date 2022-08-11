const {
    getUser,
    getAllUsers,
    getBulkUsers,
    addUser,
    removeUser,
    removeAllUsers,
    updateUser
} = require('../services/User-services')
const serverResponse = require('../utils/serverResponse')

const getUserCont = async (req, res) => {
    try{
        const user = await getUser(req.params.userId)

        if(!user){
            return serverResponse(res, 404, { message: "no User found"})
        }

        return serverResponse(res, 200, user)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to get User'})
    }
}
const addUserTo = async (req, res) => {
    try{
        const newUser = await addUser(req.params.userObject)

        if(!newUser){
            return serverResponse(res, 404, { message: "no capble to add newUser"})
        }

        return serverResponse(res, 200, newUser)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to set new user'})
    }
}
const getAllUserCont = async (req, res) => {
    try{
        const allUsers = await getAllUsers()

        if(!allUsers){
            return serverResponse(res, 404, { message: "no all User found"})
        }

        return serverResponse(res, 200, allUsers)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to get all User'})
    }
}
const removeUserFrom = async (req, res) => {
    try{
        const removeUser = await removeUser(req.params.userId)

        if(!removeUser){
            return serverResponse(res, 404, { message: "no capble to remove  User"})
        }

        return serverResponse(res, 200, removeUser)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to remove User'})
    }
}
const updateUsercont = async (req, res) => {
    try{
        const updateduser = await updateUser(req.params.userId,req.params.newContent)

        if(!updateduser){
            return serverResponse(res, 404, { message: "no avilable to update User "})
        }

        return serverResponse(res, 200, updateduser)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to update User'})
    }
}




module.exports = {
    getUserCont,
    getAllUserCont,
    addUserTo,
    removeUserFrom,
    updateUsercont
}