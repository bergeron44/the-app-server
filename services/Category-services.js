const Category = require('../models/Category')
//import Question from '../models/Question'

const getCategory = (categoryId) => {
    return Category.findOne({_id: categoryId})
}

const getAllCategorys = () => {
    return Category.find({})
}

const getBulkCategorys = (categorysIdsList) => {
    const categoryList = []
    categorysIdsList.forEach(categoryId => {
        const q = Category.findOne({_id: categoryId})
        categoryList.push(q)
    })
    return categoryList
}

const addCategory = async (categoryObject) => {
    categoryObject = new Category(categoryObject)
    return categoryObject.save()
}

const removeCategory = (categoryId) => {
    return Category.findOneAndRemove({_id: categoryId})
}

const removeAllCategorys = (categoryListIds) => {
    categoryListIds.forEach(categoryId => {
        Category.findOneAndRemove({_id: categoryId})
    })
}

const updateCategory = (categoryId, newContent) => {
    return Category.findOneAndUpdate({_id:categoryId}, newContent, {new:true})
}
const getAllCategoryQuestions = (categoryId) => {
    
    return Category.findOne({_id: categoryId}).CategoryAllQuestion
}
const addQuestionToCategory = (categoryId,question) => {
    
    Category.findOne({_id: categoryId}).CategoryAllQuestion.push(question) 
}
const deleteQuestionToCategory = (categoryId,questionId) => {
    const newcategoryquestionarr=[]
    Category.findOne({_id: categoryId}).CategoryAllQuestion.forEach((question)=>{
      if(question._id!=questionId)
      newcategoryquestionarr.push(question)
    })
    return Category.findOne({_id: categoryId}).CategoryAllQuestion=newcategoryquestionarr

}


module.exports = {
    getCategory,
    getAllCategorys,
    getBulkCategorys,
    addCategory,
    removeCategory,
    removeAllCategorys,
    updateCategory,
    getAllCategoryQuestions,
    addQuestionToCategory,
    deleteQuestionToCategory,
}