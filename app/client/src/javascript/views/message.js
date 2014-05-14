module.exports = Backbone.View.extend({
	template: require('../templates/message'),
	initialize: function () {
	},
	render: function () {
		this.$el.append(this.template(this.model.toJSON()));
		return this;
	}
})