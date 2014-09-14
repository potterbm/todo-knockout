
function Item(text) {
	this.text = text;
	this.completed = false;
}


function ItemListViewModel() {
	var self = this;
	
	self.items = ko.observableArray([
		new Item("First Item"),
		new Item("Second Item")
	]);
	
	self.addItem = function(data, event) {
		console.log(data);
		console.log(event);
	}
	
	
}


ko.applyBindings(new ItemListViewModel());