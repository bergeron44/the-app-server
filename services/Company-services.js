const Company = require('../models/Company')

const getCompany = (companyId) => {
    return Company.findOne({_id: companyId})
}

const getAllCompanys = () => {
    return Company.find({})
}

const addCompany = async (companyObject) => {
    companyObject = new Company(companyObject)
    return companyObject.save()
}

const removeCompany = (companyId) => {
    return Company.findOneAndRemove({_id: companyId})
}

const removeAllCompanys = (companyListIds) => {
    companyListIds.forEach(companyId => {
        Company.findOneAndRemove({_id: companyId})
    })
}

const updateCompany = (companyId, newContent) => {
    return Company.findOneAndUpdate({_id:companyId}, newContent, {new:true})
}
const addPrizeToCompany = async (companyId,prize) => {
    Company.findOne({_id: companyId})._prizes.push(prize);
    return companyObject.save()
}
const deletePrizeToCompany = async (companyId,deletePrize) => {
    const newarr=[]
    for (const prize in Company.findOne({_id: companyId})._prizes) {
        if (prize!=deletePrize) {
            newarr.push(prize);            
        }
    }

    Company.findOne({_id: companyId})._prizes=newarr;
}
module.exports = {
    getCompany,
    getAllCompanys,
    addCompany,
    removeCompany,
    removeAllCompanys,
    updateCompany,
    addPrizeToCompany,
    deletePrizeToCompany,
}