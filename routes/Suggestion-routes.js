const {getQuestionCont} = require('../controllers/Question-controller')

module.exports = (app) {
    app
        .get('/api/question/:questionId', getQuestionCont)
        .get('/api/question/allQuestions', controller)
        
}