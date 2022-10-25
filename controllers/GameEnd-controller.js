const { getTableByCode, removeTableByCode } = require('../services/UserTable-services')
const { getAllUsers, getUser } = require('../services/User-services')

const serverResponse = require('../utils/serverResponse')

const endGameCont = async (req, res) => {
    try{
        const table = await getTableByCode(req.params.code)
        if(!table)
        {
            return serverResponse(res, 404, { message: "no table found"})
        }
        const allUsersInGame=table.allUsers
        const resetUsers=[]
        allUsers.forEach(async user => {
            const userToReturn=await getUser(user._id)
            userToReturn.code=0
            userToReturn.pointAllGames+=userToReturn.pointForGame;
            userToReturn.pointForGame=0;
            userToReturn.numberOfGames++;
           const userToPush=await updateUser(user._id,userToReturn)
            resetUsers.push(userToPush);  
        });
       const removeTable=await removeTableByCode(req.params.code)
        return serverResponse(res, 200, { message: "this users are reseted :--"+resetUsers+"and this th table==:"+removeTable})
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to end game'})
    }
}//not work 

module.exports = {
    endGameCont
}