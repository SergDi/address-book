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
