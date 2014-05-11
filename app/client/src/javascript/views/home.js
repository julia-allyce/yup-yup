module.exports = Backbone.View.extend({
	template: require('../templates/landingpage'),
	render: function () {
		this.$el.append(this.template());
		return this;
	}
})