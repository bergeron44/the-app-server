module.exports = function (app) {
    require('./Question-routes')(app)
    require('./Category-routes')(app)
    require('./Company-routes')(app)
    require('./Suggestion-routes')(app)
    require('./TheGame-routes')(app)
    require('./User-routes')(app)
    require('./UsersTable-routes')(app)
};
