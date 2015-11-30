//Interactive Page Objects
var Module = function(args, el) {
		this.settings = {
			title : "Page Object",
			animated : true,
			interactive : true
		};

		this.$el = el || null;
		if (this.$el == null) {
			throw new Error("Element is equal to null");
		}
		$.extend(this.settings, args);
	};

	Module.prototype.log = function() {
		console.log("Page Object: " + this.settings.title);
	};
	
	Module.prototype.animate = function () {
		throw new Error("What are you doing? I'm still abstract.");
	};
	
	Module.prototype.stopAnimation = function() {
		throw new Error("What are you doing? I'm still abstract.");
	};

	Module.prototype.handleEvent = function(args) {
		throw new Error("What are you doing? I'm still abstract.");
	};