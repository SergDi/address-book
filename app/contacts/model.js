App.Models.Contact = Backbone.Model.extend({
      defaults: {
            firstName:'',
            lastName:'',
            phone:'',
            email:'',
            birthdayData: '',
            note:'',
            isChecked:false,
            isFavorite:false
      },
    validate: function(attrs, options) {
        if (!attrs.firstName) {
            return "Обязательно для заполнения";
        }
    }

});


App.Collection.Contacts = Backbone.Collection.extend({
    initialize: function() {
        this.sort_key = 'firstName';
    },
    comparator: function(a, b) {
        a = a.get(this.sort_key);
        b = b.get(this.sort_key);
        return a > b ?  1
            : a < b ? -1
            :          0;
    },
    model: App.Models.Contact,

    localStorage: new Store('react-backbone')
   });

var items = new App.Collection.Contacts();
items.fetch();



