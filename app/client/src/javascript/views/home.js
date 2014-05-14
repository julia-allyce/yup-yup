module.exports = Backbone.View.extend({
	template: require('../templates/assests'),
	render: function () {
		this.$el.append(this.template());
		return this;
	}
})