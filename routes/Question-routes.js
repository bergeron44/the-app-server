const {
    getQuestionCont,
    getAllQuestionCont,
    editQustionCont,
    newQuestionCont,
    deleteQuestionCont,
    getNumQuestionWithSameCtegoryCont,
    checkAnswer
} = require('../controllers/Question-controller')

module.exports = function (app){
    app
        .get('/api/question/:questionId', getQuestionCont)
        .get('/api/questions', getAllQuestionCont)
        .get('/api//questions/:categoryName/:numOfQuestion', getNumQuestionWithSameCtegoryCont)//לא סיימתי
        .post('/api/question/:questionId/edit',editQustionCont)
        .post('/api/question/create',newQuestionCont)
        .post('/api/question/:questionId/trueAnswer',checkAnswer)
        .delete('/api/question/:questionId/delete',deleteQuestionCont );
        
};