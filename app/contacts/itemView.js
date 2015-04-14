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


