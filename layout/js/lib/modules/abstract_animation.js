//Abstract class for animations
var Animation = function(args, el) {
		this.settings = {
			animate : true,
			animationSpeed : 0.4,
			delay : 200,
			animationSpeed_MouseFollow : 100,
			states : null,
		};

		this.$el = el || null;
		if (this.$el == null) {
			throw new Error("Element is equal to null");
		}
		$.extend(this.settings, args);
	};

	Animation.prototype.log = function() {
		console.log("Working!");
	};
	
	Animation.prototype.animate = function () {
		throw new Error("What are you doing? I'm still abstract.");
	};
	
	Animation.prototype.stopAnimation = function() {
		throw new Error("What are you doing? I'm still abstract.");
	};

	Animation.prototype.handleEvent = function(args) {
		throw new Error("What are you doing? I'm still abstract.");
	};