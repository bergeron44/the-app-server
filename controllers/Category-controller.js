const {
    getCategory,
    getAllCategorys,
    getBulkCategorys,
    addCategory,
    removeCategory,
    removeAllCategorys,
    updateCategory
} = require('../services/Category-services')
const serverResponse = require('../utils/serverResponse')

const getCategoryCont = async (req, res) => {
    try{
        const category = await getCategory(req.params.categoryId)

        if(!category){
            return serverResponse(res, 404, { message: "no category found"})
        }

        return serverResponse(res, 200, category)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to get Category'})
    }
}

module.exports = {
    getCategoryCont
}