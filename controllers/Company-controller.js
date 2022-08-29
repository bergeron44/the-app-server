const {
    getCompany,
    getAllCompanys,
    addCompany,
    removeCompany,
    removeAllCompanys,
    updateCompany,
    getCompanyByName,
    getAllObjectsWithSameAttribute
} = require('../services/Company-services')
const serverResponse = require('../utils/serverResponse')

const getCompanyCont = async (req, res) => {
    try{
        const company = await getCompany(req.params.companyId)
        if(!company){
            return serverResponse(res, 404, { message: "no company found"})
        }
        const {companyName, prizes,location,numberOfPlayers,numberOfGameMonth,numberOfGameOverAll,qrAdvertisement} = company
        // const companyname=company.companyName;
        // const companyprizes=company.prizes;
        // const companylocation=company.location;
        // const companynumberofplayers=company.numberOfPlayers;
        // const companynumberofgamemonthe=company.numberOfGameMonth;
        // const companynumofgamealltime=company.numberOfGameOverAll;
        // const companyqradvertisment=company.qrAdvertisement;

        return serverResponse(res, 200, {companyName, prizes,location,numberOfPlayers,numberOfGameMonth,numberOfGameOverAll,qrAdvertisement})
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to get company informtion'})
    }
}
const getCompanyByNameCont = async (req, res) => {
    try{
        const company = await getCompanyByName(req.params.companyName)
        if(!company){
            return serverResponse(res, 404, { message: "no company found"})
        }
        const {companyName, prizes,location,numberOfPlayers,numberOfGameMonth,numberOfGameOverAll,qrAdvertisement} = company

        return serverResponse(res, 200, {companyName, prizes,location,numberOfPlayers,numberOfGameMonth,numberOfGameOverAll,qrAdvertisement})
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to get company informtion'})
    }
}
const getAllCompanysCont = async (req, res) => {
    try{
        const companys = await getAllCompanys()
        if(!companys){
            return serverResponse(res, 404, { message: "no company found"})
        }

        return serverResponse(res, 200, companys)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to get company informtion'})
    }
}
const createCompanyCont = async (req, res) => {
    try{
        const company = {...req.body}
        if(company.companyName==""){
             return serverResponse(res, 404,{message: "the body isent good :"+company.companyName} )
         }
        const newCompany = await addCompany(company);
        if(!newCompany){
            return serverResponse(res, 404, { message: "no new company found"})
        }

        return serverResponse(res, 200, newCompany)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to create new Company '})
    }
}
const deleteCompanyCont = async (req, res) => {
    try{
        const deleteCompany = await removeCompany(req.params.companyId);
        if(!deleteCompany){
            return serverResponse(res, 404, { message: "no company found to delete"})
        }

        return serverResponse(res, 200, { message: "able to  delete this company :__"+deleteCompany})
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to delete company '})
    }
}
const editCompanyCont = async (req, res) => {
    try{
        const newobject={...req.body}
        const editCampony = await updateCompany(req.params.companyId,newobject);
        if(!editCampony){
            return serverResponse(res, 404, { message: "no company found"})
        }
         const newCompany= await getCompany(req.params.companyId);
        return serverResponse(res, 200, newCompany)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to update Company'})
    }

}
const addPrizeToCompanyCont = async (req, res) => {
    try{
        const company=await getCompany(req.params.companyId)
        if(!company){
            return serverResponse(res, 404, { message: "no company found"})
        }
        const newPrizes=req.body.newPrizes;

        newPrizes.forEach(prize=>{
            company.prizes.push(prize);
        })
        //מוסיף את הפרסים
        const newCompany= await updateCompany(req.params.companyId,company) 
        //מעדכן את החברה לאחר הוספת הפרסים
        return serverResponse(res, 200, newCompany)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to add prize to  Company'})
    }
}
const deletePrizeToCompanyCont = async (req, res) => {
    try{
        const company= await getCompany(req.params.companyId)
        if(!company){
            return serverResponse(res, 404, { message: "no company found"})
        }
        const deletePrizes=req.body.deletePrizes;
        let newprizes=[]
        let find=false;
        if(company.prizes.length==0)
        {
            return serverResponse(res, 404, { message: "no able to delete prizes becouse the compant have no prizes"})
        }

        company.prizes.forEach(prize =>{ 
            deletePrizes.forEach(prizeToDelete =>{
             if (prize.toLowerCase() === prizeToDelete.toLowerCase()) 
             {
                find=true;            
            }
        })
            if(!find)
            {
                newprizes.push(prize);
                
            }
            find=false;
         } )
         company.prizes=newprizes;
         const newCompany=await updateCompany(req.params.companyId,company)
        
        if(!newCompany){
            return serverResponse(res, 404, { message: "no able to update  prizes after delete"})
        }

        return serverResponse(res, 200, newCompany)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to delete prize from  Company'})
    }
}
module.exports = {
    getCompanyCont,
    getCompanyByNameCont,
    getAllCompanysCont,
    createCompanyCont,
    deleteCompanyCont,
    editCompanyCont,
    addPrizeToCompanyCont,
    deletePrizeToCompanyCont

}