
    const {
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
        setTheGamePrizes
    } = require('../services/TheGame-services')
    const serverResponse = require('../utils/serverResponse')
    
    const getTheGameCont = async (req, res) => {
        try{
            const thegame = await getTheGame(req.params.thegameId)
    
            if(!thegame){
                return serverResponse(res, 404, { message: "no Game found"})
            }
    
            return serverResponse(res, 200, thegame)
        } catch(e){
            console.log(e)
            return serverResponse(res, 500, {message: 'internal error occured while trying to get TheGame'})
        }
    }
    
    module.exports = {
        getTheGameCont
    }