var Page_Main = function (args) {
	Page.apply(this, arguments);

	var settings = {};

	$.extend(this.settings, settings);
	
	var $el = this.$el;
	var _ = this;

	return this;
};

	Page_Main.prototype = Object.create(Page.prototype);
	Page_Main.prototype.constructor = Page_Main;