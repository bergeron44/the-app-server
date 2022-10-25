const
 {
    getTableCont,
    createTableCont,
    enterTableCont,
    editTableCont,
    deleteTableCont,
    getTopThreeCont,
    getTableIdCont,
    getAllTablesCont,
    getTheWinnerCont
} = require('../controllers/UsersTable-controller')

module.exports = function (app) {
    app
        .get('/api/table/:code', getTableCont)
        .get('/api/table/id/:tableId', getTableIdCont)
        .get('/api/tables', getAllTablesCont)
        .get('/api/table/:code/top', getTopThreeCont)
        .get('/api/table/:code/winner', getTheWinnerCont)
        .post('/api/table/create', createTableCont)
        .post('/api/table/:code/edit', editTableCont)
        .post('/api/table/:code/:userId/enterGame', enterTableCont)
        .delete('/api/table/:code/delete', deleteTableCont)
        
}