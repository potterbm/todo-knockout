
function Item(text, completed) {
	var self = this;
	if(typeof(text) == "undefined") {
		text = "";
	}
	
	console.log(completed);
	if(completed !== true) {
		completed = false;
	}
	
	self.text = ko.observable(text);
	self.completed = ko.observable(completed);
	
	console.log(self.completed());
	
	self.toggleCompleted = function() {
		self.completed(!self.completed());
	}
	
	console.log(self.completed());
}


function ItemListViewModel() {
	var self = this;
	
	self.items = ko.observableArray([
		new Item("First Item"),
		new Item("Second Item", true),
		new Item()
	]);
	
	self.addItem = function(root, event) {
		root.items.push(new Item($(event.target).siblings("input").val()));
		$(event.target).siblings("input").val('');
	}
	
	self.removeItem = function(item) {
		self.items.remove(item);
	}
	
}


ko.applyBindings(new ItemListViewModel());