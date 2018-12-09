const flightController = function () {
    const getAddFlight = function (ctx) {
        ctx.loggedIn = storage.getData('authToken');
        ctx.username = storage.getData('userInfo').username;

        this.loadPartials({
            header: './templates/header.hbs',
            footer: './templates/footer.hbs'
        }).then(function (result) {
            this.partial('./templates/addFlight.hbs');
        });
    }

    const postAddFlight = function (ctx) {
        flightsModel.addFlight(ctx.params).done(function (result) {
            ctx.redirect('#/');
        });
    }

    const getFlightDetails = async function (ctx) {

        await flightsModel.viewFlightDetails(ctx.params.id).done(function (result) {
            ctx.loggedIn = storage.getData('authToken');
            ctx.username = storage.getData('userInfo').username;
            let currentUserId = storage.getData('userInfo').id;
            let creatorId = result._acl.creator;
            ctx.creator = currentUserId === creatorId;
            ctx.id = result._id;
            ctx.destination = result.destination;
            ctx.origin = result.origin;
            ctx.departureDate = result.departureDate;
            ctx.departureTime = result.departureTime;
            ctx.image = result.image;
            ctx.seats = result.seats;
            ctx.costPerSeat = result.costPerSeat;
        });

        this.loadPartials({
            header: './templates/header.hbs',
            footer: './templates/footer.hbs'
        }).then(function () {
            this.partial('./templates/flightDetails.hbs');
        });
    }

    const getMyFlights = async function(ctx){
        ctx.loggedIn = storage.getData('authToken');
        if (!!storage.getData('userInfo')) {
            ctx.username = storage.getData('userInfo').username;
        }
        let id = storage.getData('userInfo').id;
        await flightsModel.viewMyFlights(id).then(function(result){
            ctx.flights = result;
        }).catch((err)=>{notifications.showError(err)});


        this.loadPartials({
            header: './templates/header.hbs',
            footer: './templates/footer.hbs'
        }).then(function () {
            this.partial('./templates/myFlights.hbs');
        });
    }

    const getEditFlight = async function(ctx){
        await flightsModel.viewFlightDetails(ctx.params.id).done(function (result) {
            ctx.loggedIn = storage.getData('authToken');
            ctx.username = storage.getData('userInfo').username;
            ctx.destination = result.destination;
            ctx.origin = result.origin;
            ctx.departureDate = result.departureDate;
            ctx.departureTime = result.departureTime;
            ctx.image = result.image;
            ctx.seats = result.seats;
            ctx.costPerSeat = result.costPerSeat;
        });

        this.loadPartials({
            header: './templates/header.hbs',
            footer: './templates/footer.hbs'
        }).then(function () {
            this.partial('./templates/editFlight.hbs');
        });
    }

    const postEditFlight = function(ctx){
        flightsModel.editFlight(ctx.params, ctx.params.id).then(function () {
            ctx.redirect('#/');
            notifications.showInfo('Edit successful!')
        }).catch((err)=>{notifications.showError(err)});
    }

    const removeFlight = async function(ctx){
        await flightsModel.deleteFlight(ctx.params.id).then(function(){
            ctx.redirect('#/');
            notifications.showInfo('Flight deleted!');
        }).catch((err)=>{notifications.showError(err)});
    }

    return {
        getAddFlight,
        postAddFlight,
        getFlightDetails,
        getMyFlights,
        getEditFlight,
        postEditFlight,
        removeFlight
    }
}();