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
        return serverResponse(res, 500, {message: 'internal error occured while trying to get table by code'})
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
        return serverResponse(res, 500, {message: 'internal error occured while trying to get table id'})
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
               
        return serverResponse(res, 200, table)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to create new table'})
    }
}
const enterTableCont = async (req, res) => {
    try{
        let exsist=false;
        const newUser = await getUser(req.params.userId)
        if(!newUser){
            return serverResponse(res, 404, { message: "no user exists with this ID"})
        }
        const newUsercode={"code":req.params.code}
        const userToAdd=await updateUser(req.params.userId,newUsercode)
        //update to user
        const table=await getTableByCode(req.params.code)
        if(!table){
            return serverResponse(res, 404, { message: "no capble to find the table"})
        }
        table.allUsers.forEach(user=>{
            if(user._id==userToAdd._id)
               exsist=true;
        })
        if(!exsist)
        {
            table.allUsers.push({_id:userToAdd._id})
        }
       else
       {
        return serverResponse(res, 404, { message: "user is in the table allready"})
       }
        const updatedtable = await updateTable(req.params.code,table)
        // const updatedTable = table.allUsers.push(user)
        // const newTable = table.updateTable(req.params.code, updatedTable)


        return serverResponse(res, 200, {updatedtable:updatedtable,newUser:userToAdd})
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to enter table'})
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
        const table= await getTableByCode(req.params.code)
        if(!table)
        {
            return serverResponse(res, 500, {message: 'table dosent exsist'})  
        }
        let allUser= table.allUsers
        if(allUser.length==0)
        {
            return serverResponse(res, 500, {message: 'no winner becouse there is no player'})
        }
        allUser.sort((a,b) => a.pointforgame -b.pointforgame);
        allUser.forEach(user => {
            if(i<3)
            {
            topThree.push(user); 
            i++
            }
        });
        return serverResponse(res, 200, topThree)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to get top 3'})
    }
}//מיותר כי יש לי לזה אפדייט במשחק עצמו
const getTheWinnerCont = async (req, res) => { 
    try{
        const table= await getTableByCode(req.params.code)
        if(!table)
        {
            return serverResponse(res, 500, {message: 'table dosent exsist'})  
        }
        let allUser= table.allUsers
        if(allUser.length==0)
        {
            return serverResponse(res, 500, {message: 'no winner becouse there is no player'})
        }
        allUser.sort((a,b) => a.pointforgame -b.pointforgame);
        const winner=allUser[0];
        return serverResponse(res, 200, winner)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to get the winner'})
    }
}
module.exports = {
    getTableCont,
    getTableIdCont,
    createTableCont,
    enterTableCont,
    editTableCont,
    deleteTableCont,
    getTopThreeCont,
    getAllTablesCont,
    getTheWinnerCont

}