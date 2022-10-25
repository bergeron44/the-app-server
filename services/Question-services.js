const Category = require('../models/Category')
const Question = require('../models/Question')

const getQuestion = (questionId) => {
    return Question.findOne({_id: questionId})
}

const getAllQuestions = () => {
    return Question.find({})
}

const getBulkQuestions = (questionsIdsList) => {
    const questionList = []
    questionsIdsList.forEach(questionId => {
        const q = Question.findOne({_id: questionId})
        questionList.push(q)
    })
    return questionList
}

const addQuestion = async (questionObject) => {
    questionObject = new Question(questionObject)
    return questionObject.save()
}

const removeQuestion = (questionId) => {
    return Question.findOneAndRemove({_id: questionId})
}

const removeAllQuestions = (questionListIds) => {
    questionListIds.forEach(questionId => {
        Question.findOneAndRemove({_id: questionId})
    })
}
    
const updateQuestion = (questionId, newContent) => {
    return Question.findOneAndUpdate({_id:questionId}, newContent, {new:true})
}

const getAllObjectsWithSameAttribute= (attribute,whatToCheck) => {
   return Question.find({[attribute]: whatToCheck})
}//get an attribute and bring baeck all the objects with the same attribute
const getAllQuestionsWithSameCategory= (category) => {
    return Question.find({category:category})
 }

const getNumObjectsWithSameAttribute= (whatToCheck,num) => {
    return Question.aggregate([{$match:{Category:whatToCheck}},{$sample:{size:num}}])
   // return Category.find({[attribute]: whattocheck}).limit(num)
}//get an attribute and bring baeck random num of objects with the same attribute



module.exports = {
    getQuestion,
    getAllQuestions,
    getBulkQuestions,
    addQuestion,
    removeQuestion,
    removeAllQuestions,
    updateQuestion,
    getAllObjectsWithSameAttribute,
    getNumObjectsWithSameAttribute,
    getAllQuestionsWithSameCategory
}