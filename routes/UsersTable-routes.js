const {getUsersTableCont} = require('../controllers/UsersTable-controller')

module.exports = (app) {
    app
        .get('/api/question/:tserstableId', getQuestionCont)
        .get('/api/question/allUsersTables', controller)
        
}