const {
    getAllPackages,
    getPackageId,
    getPackageByPrice,
    addPackages,
    removeAllPackagesFromList,
    removePackageById,
    removePackageByName,
    updatePackageById,
} = require('../services/Packages-services')
const serverResponse = require('../utils/serverResponse')

const getCategoryCont = async (req, res) => {
    try{
        const package = await getPackageId(req.params._id)
        const {categoryName, categoryNumOfQuestion} = category
        if(!category){
            return serverResponse(res, 404, { message: "no category found"})
        }
        return serverResponse(res, 200, {categoryName, categoryNumOfQuestion})
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occurred while trying to get Category'})
    }
}

const deleteCategoryCont = async (req, res) => {
    try{
        const category = await removeCategory(req.params.categoryName)

        if(!category){
            return serverResponse(res, 404, { message: "the category doesn't exist"})
        }

        return serverResponse(res, 200,  { message: "category removed successfully"})
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occurred while trying to remove category'})
    }
}

const createCategoryCont = async (req, res) => {
    try{
        const newCategoryData = {...req.body}
        if(newCategoryData.categoryName === ""){
            return serverResponse(res, 404, { message: "unable to add new category because you provided no name"})
        }

        const categoryName = newCategoryData.categoryName
        const category = await getCategory(categoryName)

        if(!category){
            const newCategory = await addCategory(newCategoryData)
            if(!newCategory){
                return serverResponse(res, 404, { message: "unable to add new category"})
            }
            return serverResponse(res, 200, newCategory)
        }

        return serverResponse(res, 200, category)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occurred while trying to add category'})
    }
}

const editCategoryCont = async (req, res) => {
    try{
        const oldCategory = await getCategory(req.params.categoryName)
        if(!oldCategory){
            return serverResponse(res, 400, { message: "no category found"})
        }

        const newCategoryData = {...req.body};
        const newCategory = await updateCategory(oldCategory.categoryName, newCategoryData);
        if(!newCategory){
            return serverResponse(res, 400, { message: `unable to update category ${req.params.categoryName} with new name: ${newCategoryData.categoryName}`})
        }

        return serverResponse(res, 200, newCategory)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occurred while trying to update category'})
    }
}

const editCategoryByIdCont = async (req, res) => {
    try{
        const oldCategory = await getCategoryById(req.params.categoryId)
        if(!oldCategory){
            return serverResponse(res, 400, { message: "no category found"})
        }

        const newCategoryData = {...req.body};
        const newCategory = await updateCategoryById(oldCategory._id, newCategoryData);
        if(!newCategory){
            return serverResponse(res, 400, { message: `unable to update category ${req.params.categoryName} with new name: ${newCategoryData.categoryName}`})
        }

        return serverResponse(res, 200, newCategory)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occurred while trying to update category'})
    }
}

const getAllCategoryNamesCont = async (req, res) => {
    try{
        const allCategories = await getAllCategories()
        const categoryNames = allCategories.map(category => category.categoryName)
        if(!allCategories){
            return serverResponse(res, 404, { message: "unable to get all categories"})
        }

        return serverResponse(res, 200, categoryNames)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occurred while trying to get all names from categories'})
    }
}

const getAllCategoriesCont = async (req, res) => {
    try{
        const allCategories = await getAllCategories()
       
        if(!allCategories){
            return serverResponse(res, 404, { message: "unable to get all categories"})
        }

        return serverResponse(res, 200, allCategories)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occurred while trying to get all names from categories'})
    }
}

const getAllCategoryNumOfGamesCont = async (req, res) => {
    try{
        const allCategories = await getAllCategories()
        const categoryNumOfGames = allCategories.map(category => category.categoryNumOfQuestion)
        if(!allCategories){
            return serverResponse(res, 404, { message: "unable to get all categories"})
        }

        return serverResponse(res, 200, categoryNumOfGames)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occurred while trying to get all num of questions in categories'})
    }
}

const getNumCategoriesThatNumQuestionBelowFiftyCont = async (req, res) => {
    try{
        const allCategories = await getAllCategories()
        const categoriesBelowFifty = allCategories.filter(category => category.categoryNumOfQuestion < 50)
        const categoryNamesBelowFifty = categoriesBelowFifty.map(category => category.categoryName)
        if(!allCategories){
            return serverResponse(res, 404, { message: "unable to get all categories"})
        }

        return serverResponse(res, 200, {message: `${categoriesBelowFifty.length} have below 50 questions. The categories are: ${categoryNamesBelowFifty}`})
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occurred while trying to get all num of questions in categories'})
    }
}

module.exports = {
    getCategoryCont,
    deleteCategoryCont,
    createCategoryCont,
    editCategoryCont,
    getAllCategoriesCont,
    getAllCategoryNamesCont,
    getAllCategoryNumOfGamesCont,
    getNumCategoriesThatNumQuestionBelowFiftyCont,
    editCategoryByIdCont
}
