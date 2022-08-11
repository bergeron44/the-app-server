const {
    getQuestion,
    getAllQuestions,
    getBulkQuestions,
    addQuestion,
    removeQuestion,
    removeAllQuestions,
    updateQuestion
} = require('../services/Question-services')
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

module.exports = {
    getQuestionCont
}