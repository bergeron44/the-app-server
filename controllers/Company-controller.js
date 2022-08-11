const {
    getCompany,
    getAllCompanys,
    addCompany,
    removeCompany,
    removeAllCompanys,
    updateCompany,
    addPrizeToCompany,
    deletePrizeToCompany
} = require('../services/Company-services')
const serverResponse = require('../utils/serverResponse')

const getCompanyCont = async (req, res) => {
    try{
        const company = await getCompany(req.params.companyId)

        if(!company){
            return serverResponse(res, 404, { message: "no company found"})
        }

        return serverResponse(res, 200, company)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to get Company'})
    }
}

module.exports = {
    getCompanyCont
}