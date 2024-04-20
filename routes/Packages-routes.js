const {
    getCategoryCont,
    deleteCategoryCont,
    createCategoryCont,
    editCategoryCont,
    getAllCategorysCont,
    getAllCategoryNamesCont,
    getAllCategoryNumOfGamesCont,
    getNumCategorysThetNumQuestionBelowfifthyCont,
    editCategoryByIdCont
} = require('../controllers/Category-controller')

module.exports = function (app) {
    app
        .get('/api/category/:categoryName', getCategoryCont)
        .get('/api/categorys', getAllCategorysCont)
        .get('/api/categorys/numOfGames', getAllCategoryNumOfGamesCont)
        .get('/api/categorys/under50', getNumCategorysThetNumQuestionBelowfifthyCont)
        .post('/api/category/:categoryName/edit/name',editCategoryCont)
        .post('/api/category/:categoryId/edit',editCategoryByIdCont)
        .post('/api/category/create',createCategoryCont)
        .delete('/api/category/:categoryName/delete',deleteCategoryCont)
        
}