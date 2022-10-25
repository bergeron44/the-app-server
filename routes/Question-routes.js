const {
    getQuestionCont,
    getAllQuestionCont,
    editQustionCont,
    newQuestionCont,
    deleteQuestionCont,
    getNumQuestionWithSameCtegoryCont,
    checkAnswer,
    getQuestionsWithSameCategoryCont
} = require('../controllers/Question-controller')

module.exports = function (app){
    app
        .get('/api/question/:questionId', getQuestionCont)
        .get('/api/questions', getAllQuestionCont)
        .get('/api//questions/:categoryName/:numOfQuestion', getNumQuestionWithSameCtegoryCont)//לא סיימתי
        .get('/api/questions/category/:categoryName', getQuestionsWithSameCategoryCont)
        .post('/api/question/:questionId/edit',editQustionCont)
        .post('/api/question/create',newQuestionCont)
        .post('/api/question/:questionId/trueAnswer',checkAnswer)
        .delete('/api/question/:questionId/delete',deleteQuestionCont );
        
};