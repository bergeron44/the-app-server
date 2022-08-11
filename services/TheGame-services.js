const TheGame = require('../models/TheGame')

const getTheGame = (theGameId) => {
    return TheGame.findOne({_id: theGameId})
}

const getAllTheGames = () => {
    return TheGame.find({})
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
const getTheGameSize = () => {
    return TheGame.findOne({_id: theGameId})._gameDefintin
}
const getTheGameCompany = () => {
    return TheGame.findOne({_id: theGameId})._location
}
const getTheGameTable = () => {
    return TheGame.findOne({_id: theGameId})._allUsersInTheTable
}
const getTheGameQuestion = () => {
    return TheGame.findOne({_id: theGameId})._theGameQuestion
}
const getTheGameWinnersTable = () => {
    return TheGame.findOne({_id: theGameId})._winnersTable
}
const getTheGamePrizes = () => {
    return TheGame.findOne({_id: theGameId})._gamePrizes
}
const setTheGameSize = (newgamesize) => {
     TheGame.findOne({_id: theGameId})._gameDefintin=newgamesize
}
const setTheGameCompany = (newgamecompany) => {
     TheGame.findOne({_id: theGameId})._location=newgamecompany
}
const setTheGameTable = (newgametable) => {
     TheGame.findOne({_id: theGameId})._allUsersInTheTable=newgametable
}
const setTheGameQuestions = (newGameQuestions) => {
     TheGame.findOne({_id: theGameId})._theGameQuestion=newGameQuestions
}
const setTheGameWinnersTable = (newwinnersTable) => {
     TheGame.findOne({_id: theGameId})._winnersTable=newwinnersTable
}
const setTheGamePrizes = (newgamePrizes) => {
     TheGame.findOne({_id: theGameId})._gamePrizes=newgamePrizes
}


module.exports = {
    getTheGame,
    getAllTheGames,
    getBulkTheGames,
    addTheGame,
    removeTheGame,
    removeAllTheGames,
    updateTheGame,
    getTheGameSize,
    getTheGameCompany,
    getTheGameTable,
    getTheGameQuestion,
    getTheGameWinnersTable,
    getTheGamePrizes,
    setTheGameSize,
    setTheGameCompany,
    setTheGameTable,
    setTheGameQuestions,
    setTheGameWinnersTable,
    setTheGamePrizes,
}