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
