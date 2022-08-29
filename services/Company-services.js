const Company = require('../models/Company')

const getCompany = (companyId) => {
    return Company.findOne({_id: companyId})
}
const getCompanyByName = (name) => {
    return Company.findOne({companyName: name})
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
const getAllObjectsWithSameAttribute= (attribute,whatToCheck) => {
    return Category.find({[attribute]: whatToCheck})
}//not work

module.exports = {
    getCompany,
    getAllCompanys,
    addCompany,
    removeCompany,
    removeAllCompanys,
    updateCompany,
    getAllObjectsWithSameAttribute,
    getCompanyByName
}