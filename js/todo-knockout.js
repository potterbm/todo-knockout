
function Item(text, completed) {
	var self = this;
	if(typeof(text) == "undefined") {
		text = "";
	}
	
	if(typeof(completed) == "undefined") {
		completed = false;
	}
	
	self.text = ko.observable(text);
	self.completed = ko.observable(false);
	
	self.toggleCompleted = function() {
		self.completed(!self.completed());
	}
}


function ItemListViewModel() {
	var self = this;
	
	self.items = ko.observableArray([
		new Item("First Item"),
		new Item("Second Item", true),
		new Item()
	]);
	
	self.addItem = function(root, event) {
		console.log(root.items);
		console.log(Item);
		root.items.add(new Item($(event.target).siblings("input").val()));
		$(event.target).siblings("input").val('');
	}
	
	self.removeItem = function(item) {
		self.items.remove(item);
	}
	
}


ko.applyBindings(new ItemListViewModel());