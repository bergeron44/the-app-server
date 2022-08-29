const UserTable = require('../models/UsersTable')


const getTableById = (tableId) => {
    return UserTable.find({_id:tableId})
     .populate('allUsers')
     .populate('creator')
}
const getTableByCode = (tablecode) => {
    return UserTable.find({code: tablecode})
    .populate('allUsers')
    .populate('creator')
}
const getAllTables = () => {
    return UserTable.find()
    .populate('allUsers')
    .populate('creator')
}
const getAllUsersFromTableWithCode = (code) => {
    return UserTable.find({code}).populatelate('allUsers')// .populate({path: table.allUsers, model:'User'}) // find out how to populate an array inside of an object
}
const getCreatorOfTableWithCode = (code) => {
    return UserTable.find({code: code}).populate('creator')// .populate({path: table.allUsers, model:'User'}) // find out how to populate an array inside of an object
}

const addTable = async (tableObject) => {
    tableObject = new UserTable(tableObject)
    return tableObject.save()
}

const removeTableByCode = (tablecode) => {
    return UserTable.findOneAndRemove({code: tablecode})
}
const removeTableById = (tableId) => {
    return UserTable.findOneAndRemove({_id:tableId})
}

const removeAllTables = (tableListNames) => {
    tableListNames.forEach(tableName => {
        UserTable.findOneAndRemove({tableName})
    })
}
const updateTable= (tableCode, newContent) => {
    return UserTable.findOneAndUpdate({code: tableCode},newContent , {new:true})
    .populate('allUsers') 
    .populate('creator')   
}
const sortAllUsersPoint= (tablecode) => {
    return UserTable.findOne({code: tablecode})
        .populate('allUsers') 
        .sort((a,b) => a.pointforgame -b.pointforgame);
      
}//לא בשימוש


module.exports = {
    getTableById,
    getTableByCode,
    getAllTables,
    addTable,
    removeTableByCode,
    removeTableById,
    removeAllTables,
    updateTable,
    getAllUsersFromTableWithCode,
    getCreatorOfTableWithCode,
    sortAllUsersPoint
    
}