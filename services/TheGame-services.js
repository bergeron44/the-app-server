const TheGame = require('../models/TheGame')

const getTheGame = (theGameId) => {
    return TheGame.findOne({_id: theGameId})
        .populate('location')
        .populate('theGameQuestions')
        .populate('winnersTable')
        .populate({path:'table',populate:{path:'allUsers',path:'creator'}})
}

const getAllTheGames = () => {
    return TheGame.find({})
    .populate('location')
    .populate('theGameQuestions')
    .populate('winnersTable')
    .populate({path:'table',populate:{path:'allUsers'}})
}

const getBulkTheGames = (theGameListIds) => {
    const theGameList = []
    theGameListIds.forEach(theGameId => {
        const q = TheGame.findOne({_id: theGameId})
        theGameList.push(q)
    })
    return theGameList
}

const addTheGame = async (theGameObject) => {
    theGameObject = new TheGame(theGameObject)
    return theGameObject.save()
}

const removeTheGame = (theGameId) => {
    return TheGame.findOneAndRemove({_id: theGameId})
}

const removeAllTheGames = (theGameListIds) => {
    theGameListIds.forEach(theGameId => {
        TheGame.findOneAndRemove({_id: theGameId})
    })
}

const updateTheGame = (theGameId, newContent) => {
    return TheGame.findOneAndUpdate({_id:theGameId}, newContent, {new:true})
}
const getTheGameCompany = (theGameId) => {
    const game= TheGame.findOne({_id: theGameId})
    return game.populate('location')
}
const getTheGameTable = (theGameId) => {
    const game= TheGame.findOne({_id: theGameId})
    return game.populate('table')
}
const getTheGameQuestion = (theGameId) => {
    const game= TheGame.findOne({_id: theGameId})
    return game.populate('theGameQuestions')
}
const getTheGameWinners = (theGameId) => {
    const game= TheGame.findOne({_id: theGameId})
    return game.populate('winnersTable')
}
const getAllGamessWithSameattribute = (attribute,whatMatch) => {
    return TheGame.find({[attribute]:whatMatch})
}
const removeAllGamessWithSameAttribute = (attribute,whatMatch) => {
    
        return TheGame.findAndRemove({[attribute]: whatMatch})
    
}


module.exports = {
    getTheGame,
    getAllTheGames,
    getBulkTheGames,
    addTheGame,
    removeTheGame,
    removeAllTheGames,
    updateTheGame,
    getTheGameCompany,
    getTheGameTable,
    getTheGameQuestion,
    getAllGamessWithSameattribute,
    removeAllGamessWithSameAttribute,
}