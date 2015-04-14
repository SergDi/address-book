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
