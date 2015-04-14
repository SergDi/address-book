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
