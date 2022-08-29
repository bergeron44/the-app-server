const {
    getCategory,
    getAllObjectsWithSameAttribute,
    getAllCategorys,
    addCategory,
    removeCategory,
    removeAllCategorys,
    updateCategory
} = require('../services/Category-services')
const serverResponse = require('../utils/serverResponse')

const getCategoryCont = async (req, res) => {
    try{
        const category = await getCategory(req.params.categoryName)
        const {categoryName, categoryNumOfQuestion} = category
        if(!category){
            return serverResponse(res, 404, { message: "no category found"})
        }
        return serverResponse(res, 200, {categoryName, categoryNumOfQuestion})
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to get Category'})
    }
}
const deleteCategoryCont = async (req, res) => {
    try{
        const Category = await removeCategory(req.params.categoryName)

        if(!Category){
            return serverResponse(res, 404, { message: "the category dosent exsist"})
        }

        return serverResponse(res, 200,  { message: "category remove seccesfully"})
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to remove caegory'})
    }
}
const createCategoryCont = async (req, res) => {
    try{
        const newcate = {...req.body}
            if(newcate.categoryName==""){
             return serverResponse(res, 404, { message: "no capble to add new category becose you put no name"})
        }
        const categoryName=newcate.categoryName
        const category = await getCategory(categoryName)
             if(!category){
                const newcategory = await addCategory(newcate)
                if(!newcategory){
                    return serverResponse(res, 404, { message: "no capble to add new category"})
                }
                return serverResponse(res, 200,{ message: " the category : "+newcategory.categoryName+" was add seccefuly exsist"})
           }

        return serverResponse(res, 404, { message: "no capble to add new category becose the category : "+category.categoryName+" exsist"})
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to add category'})
    }
}
const editCategoryCont = async (req, res) => {
    try{
        const oldcategory= await getCategory(req.params.categoryName)
        if(!oldcategory){
            return serverResponse(res, 400, { message: "no category found"})
        }
        const newcate={...req.body};
        const newcategory = await updateCategory(oldcategory.categoryName,newcate);
        if(!newcategory){
            return serverResponse(res, 400, { message: "no able to update category "+req.params.categoryName+" with new name :  "+newcate.categoryName})
        }

        return serverResponse(res, 200, newcategory)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to update category'})
    }
}
const getAllCategoryNamesCont = async (req, res) => {
    try{
        const allCategories = await getAllCategorys()
        const arr=[]
        allCategories.forEach(({categoryName}) =>{arr.push(categoryName)})
        if(!allCategories){
            return serverResponse(res, 404, { message: "no capble to get all category's"})
        }

        return serverResponse(res, 200, arr)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to get all names from categorys'})
    }
}
const getAllCategoryNumOfGamesCont = async (req, res) => {
    try{
        const allcategory = await getAllCategorys()
        const arr=[]
        let i=0
        allcategory.forEach(category =>{arr.push(category.categoryNumOfQuestion)})
        if(!allcategory){
            return serverResponse(res, 404, { message: "no capble to get all category's"})
        }

        return serverResponse(res, 200, arr)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to get all num of qustion in category'})
    }
}
const getNumCategorysThetNumQuestionBelowfifthyCont = async (req, res) => {
    try{
        const allcategory = await getAllCategorys()
        const names=[]
        allcategory.forEach(category =>{
             if(category.categoryNumOfQuestion<50)
             {
                names.push(category.categoryName);
             }
            
        }
        )
        if(!allcategory){
            return serverResponse(res, 404, { message: "no capble to get all category's"})
        }

        return serverResponse(res, 200,{message: `${names.length} have below 50 the names: categories ${names}`})
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to get all num of qustion in category'})
    }
}

module.exports = {
    getCategoryCont,
    deleteCategoryCont,
    createCategoryCont,
    editCategoryCont,
    getAllCategoryNamesCont,
    getAllCategoryNumOfGamesCont,
    getNumCategorysThetNumQuestionBelowfifthyCont
}