const {
    getTheGameCont,
    getAllTheGameCont,
    updateWinnersforTheGameCont,
    updateQustionforTheGameCont,
    updateLocationforTheGameCont,
    updateTableforTheGameCont,
    updateSizeforTheGameCont,
    updateTheGameCont,
    deleteTheGameCont,
    createNewGameCont,

} = require('../controllers/TheGame-controller')
const {
    endGameCont
} = require('../controllers/GameEnd-controller')

module.exports = function (app){
    app
        .get('/api/game/:theGameId', getTheGameCont)
        .get('/api/games', getAllTheGameCont)
        .post('/api/game/:theGameId/update', updateTheGameCont)
        .post('/api/game/:theGameId/gameSize/update', updateSizeforTheGameCont)
        .post('/api/game/create', createNewGameCont)
        .delete('/api/game/:theGameId/delete', deleteTheGameCont)
        .post('/api/game/:theGameId/endGame', endGameCont)
        
}