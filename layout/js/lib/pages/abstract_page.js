//Abstract class for pages
var Page = function(args, el) {
	this.settings = {
		animations : true,
		pageTitle : "Abstract"
	};

	this.$el = el || null;
	if (this.$el == null) {
		throw new Error("Element is equal to null");
	}
	$.extend(this.settings, args);

	this.Events = Events.getInstance();
};

	Page.prototype.log = function () {
		console.log(this.settings.pageTitle);
	};
