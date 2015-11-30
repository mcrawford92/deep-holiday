var ResultChoiceList = function (args) {
	Module.apply(this, arguments);

	var settings = {};

	$.extend(this.settings, settings);
	
	var $el = this.$el;
	var _ = this;

	return this;
};

	ResultChoiceList.prototype = Object.create(Module.prototype);
	ResultChoiceList.prototype.constructor = ResultChoiceList;