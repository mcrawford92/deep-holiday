var ResultDisplay = function (args) {
	Module.apply(this, arguments);

	var settings = {};

	$.extend(this.settings, settings);
	
	var $el = this.$el;
	var _ = this;

	return this;
};

	ResultDisplay.prototype = Object.create(Module.prototype);
	ResultDisplay.prototype.constructor = ResultDisplay;