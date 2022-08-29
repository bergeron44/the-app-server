const {
    getTableById,
    getTableByCode,
    addTable,
    removeTableByCode,
    removeTableById,
    removeAllTables,
    updateTable,
    sortAllUsersPoint,
    getAllTables

} = require('../services/UserTable-services')

const {
    getUser,
    getAllUsersWithSameAttribute,
    updateUser,
    getAllUsers,
    getAllUsersWithSameCode,

}= require('../services/User-services')

const serverResponse = require('../utils/serverResponse')
const getTableCont = async (req, res) => {
    try{
        const table = await getTableByCode(req.params.code)
        if(!table){
            return serverResponse(res, 404, { message: "no table found"})
        }

        return serverResponse(res, 200, table)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to get table'})
    }
}
const getTableIdCont = async (req, res) => {
    try{
        const table = await getTableById(req.params.tableId)
        
        if(!table){
            return serverResponse(res, 404, { message: "no table found"})
        }

        return serverResponse(res, 200, table)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to get table'})
    }
}
const getAllTablesCont = async (req, res) => {
    try{
        const allTable = await getAllTables()
        
        if(!allTable){
            return serverResponse(res, 404, { message: "no one table found"})
        }

        return serverResponse(res, 200, allTable)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to get all table'})
    }
}
const createTableCont = async (req, res) => {
    try{
        let user
        let updateuser
        let userarr=[]
        const body={...req.body}
       const allUser=body.allUsers;
       //אופציה שהגינרוט מספר יהיה פה ולעשות בסוף את האפדייט
       const table=await addTable(body)
        //להוסיף לולאה שרצה על כל היוזרים בבאדי שרוצים להצטרף ולראות שהjoin game שלהם הוא פולס ומי שטרו להעיף ולעדכן
        for(i=0;i<allUser.length;i++)
        {
            user= await getUser(allUser[i]._id)
             user.code=table.code
             user.joinGame=true;
             updateuser=await updateUser(user._id,user)
             userarr.push(updateuser)
        }
        if(!table){
            return serverResponse(res, 404, { message: "no capble to create table"})
        }
               
        return serverResponse(res, 200, table+"and all thet users"+userarr)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to create new table'})
    }
}
const enterTableCont = async (req, res) => {
    try{
        const newUser = await getUser(req.params.userId)
        if(!newUser){
            return serverResponse(res, 404, { message: "no user exists with this ID"})
        }
        const newUsercode={"code":req.params.code}
        const user=await updateUser(req.params.userId,newUsercode)
        //update to user
        const table=await getTableByCode(req.params.code)
        if(!table){
            return serverResponse(res, 404, { message: "no capble to add newUser to table"})
        }
        const allUser=table.allUsers
        const body={"allUsers":{"_id":req.params.userId,allUser}}
        // const updatedTable = table.allUsers.push(user)
        const updatedtable = await updateTable(req.params.code,body)
        // const updatedTable = table.allUsers.push(user)
        // const newTable = table.updateTable(req.params.code, updatedTable)


        return serverResponse(res, 200, updatedtable)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to enter table or table not exsist'})
    }
}//בנוי חלקית (לשמור על היוזר הקודמים)
const deleteTableCont = async (req, res) => {
    try{
          
          //const userstochange= await getAllUsersWithSameCode(req.params.code)
          //const creatortochange= await getCreator(req.params.code)
        //    const table= await getTableByCode(req.params.code)
        //   TODO: get the table with the all users already populated
        //   TODO: go through all of the users with map 
        //   const usersWithoutTableCode = table.allUsers.map(async (user) => {
        //     let codeToChange={"code":0};
        //     await updateUser(user._id, user)
        //     //TODO: update every user with his specific code, dont forget to forward the whole user object and not only the code itself
        //   })
          // TODO:
          
          const removeTable = await removeTableByCode(req.params.code)
          //const table= await getTableByCode(req.params.code)
        if(!removeTable){
            return serverResponse(res, 404, { message: "no capble to remove  table"})
        }

        return serverResponse(res, 200, removeTable)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to remove Table'})
    }
}
const editTableCont = async (req, res) => {
    try{
        const body={...req.body}
        const updatedtable = await updateTable(req.params.code,body)
        const newTable= await getTableByCode(req.params.code)
        if(!updatedtable){
            return serverResponse(res, 404, { message: "no avilable to updated table "})
        }

        return serverResponse(res, 200, updatedtable)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to update table'})
    }
}
const getTopThreeCont = async (req, res) => { 
    try{
        let i=0;
        const topThree=[];
        const allUser= await getAllUsersWithSameCode(req.params.code)
        allUser.sort((a,b) => a.pointforgame -b.pointforgame);
        allUser.array.forEach(user => {
            if(i<3)
            {
            topThree.push(user); 
            i++
            }
        });
        
        // const table= await getTableByCode(req.params.code)
        // if(!table){
        //     return serverResponse(res, 404, { message: "no find the table "})
        // }
        // //fix it :)
        // const tableUsers=table.allUsers;
        // tableUsers.sort((a,b) => a.pointforgame -b.pointforgame);
        // const topThree = [tableUsers[0],tableUsers[1],tableUsers[2]]
       
        return serverResponse(res, 200, topThree)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to get top 3'})
    }
}//מיותר כי יש לי לזה אפדייט במשחק עצמו
module.exports = {
    getTableCont,
    getTableIdCont,
    createTableCont,
    enterTableCont,
    editTableCont,
    deleteTableCont,
    getTopThreeCont,
    getAllTablesCont

}