const { 
    getUserCont,
    getAllUserCont,
    createUserCont,
    deleteUserCont,
    editUserCont,
    removeBulkUsersCont,
    getAllUsersWithMatchCodeCont,
    setCurrentGameCodeCont,
    addToGameNumberOfPointCont,
} = require('../controllers/User-controller')

module.exports = function (app) {
    app
        .get('/api/user/:userId', getUserCont)
        .get('/api/users', getAllUserCont)
        .get('/api/users/code/:code', getAllUsersWithMatchCodeCont)
        .post('/api/user/create', createUserCont)
        .post('/api/user/:userId/edit', editUserCont)
        .post('/api/user/:userId/addNumberOfPoint', addToGameNumberOfPointCont)
        .post('/api/user/:userId/setCode', setCurrentGameCodeCont)
        .delete('/api/users/deleteBulk', removeBulkUsersCont)
        .delete('/api/user/:userId/delete', deleteUserCont)
        
}