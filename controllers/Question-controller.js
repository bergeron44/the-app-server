const {
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

} = require('../services/Question-services')
const {getCategory,addCategory, updateCategory} = require('../services/Category-services')
const serverResponse = require('../utils/serverResponse')

const getQuestionCont = async (req, res) => {
    try{
        const question = await getQuestion(req.params.questionId)

        if(!question){
            return serverResponse(res, 404, { message: "no question found"})
        }

        return serverResponse(res, 200, question)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to get Question'})
    }
}
const getAllQuestionCont = async (req, res) => {
  try{
      const allquestion = await getAllQuestions()

      if(!allquestion){
          return serverResponse(res, 404, { message: "no question found"})
      }

      return serverResponse(res, 200, allquestion)
  } catch(e){
      console.log(e)
      return serverResponse(res, 500, {message: 'internal error occured while trying to get all Questions'})
  }
}
const editQustionCont = async (req, res) => {
    try {
      const newquestion={...req.body}
      if (newquestion=={}) {
        return serverResponse(res, 404, {
          message: 'No qustion send to update'
        });
      }
      const question = await updateQuestion(req.params.questionId, newquestion);
     
      if (!question) {
        return serverResponse(res, 404, {
          message: 'No question with requested id'
        });
      }
      const questionAfterUpdate = await getQuestion(req.params.questionId);
      return serverResponse(res, 200, {
        message: 'Your changes were successfull  your udate --'+questionAfterUpdate
      });
    } catch (e) {
      return serverResponse(res, 500, {
        message: 'Internal error while trying to update Question'
      });
    }
  };
  const newQuestionCont = async (req, res) => {
    try {
      let newCatedory
      let returnCategory
      const question = {
        ...req.body
      };
       const category= await getCategory(req.body.category)
      if(!category)
      {
        newCatedory= await addCategory({"categoryName":req.body.category,"CategoryNumOfQuestion":1})
        returnCategory=await getCategory(req.body.category)
  
      }
      else
      {//להוסיף לו אחד
        category.categoryNumOfQuestion=category.categoryNumOfQuestion+1;
        newCatedory=await updateCategory(category.categoryName,category);
        returnCategory=await getCategory(req.body.category)
      }
      const newQuestion = await addQuestion(question);
      if(!newQuestion)
      {
        return serverResponse(res, 500, {
          message: 'not able to  add new qustion'
        })
      }
      return serverResponse(res, 200, {
        message: ' the qustion category== '
      +returnCategory +" the qustion is"+ newQuestion });
    } catch (e) {
      return serverResponse(res, 500, {
        message: 'Internal error while trying to add new qustion '
      });
    }
  };
  const deleteQuestionCont = async (req, res) => {
    try {
       const qustion= await getQuestion(req.params.questionId)
       if (!qustion) {
            return serverResponse(res, 404, { message: "qustion remove alredy" });
         }
        const category= await getCategory(qustion.category)
        category.categoryNumOfQuestion=category.categoryNumOfQuestion-1;
        const updateCategor=await updateCategory(category.categoryName,category)
         const remove = await removeQuestion(req.params.questionId);
  
      return serverResponse(res, 200,  {
        message: 'question :'+remove+"  delete and category :"+updateCategor+"  was update"
      });
    } catch (e) {
      return serverResponse(res, 500, {
        message: 'interrnel error tring to delete'
      });
    }
  };
  const getNumQuestionWithSameCtegoryCont = async (req, res) => {
    try{
        const numofqustionwithsamecategory = await getNumObjectsWithSameAttribute(req.params.categoryName, req.params.numOfQuestion)

        if(!numofqustionwithsamecategory){
            return serverResponse(res, 404, { message: "no able to get random question from thet category"})
        }


        return serverResponse(res, 200, numofqustionwithsamecategory)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to get Questions from same category random'})
    }
}
const checkAnswer = async (req, res) => {
  try{
      const question=await getQuestion(req.params.questionId);
      if(!question){
        return serverResponse(res, 404, { message: "no able to fing the question whith thet id"})
    }
     let rightAnswer
     if(question.answer1.rightAnswer)
         {
          rightAnswer=question.answer1.answer
         }
     if(question.answer2.rightAnswer)
         {
          rightAnswer=question.answer2.answer
         }
     if(question.answer3.rightAnswer)
         {
          rightAnswer=question.answer3.answer
         }
     if(question.answer4.rightAnswer)
         {
          rightAnswer=question.answer4.answer
         }
       
      
      return serverResponse(res, 200, {message: 'this the right answer : '+rightAnswer} )
  } catch(e){
      console.log(e)
      return serverResponse(res, 500, {message: 'internal error occured while trying to get Questions from same category random'})
  }
}
const getQuestionsWithSameCategoryCont =async(req, res)=>{
  try{
    const allQuestionWithSameCategory = await getAllQuestionsWithSameCategory(req.params.categoryName)

    if(!allQuestionWithSameCategory){
        return serverResponse(res, 404, { message: "no questions in thet category found"})
    }

    return serverResponse(res, 200, allQuestionWithSameCategory)
} catch(e){
    console.log(e)
    return serverResponse(res, 500, {message: 'internal error occured while trying to get all Questions'})
}
}




module.exports = {
    getQuestionCont,
    getAllQuestionCont,
    editQustionCont,
    newQuestionCont,
    deleteQuestionCont,
    getNumQuestionWithSameCtegoryCont,
    checkAnswer,
    getQuestionsWithSameCategoryCont
}