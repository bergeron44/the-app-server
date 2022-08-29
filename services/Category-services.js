const Category = require('../models/Category')
//import Question from '../models/Question'

const getCategory= (categoryName) => {
    return Category.findOne({categoryName})

}
const getAllObjectsWithSameAttribute= (attribute, whatToCheck) => {
    return Category.find({[attribute]: whatToCheck})
}//get an attribute and bring baeck all the objects with the same attribute

const getAllCategorys = () => {
    return Category.find({})
}

const addCategory =(categoryObject) =>{
    categoryObject = new Category(categoryObject)
    return categoryObject.save()
}

const removeCategory = (categoryName) => {
    return Category.findOneAndRemove({categoryName})
}

const removeAllCategorys = (categoryListNames) => {
    categoryListNames.forEach(categoryName => {
        Category.findOneAndRemove({categoryName})
    })
}


const updateCategory = (categoryName, newContent) => {
    return Category.findOneAndUpdate({categoryName}, newContent, {new:true})
}

module.exports = {
    getCategory,
    getAllCategorys,
    addCategory,
    removeCategory,
    removeAllCategorys,
    updateCategory,
    getAllObjectsWithSameAttribute,
}