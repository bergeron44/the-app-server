
const {
    getUser,
    getAllUsers,
    getBulkUsers,
    addUser,
    removeUser,
    removeBulkUsers,
    updateUser,
    getAllUsersWithSameAttribute,
    getAllUsersWithSameCode
} = require('../services/User-services')
const serverResponse = require('../utils/serverResponse')

const getUserCont = async (req, res) => {
    try{
        const user = await getUser(req.params.userId)
    
        if(!user){
            return serverResponse(res, 404, { message: "no User found"})
        }
        const username=user.userName;
        const usernumofpointoverall=user.pointAllGames;
        const usernumberofgame=user.numberOfGames;
        const usercode=user.code;


        return serverResponse(res, 200, [username,usernumofpointoverall,usernumberofgame,usercode])
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to get User'})
    }
}
const createUserCont = async (req, res) => {
    try{
        const user={...req.body}
        const newUser = await addUser(user)

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
const deleteUserCont = async (req, res) => {
    try{
        const User = await removeUser(req.params.userId)

        if(!User){
            return serverResponse(res, 404, { message: "no capble to remove  User"})
        }

        return serverResponse(res, 200,{message: 'sccesfuly remove User +'+ User})
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to remove User'})
    }
}
const editUserCont = async (req, res) => {
    try{
        const newContent=req.body
        const updateduser = await updateUser(req.params.userId,newContent)

        if(!updateduser){
            return serverResponse(res, 404, { message: "no avilable to update User "})
        }
    const newUser=await getUser(req.params.userId)
        return serverResponse(res, 200, newUser)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to update User '})
    }
}
const removeBulkUsersCont = async (req, res) => {
    try{
        const allDeletedUsers = removeBulkUsers(req.params.userListId)
        updateUser.save;
        if(!allDeletedUsers){
            return serverResponse(res, 404, { message: "no avilable to remove all Users "})
        }

        return serverResponse(res, 200, allDeletedUsers)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to remove all Users'})
    }
}

const addToGameNumberOfPointCont = async (req, res) => {
    try{
        const user = await getUser(req.params.userId)
        if(!user){
            return serverResponse(res, 404, { message: "no found the User for adding point "})
        }
        const bodyObject={...req.body};
        user.pointForGame=user.pointForGame+bodyObject.pointToAdd;
        const newUser= await updateUser(req.params.userId,user)
        if(!newUser){
                 return serverResponse(res, 404, { message: "no avilable to update User affter adding point "})
             }
        const userToReturn= await getUser(req.params.userId)
        

        return serverResponse(res, 200,  userToReturn)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to update User  '})
    }
}
const setCurrentGameCodeCont = async (req, res) => {
    try{
        const user = await getUser(req.params.userId)
        user.code=req.body.code;
        const newUser= await updateUser(req.params.userId,user)
        if(!newUser){
            return serverResponse(res, 404, { message: "no avilable to update User "})
        }
        const userToCheck= await getUser(req.params.userId)

        return serverResponse(res, 200, userToCheck)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to update User'})
    }
}
const getAllUsersWithMatchCodeCont = async (req, res) => {
    try{
        const users = await getAllUsersWithSameCode(req.params.code)
        if(!users){
            return serverResponse(res, 404, { message: "no avilable to get all users with same code "})
        }

        return serverResponse(res, 200, users)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to get all users with game code :'+req.params.code})
    }
}




module.exports = {
    getUserCont,
    getAllUserCont,
    createUserCont,
    deleteUserCont,
    editUserCont,
    removeBulkUsersCont,
    getAllUsersWithMatchCodeCont,
    setCurrentGameCodeCont,
    addToGameNumberOfPointCont,
}