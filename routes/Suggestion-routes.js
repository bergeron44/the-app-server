const {
    getSuggestionCont,
    deleteSuggestionCont,
    createSuggestionCont,
    getAllSuggestionCont
} = require('../controllers/Suggestion-controller')

module.exports = function (app) {
    app
        .get('/api/suggestion/:suggestionId', getSuggestionCont)
        .get('/api/suggestions', getAllSuggestionCont)
        .delete('/api/suggestion/:suggestionId/delete',deleteSuggestionCont)
        .post('/api/suggestion/create', createSuggestionCont)
        
}