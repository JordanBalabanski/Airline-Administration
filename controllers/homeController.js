const homeController = function () {
    const index = async function (ctx) {
        ctx.loggedIn = storage.getData('authToken');
        if (!!storage.getData('userInfo')) {
            ctx.username = storage.getData('userInfo').username;

            await flightsModel.viewCatalog().then(function (result) {
                console.log(result);
                ctx.flights = result;
            }).catch((err) => {
                notifications.showError(err)
            });
        }
        
                this.loadPartials({
                    header: './templates/header.hbs',
                    footer: './templates/footer.hbs',
                    viewCatalog: './templates/viewCatalog.hbs'
                }).then(function () {
                    this.partial('./templates/home.hbs');
                });
    };

    return {
        index
    };
}();