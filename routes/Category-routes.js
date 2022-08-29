const {
    getCategoryCont,
    deleteCategoryCont,
    createCategoryCont,
    editCategoryCont,
    getAllCategoryNamesCont,
    getAllCategoryNumOfGamesCont,
    getNumCategorysThetNumQuestionBelowfifthyCont
} = require('../controllers/Category-controller')

module.exports = function (app) {
    app
        .get('/api/category/:categoryName', getCategoryCont)
        .get('/api/categorys', getAllCategoryNamesCont)
        .get('/api/categorys/numOfGames', getAllCategoryNumOfGamesCont)
        .get('/api/categorys/under50', getNumCategorysThetNumQuestionBelowfifthyCont)
        .post('/api/category/:categoryName/edit',editCategoryCont)
        .post('/api/category/create',createCategoryCont)
        .delete('/api/category/:categoryName/delete',deleteCategoryCont)
        
}