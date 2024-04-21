module.exports = function (app) {
    require('./Questions-routes')(app)
    require('./User-routes')(app)
    require('./Bars-routes')(app)
    require('./DailyStatistic-routes')(app)
    require('./Packages-routes')(app)
};
