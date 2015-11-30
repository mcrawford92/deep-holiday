var DecisionNavigation = function (args) {
	Module.apply(this, arguments);

	var settings = {};

	$.extend(this.settings, settings);
	
	var $el = this.$el;
	var _ = this;

	return this;
};

	DecisionNavigation.prototype = Object.create(Module.prototype);
	DecisionNavigation.prototype.constructor = DecisionNavigation;