
function Item(text, completed) {
	var self = this;
	if(typeof(text) == "undefined") {
		text = "";
	}
	
	if(completed !== true) {
		completed = false;
	}
	
	self.text = ko.observable(text);
	self.completed = ko.observable(completed);
	
	self.toggleCompleted = function() {
		self.completed(!self.completed());
	}
}


function ItemListViewModel() {
	var self = this;
	
	self.items = ko.observableArray([
		new Item("First Item"),
		new Item("Second Item", true),
		new Item("Another thing")
	]);
	
	self.addItem = function(root, event) {
		root.items.push(new Item($("#new-item-input").val()));
		$("#new-item-input").val('');
	}
	
	self.removeItem = function(item) {
		self.items.remove(item);
	}
	
}


ko.applyBindings(new ItemListViewModel());