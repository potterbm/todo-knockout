
function Item(text, completed) {
	console.log(text);
	console.log(completed);
	
	this.text = ko.observable(text);
	this.completed = ko.observable(false);
}


function ItemListViewModel() {
	var self = this;
	
	self.items = ko.observableArray([
		new Item("First Item"),
		new Item("Second Item", true),
		new Item()
	]);
	
	self.addItem = function(root, event) {
		console.log(root);
		console.log(event);
	}
	
	
}


ko.applyBindings(new ItemListViewModel());