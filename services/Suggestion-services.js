const Suggestion = require('../models/Suggestion')

const getSuggestion = (suggestionId) => {
    return Suggestion.findOne({_id: suggestionId})
}

const getAllSuggestion = () => {
    return Suggestion.find({})
}

const getBulkSuggestions = (suggestionIdsList) => {
    const suggestionList = []
    suggestionsIdsList.forEach(suggestionId => {
        const q = Suggestion.findOne({_id: suggestionId})
        suggestionList.push(q)
    })
    return suggestionList
}

const addSuggestion = async (suggestionObject) => {
    suggestionObject = new Suggestion(suggestionObject)
    return suggestionObject.save()
}

const removeSuggestion = (suggestionId) => {
    return Suggestion.findOneAndRemove({_id: suggestionId})
}

const removeAllSuggestions = (suggestionListIds) => {
    suggestionListIds.forEach(suggestionId => {
        Suggestion.findOneAndRemove({_id: suggestionId})
    })
}

const updateSuggestion = (suggestionId, newContent) => {
    return Suggestion.findOneAndUpdate({_id:suggestionId}, newContent, {new:true})
}

module.exports = {
    getSuggestion,
    getAllSuggestion,
    getBulkSuggestions,
    addSuggestion,
    removeSuggestion,
    removeAllSuggestions,
    updateSuggestion,
}