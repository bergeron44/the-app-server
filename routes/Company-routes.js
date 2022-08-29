const { 
    getCompanyCont,
    createCompanyCont,
    deleteCompanyCont,
    editCompanyCont,
    addPrizeToCompanyCont,
    deletePrizeToCompanyCont,
    getAllCompanysCont,
    getCompanyByNameCont
} = require('../controllers/Company-controller')

module.exports = function (app) {
    app
        .get('/api/company/:companyId', getCompanyCont)
        .get('/api/company/:companyName', getCompanyByNameCont)
        .get('/api/companys', getAllCompanysCont)
        .post('/api/company/create', createCompanyCont)
        .post('/api/company/:companyId/edit', editCompanyCont)
        .post('/api/company/:companyId/Prizes/add', addPrizeToCompanyCont)
        .delete('/api/company/:companyId/delete', deleteCompanyCont)
        .delete('/api/company/:companyId/prizes/deletePrize', deletePrizeToCompanyCont)//לא סיימתי

        
}