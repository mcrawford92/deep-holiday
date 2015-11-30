var Page_Results = function (args, el, Page_Choice) {
	Page.apply(this, arguments);

	var settings = {
		animationSpeed : 1
	};

	$.extend(this.settings, settings);
	
	var $el = this.$el;
	var _ = this;

	this.init = function (Page_Choice) {
		this.Decision = Page_Choice;
		this.a_SlideIn();
	}

	//Animations


	//Utilities

	this.init(Page_Choice);

	return this;
};

	Page_Results.prototype = Object.create(Page.prototype);
	Page_Results.prototype.constructor = Page_Results;