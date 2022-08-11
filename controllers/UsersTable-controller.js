const {
    getTableByName,
    getTableByCode,
    getAllUsersFromTableName,
    getAllUsersFromTableCode,
    getTableCode,
    getTableNameByCode,
    getTopThreeBest,
    addTable,
    removeTableByCode,
    removeTableByName,
    removeAllTables,
    removeUserByNameAndTableName,
    removeUserByCodeAndName,
    updateTableUsers,
    updateTableName
} = require('../services/UserTable-services')
const serverResponse = require('../utils/serverResponse')

const getTablenCont = async (req, res) => {
    try{
        const table = await getUser(req.params.userId)

        if(!table){
            return serverResponse(res, 404, { message: "no table found"})
        }

        return serverResponse(res, 200, table)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to get table'})
    }
}

module.exports = {
    getTableCont
}