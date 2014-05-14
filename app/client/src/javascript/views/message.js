module.exports = Backbone.View.extend({
	template: require('../templates/message'),
	initialize: function () {
	},
	render: function () {
		var direction = this.model.get('direction');
		if(direction == 'incoming')
			this.model.set('animation', 'slideInLeft');
		else
			this.model.set('animation', 'slideInRight');
		this.$el.append(this.template(this.model.toJSON()));
		return this;
	}
})