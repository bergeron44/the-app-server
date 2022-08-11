const {
    getSuggestion,
    getAllSuggestion,
    getBulkSuggestions,
    addSuggestion,
    removeSuggestion,
    removeAllSuggestions,
    updateSuggestion,
} = require('../services/Suggestion-services')
const serverResponse = require('../utils/serverResponse')

const getSuggestionCont = async (req, res) => {
    try{
        const suggestion = await getSuggestion(req.params.suggestionId)

        if(!suggestion){
            return serverResponse(res, 404, { message: "no Suggestion found"})
        }

        return serverResponse(res, 200, suggestion)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to get Suggestion'})
    }
}

module.exports = {
    getSuggestionCont
}