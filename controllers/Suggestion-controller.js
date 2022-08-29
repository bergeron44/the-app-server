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
const getAllSuggestionCont = async (req, res) => {
    try{
        const suggestions = await getAllSuggestion()

        if(!suggestions){
            return serverResponse(res, 404, { message: "no Suggestion found"})
        }

        return serverResponse(res, 200, suggestions)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to get all Suggestion'})
    }
}
const deleteSuggestionCont = async (req, res) => {
    try{
        const suggestion = await removeSuggestion(req.params.suggestionId)

        if(!suggestion){
            return serverResponse(res, 404, { message: "no Suggestion found"})
        }

        return serverResponse(res, 200, suggestion)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to get Suggestion'})
    }
}
const createSuggestionCont = async (req, res) => {
    try{
        const sugg = {
            ...req.body,
          };
          const user=req.params.userName;
          const suggestion = await addSuggestion(sugg)
        if(!suggestion){
            return serverResponse(res, 404, { message: "no Suggestion found"})
        }

        return serverResponse(res, 200, { message: "thenk u very much {0} for the seggestion : {1}",user,suggestion} )
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to get Suggestion'})
    }
}


module.exports = {
    getSuggestionCont,
    deleteSuggestionCont,
    createSuggestionCont,
    getAllSuggestionCont

}