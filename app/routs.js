App.Router = Backbone.Router.extend({
    routes:{
        ''            :   'index',
        'contact/*id' :   'contact'
    },
    index:function(){
        React.render(
            <App.Views.Contacts items={items}/>,
            document.body
        );
    },
    contact:function(id){
        React.render(
            <App.Views.Contact item={new App.Models.Contact} items={items} id = {id}/>,
            document.body
        );
    }

});

new App.Router();
Backbone.history.start();