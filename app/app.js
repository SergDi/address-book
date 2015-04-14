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



