const userController = function(){
    const getLogin = function(ctx){
        this.loadPartials({
            header: './templates/header.hbs',
            footer: './templates/footer.hbs'
        }).then(function(result){
            this.partial('./templates/login.hbs');
        });
    };

    const postLogin = function(ctx){
        //params
        let username = ctx.params.username;
        let password = ctx.params.pass;

        userModel.login(username, password).then(function(data){
            storage.saveUser(data);
            ctx.redirect('#/');
            notifications.showInfo('Login successful!')
        }).catch((err)=>{notifications.showError(err)});
    };

    const logout = function(ctx){
        userModel.logout().then(function(){
            storage.deleteUser();
            
            ctx.redirect('#/');
            notifications.showInfo('Logout successful!')
        }).catch((err)=>{notifications.showError(err)});
    }

    const getRegister = function(ctx) {
        this.loadPartials({
            header: './templates/header.hbs',
            footer: './templates/footer.hbs'
        }).then(function(result){
            this.partial('./templates/register.hbs');
        });
    };

    const postRegister = function(ctx) {
        userModel.register(ctx.params).then(function(data){
            storage.saveUser(data);

            //do some logic

            ctx.redirect('#/');
            notifications.showInfo('Registration successful!')
        }).catch((err)=>{notifications.showError(err)});
    }

    return {
        getLogin,
        postLogin,
        logout,
        getRegister,
        postRegister
    };
}();