var ResultControls = function (args) {
	Module.apply(this, arguments);

	var settings = {};

	$.extend(this.settings, settings);
	
	var $el = this.$el;
	var _ = this;

	return this;
};

	ResultControls.prototype = Object.create(Module.prototype);
	ResultControls.prototype.constructor = ResultControls;