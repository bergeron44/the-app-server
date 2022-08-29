const { getTableByCode, removeTableByCode } = require('../services/UserTable-services')
const { getAllUsers } = require('../services/User-services')

const serverResponse = require('../utils/serverResponse')

const endGameCont = async (req, res) => {
    try{
        const table = await getTableByCode(req.params.code)
        const allUsersInGame=table.allusers
        const allUsers=getAllUsers()
        const resetUsers=[]
        allUsers.forEach(user => {
            allUsersInGame.forEach(gameuser=>
                {
                    if(user._id=gameuser._id)
                    {
                        user.code=0
                        user.pointAllGames+=gameuser.pointForGame;
                        user.pointForGame=0;
                        user.numberOfGames++;
                        updateUser(user._id,user)
                        resetUsers.push(user);
                    }
                })
        });
        if(!table){
            return serverResponse(res, 404, { message: "no table found"})
        }
       const removeTable=await removeTableByCode(req.params.code)
        return serverResponse(res, 200, { message: "this users are reseted :--"+resetUsers+"and this th table==:"+removeTable})
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to end game'})
    }
}

module.exports = {
    endGameCont
}