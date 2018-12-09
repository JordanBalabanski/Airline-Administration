const app = Sammy('#container', function () {
    this.use('Handlebars', 'hbs');

    this.get('#/', homeController.index)

    this.get('#/register', userController.getRegister);
    this.post('#/register', userController.postRegister);

    this.get('#/login', userController.getLogin);
    this.post('#/login', userController.postLogin);

    this.get('#/logout', userController.logout);

    this.get('#/add-flight', flightController.getAddFlight);
    this.post('#/add-flight', flightController.postAddFlight);

    this.get('#/details/:id', flightController.getFlightDetails);

    this.get('#/my-flights', flightController.getMyFlights);

    this.get('#/edit/:id', flightController.getEditFlight);
    this.put('#/edit/:id', flightController.postEditFlight);

    this.get('#/remove-flight/:id', flightController.removeFlight);

});

$(function () {
    app.run('#/');
});