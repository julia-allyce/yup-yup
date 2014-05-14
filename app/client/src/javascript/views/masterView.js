var view = module.exports = Backbone.View.extend({
	template: require('../templates/master'),
	childView: false,
	render: function () {
		this.$el.append(this.template());
		return this;
	},
	renderChildView: function(selector, view) {
		if(this[selector]) {
			this[selector].remove();
		}
		this[selector] = new view();
		this.$(selector).html(this[selector].render().el);
	}
});