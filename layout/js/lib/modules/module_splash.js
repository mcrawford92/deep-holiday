var Splash = function (args) {
	Module.apply(this, arguments);

	var settings = {};

	$.extend(this.settings, settings);
	
	var $el = this.$el;
	var _ = this;

	return this;
};

	Splash.prototype = Object.create(Module.prototype);
	Splash.prototype.constructor = Splash;