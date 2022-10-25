
    const {
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
    } = require('../services/TheGame-services')

    const {
        sortAllUsersPoint
        } = require('../services/UserTable-services')
        
    const serverResponse = require('../utils/serverResponse')
    
    const getTheGameCont = async (req, res) => {
        try{
            const thegame = await getTheGame(req.params.theGameId)
    
            if(!thegame){
                return serverResponse(res, 404, { message: "no Game found"})
            }
    
            return serverResponse(res, 200, thegame)
        } catch(e){
            console.log(e)
            return serverResponse(res, 500, {message: 'internal error occured while trying to get TheGame'})
        }
    }
    const getAllTheGameCont = async (req, res) => {
        try{
            const allTheGames = await getAllTheGames()
    
            if(!allTheGames){
                return serverResponse(res, 404, { message: "no Game found"})
            }
    
            return serverResponse(res, 200, allTheGames)
        } catch(e){
            console.log(e)
            return serverResponse(res, 500, {message: 'internal error occured while trying to get TheGame'})
        }
    }
    //למחוק אחרי שאלה
   
    const updateQustionforTheGameCont = async (req, res) => {
        try{
            const thegame = await getTheGame(req.params.theGameId)
            
            if(!thegame){
                return serverResponse(res, 404, { message: "no Game found"})
            }
            thegame.theGameQuestions={"theGameQuestions":req.params.gameQuestions};
            const newgame=updateTheGame(req.params.theGameId,thegame);
            if(!newgame){
                return serverResponse(res, 404, { message: "no able to create new Game "})
            }
            return serverResponse(res, 200, thegame)
        } catch(e){
            console.log(e)
            return serverResponse(res, 500, {message: 'internal error occured while trying to get TheGame'})
        }
    }
    const updateLocationforTheGameCont = async (req, res) => {
        try{
            const thegame = await getTheGame(req.params.theGameId)
    
            if(!thegame){
                return serverResponse(res, 404, { message: "no Game found"})
            }
            thegame.location={"location":req.body.company};
            const newgame=updateTheGame(req.params.theGameId,thegame);
            if(!newgame){
                return serverResponse(res, 404, { message: "no able to create new Game "})
            }
    
            return serverResponse(res, 200, thegame)
        } catch(e){
            console.log(e)
            return serverResponse(res, 500, {message: 'internal error occured while trying to get TheGame'})
        }
    }
    const updateTableforTheGameCont = async (req, res) => {
        try{
            const thegame = await getTheGame(req.params.theGameId)
    
            if(!thegame){
                return serverResponse(res, 404, { message: "no Game found"})
            }
            thegame.table={"table":req.params.table};
            const newgame=updateTheGame(req.params.theGameId,thegame);
            if(!newgame){
                return serverResponse(res, 404, { message: "no able to create new Game "})
            }
    
            return serverResponse(res, 200, thegame)
        } catch(e){
            console.log(e)
            return serverResponse(res, 500, {message: 'internal error occured while trying to get TheGame'})
        }
    }
    const updateSizeforTheGameCont = async (req, res) => {
        try{
            const thegame = await getTheGame(req.params.theGameId)
    
            if(!thegame){
                return serverResponse(res, 404, { message: "no Game found"})
            }
            thegame.gameSize={"gameSize":req.body.gameSize};
            const newgame=updateTheGame(req.params.theGameId,thegame);
            if(!newgame){
                return serverResponse(res, 404, { message: "no able to create new Game "})
            }
    
            return serverResponse(res, 200, newgame)
        } catch(e){
            console.log(e)
            return serverResponse(res, 500, {message: 'internal error occured while trying to get TheGame'})
        }
    }
    const updateWinnersforTheGameCont = async (req, res) => {
        try{
            const theGame = await getTheGame(req.params.theGameId)
            if(!theGame){
                return serverResponse(res, 404, { message: "no Game found"})
            }
            const gameTable=theGame.table
            const sortedUsersPoint =await sortAllUsersPoint(gameTable.code)
             if(sortAllUsersPoint.length>=3)
             {
            const topThree=[sortedUsersPoint[0],sortedUsersPoint[1],sortedUsersPoint[2]];
            theGame.winnersTable=topThree;
             }
             else
             {
                return serverResponse(res, 404, { message: "there is less the 3 players "})
             }
          //option   theGame.table.allUsers=sortedUsersPoint
            const newGame=updateTheGame(req.params.theGameId,theGame);
            if(!newGame){
                return serverResponse(res, 404, { message: "no able to update winners table "})
            }
            return serverResponse(res, 200, newGame)
        } catch(e){
            console.log(e)
            return serverResponse(res, 500, {message: 'internal error occured while trying to update winners in TheGame'})
        }
    }
    const startTheGameCont = async (req, res) => {
        try{
            const theGame = await getTheGame(req.params.theGameId)
            if(!theGame){
                return serverResponse(res, 404, { message: "no Game found"})
            }
            let i=0;
            theGame.table.allUsers.forEach(user =>{
                if(i<3)
                {
                    theGame.winnersTable.push(user)
                    i++;
                }
            })
            theGame.gameStart=true;

          //option   theGame.table.allUsers=sortedUsersPoint
            const newGame=updateTheGame(req.params.theGameId,theGame);
            if(!newGame){
                return serverResponse(res, 404, { message: "no able to update winners table "})
            }
            return serverResponse(res, 200, newGame)
        } catch(e){
            console.log(e)
            return serverResponse(res, 500, {message: 'internal error occured while trying to update winners in TheGame'})
        }
    }//כנראה לא צרייך כי יש create לשאול
    //עד לפה למחוק
    const updateTheGameCont = async (req, res) => {
        try{
            const thegameUpdate = req.body;
            const newgame=await updateTheGame(req.params.theGameId,thegameUpdate);
            if(!newgame){
                return serverResponse(res, 404, { message: "no able to update new Game "})
            }
            const gameToReturn= await getTheGame(req.params.theGameId);
            return serverResponse(res, 200, gameToReturn)
        } catch(e){
            console.log(e)
            return serverResponse(res, 500, {message: 'internal error occured while trying to update TheGame'})
        }
    }
   
    const deleteTheGameCont = async (req, res) => {
        try{
            const thegame = await removeTheGame(req.params.theGameId)
    //צריך למחוק גם את השולחן
            if(!thegame){
                return serverResponse(res, 404, { message: "no Game found"})
            }
    
            return serverResponse(res, 200,{message: 'TheGame delete secssesfuly'})
        } catch(e){
            console.log(e)
            return serverResponse(res, 500, {message: 'internal error occured while trying to delete TheGame'})
        }
    }
    const createNewGameCont = async (req, res) => {
        try{
            const newgame={...req.body}
            const theGame = await addTheGame(newgame);
            if(!theGame){
                return serverResponse(res, 404, { message: "no able to create new game"})
            }
            const gameToReturn=await getTheGame(theGame._id)
           
            // theGame.winnersTable=[theGame.table.allUsers[0],theGame.table.allUsers[1],theGame.table.allUsers[2]]
            // theGame.gameStart=true;
            // const gameToReturn=await updateTheGame(theGame._id,theGame)
            // return serverResponse(res, 200, gameToReturn)
            return serverResponse(res, 200, gameToReturn)
        } catch(e){
            console.log(e)
            return serverResponse(res, 500, {message: 'internal error occured while trying to create a new game '})
        }
    }
    
    module.exports = {
        getTheGameCont,
        updateTheGameCont,
        getAllTheGameCont,
        updateWinnersforTheGameCont,
        updateQustionforTheGameCont,
        updateLocationforTheGameCont,
        updateTableforTheGameCont,
        updateSizeforTheGameCont,
        deleteTheGameCont,
        createNewGameCont,
        startTheGameCont
    }