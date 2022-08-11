const UserTable = require('../models/UserTable')


const getTableByName = (tableName) => {
    return UserTable.findOne({_tableName: tableName})
}
const getTableByCode = (tablecode) => {
    return UserTable.findOne({_code: tablecode})
}
const getAllUsersFromTableName = (tableName) => {
    return UserTable.find({_tableName: tableName}).allUsers
}
const getAllUsersFromTableCode = (tablecode) => {
    return UserTable.find({_code: tablecode}).allUsers
}
const getTableCode = (tableName) => {
    return UserTable.find({_tableName: tableName}).code
}
const getTableNameByCode = (tablecode) => {
    return UserTable.find({_code: tablecode}).tableName
}

const getTopThreeBest = (tableName) => {
    const userlist=[]
    const bestuserList = []
    const bestthree = []
    UserTable.find({_tableName: tableName}).allUsers.forEach(User => {
        const q = Question.findOne({_id: questionId})
        userlist.push(q)
    })

    bestthree.push(bestuserList[2])
    bestthree.push(bestuserList[1])
    bestthree.push(bestuserList[0])


    return bestthree
}//לא מסווים

const addTable = async (tableObject) => {
    tableObject = new UserTable(tableObject)
    return tableObject.save()
}

const removeTableByCode = (tablecode) => {
    return UserTable.findOneAndRemove({_code: tablecode})
}
const removeTableByName = (tablename) => {
    return UserTable.findOneAndRemove({_tableName: tablename})
}

const removeAllTables = (tableListNames) => {
    tableListIds.forEach(tablename => {
        UserTable.findOneAndRemove({_tableName: tablename})
    })
}
const removeUserByNameAndTableName = (UserName,tablename) => {
    const newuserlist=[]
    UserTable.find({_tableName: tablename})._allUsers.forEach(User => {
        if(User._username!=UserName)
        newuserlist.push(User)
    })
    return  UserTable.find({_tableName: tablename})._allUsers=newuserlist

}
const removeUserByCodeAndName = (UserName,code) => {
    const newuserlist=[]
    UserTable.find({_code: code})._allUsers.forEach(User => {
        if(User._username!=UserName)
        newuserlist.push(User)
    })
    return  UserTable.find({_tableName: tablename})._allUsers=newuserlist

}
const updateTableUsers= (tablename, newUser) => {
   return UserTable.find({_tableName: tablename})._allUsers.push(newUser)
}
const updateTableName = (tablecode, newtablename) => {
    return UserTable.find({_code:tablecode})._tableName=newtablename
}

module.exports = {
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
    updateTableName,
}