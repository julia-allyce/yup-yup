module.exports = Backbone.View.extend({
	template: require('../templates/menu'),
	render: function () {
		this.$el.append(this.template({
			menuItems: [
				'@JuliaAllyce',
				'@LizPoladsky',
				'@Polad',
				'@AnotherUser'
			]
		}));
		return this;
	}
})