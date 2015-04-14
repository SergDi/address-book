(function() {

    window.App = {
        Models:{},
        Collection:{},
        Views:{},
        Router:{}
    };

})();

/**
 * @jsx React.DOM
 */
var BackboneMixin = {
    componentDidMount: function() {
        this.getBackboneModels().forEach(function(model) {
            model.on('add change remove save', this.forceUpdate.bind(this, null), this);
        }, this);
    },

    componentWillUnmount: function() {
        this.getBackboneModels().forEach(function(model) {
            model.off(null, null, this);
        }, this);
    }
};




App.Views.Contact = React.createClass({
    mixins: [BackboneMixin],
    getInitialState: function(){
        return{
            firstName:'',
            lastName:'',
            phone:'',
            email:'',
            birthdayData: '',
            note:'',
            isChecked:false,
            isFavorite:false
        };
    },
    componentDidMount: function() {
       var item =  this.props.items.findWhere({'id':this.props.id});
        if(item)
        this.setState({
            firstName:item.get('firstName'),
            lastName:item.get('lastName'),
            phone:item.get('phone'),
            email:item.get('email'),
            birthdayData: item.get('birthdayData'),
            note:item.get('note'),
            isChecked:item.get('isChecked'),
            isFavorite:item.get('isFavorite')})
    },
    getBackboneModels: function() {
        return [this.props.item];
    },
    onChangeFirstName:function(e){
        this.setState({firstName:e.target.value})
    },
    onChangeLastName:function(e){
        this.setState({lastName:e.target.value})
    },
    onChangePhone:function(e){
        this.setState({phone:e.target.value})
    },
    onChangeEmail:function(e){
        this.setState({email:e.target.value})
    },
    onChangeBirthdayData:function(e){
        this.setState({birthdayData:e.target.value})
    },
    onChangeNote:function(e){
        this.setState({note:e.target.value})
    },
    handleFavorite: function(e) {
        this.setState({isFavorite:!this.state.isFavorite})
    },
    handleSubmit: function(e){
        //e.preventDefault();

        dataItem = {
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            phone:this.state.phone,
            email:this.state.email,
            birthdayData: this.state.birthdayData,
            note:this.state.note,
            isChecked:false,
            isFavorite:this.state.isFavorite};


        if(this.state.firstName != '')
        {
            var items = this.props.items;
            if(this.props.id){
                var item =  this.props.items.findWhere({'id':this.props.id});
                item.save(dataItem);
            }
            else{
            var newItem = this.props.item;

            items.add(newItem);
            newItem.save(dataItem);
            }

            this.setState({
                firstName:'',
                lastName:'',
                phone:'',
                email:'',
                birthdayData: '',
                note:'',
                isChecked:false,
                isFavorite:false})
        }

    },
    render : function() {
        if (this.state.isFavorite) {
            var classFavorite = 'mdi-action-favorite';
        }
        else {
            classFavorite = 'mdi-action-favorite-outline';
        }
        return(<div className="container">
            <div className="col-lg-6">

                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3 className="panel-title">Контакт</h3>
                    </div>
                    <div className="panel-body">
                        <form  >
                            <div className="row">

                                <div className="col-lg-10 text-left">
                                    <strong>{this.state.firstName} {this.state.lastName}</strong>
                                    <br/>
                                    {this.state.phone}
                                </div>
                                <div className="col-lg-2 text-right ">
                                    <input onClick={this.handleFavorite} type="checkbox" checked={this.state.isFavorite} hidden><i className={classFavorite}></i></input>
                                </div>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Имя" value={this.state.firstName}  onChange={this.onChangeFirstName}/>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Фамилия" value={this.state.lastName}  onChange={this.onChangeLastName}/>
                            </div>
                            <div className="form-group">
                                <input type="number" className="form-control" placeholder="Телефон" value={this.state.phone}  onChange={this.onChangePhone}/>
                            </div>
                            <div className="form-group">
                                <input type="email" className="form-control" id="Email" placeholder="Почта" value={this.state.email}  onChange={this.onChangeEmail}/>
                            </div>
                            <div className="form-group">
                                <input type="date" className="form-control" id="BirthdayData" placeholder="Дата рождения"  value={this.state.birthdayData}  onChange={this.onChangeBirthdayData}/>
                            </div>
                            <div className="form-group">
                                <textarea className="form-control" rows="3" placeholder="Примечание" value={this.state.note}  onChange={this.onChangeNote}></textarea>
                            </div>
                            <a  className="btn btn-default btn-xs" href="#">Закрыть</a>
                            <a type="submit" className="btn btn-primary btn-xs" href="#" onClick={this.handleSubmit}>Сохранить</a>
                        </form>
                    </div>
                </div>

            </div>
        </div>)
    }
});

App.Views.Contacts = React.createClass({
    mixins: [BackboneMixin],
    getInitialState: function(){
        return{
            filterText:''
        };
    },
    getBackboneModels: function() {
        return [this.props.items];
    },

    handleFilterInput: function(filterText){
        this.setState({filterText:filterText})
    },
    render : function() {
        return(<div className="container">
            <div className="jumbotron vertical-center center-block">
                <div className="panel-body">
                    <a className="btn btn-primary btn-xs" href="#contact/">Создать Контакт</a>
                    <App.Views.SearchBar onFilterInput={this.handleFilterInput} filterText={this.props.filterText}/>
                    <App.Views.TableItems filterText={this.state.filterText}  items={this.props.items} />
                </div>
            </div>
        </div>
        )
    }
});

App.Views.SearchBar = React.createClass({
    handleChange: function() {
        this.props.onFilterInput(
            this.refs.filterTextInput.getDOMNode().value
        );
    },
    render: function() {
        return( <div className="form-group">
            <form >
                <input type="text" className="form-control" placeholder="Поиск" ref="filterTextInput" value={this.props.filterText} onChange={this.handleChange}/>
            </form>
        </div>
        )
    }
});

App.Views.TableItems = React.createClass({
    getInitialState: function(){
        return{items: this.props.items};
    },
    sort:function(i){
        var newItems = this.state.items;
        newItems.sort_key = i;
        newItems.sort();
        this.setState({items: newItems});
    },
    setFavorite: function(item){
       var newItem = this.props.items.at(item.index);
        newItem.set("isFavorite", !newItem.get("isFavorite"));
        newItem.save();
    },
    render: function() {
        var props = this.props;
        var rows = this.state.items
        .filter(function(item) {
                return item.get("firstName").toLocaleLowerCase().indexOf(props.filterText.toLocaleLowerCase()) > -1
                    ||  item.get("lastName").toLocaleLowerCase().indexOf(props.filterText.toLocaleLowerCase()) > -1
                    ||  item.get("phone").toLocaleLowerCase().indexOf(props.filterText.toLocaleLowerCase()) > -1})
        .map(function(item, index){
            return <App.Views.Item
                key={index}
                index={index}
                id={item.get('id')}
                firstName={item.get('firstName')}
                lastName={item.get('lastName')}
                phone={item.get('phone')}
                isFavorite={item.get('isFavorite')}
                onItemDelete={item.destroy.bind(item)}
                onItemFavorite={this.setFavorite}
                />

            }, this);
        return (<div>
            <table className="table table-striped table-hover table-condensed">
                <thead>
                <tr>
                    <th onClick={this.sort.bind(null, "firstName")}>Имя</th>
                    <th onClick={this.sort.bind(null, "lastName")}>Фамилия</th>
                    <th onClick={this.sort.bind(null, "phone")}>Телефон</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </table>

        </div>)

    }
});

App.Views.Item = React.createClass({
    handleDelete: function(e) {
        this.props.onItemDelete(this.props);
    },
    handleFavorite: function(e) {
        this.props.onItemFavorite(this.props);
    },
    render: function() {
        if (this.props.isFavorite) {
            var classFavorite = 'mdi-action-favorite';
        }
        else {
            classFavorite = 'mdi-action-favorite-outline';
        }
        var url = "#contact/"+this.props.id;

        return (

            <tr>
                <td>{this.props.firstName}</td>
                <td>{this.props.lastName}</td>
                <td>{this.props.phone}</td>
                <td>
                    <span onClick={this.handleFavorite}><i className={classFavorite}></i></span>
                </td>
                <td>
                    <a href={url}><i className="mdi-content-create"></i></a>
                </td>
                <td>
                    <span onClick={this.handleDelete}><i className="mdi-content-clear"></i></span>
                </td>

            </tr>)
    }
});



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