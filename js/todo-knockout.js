

function Item(text, completed) {
	var self = this;
	
	if(typeof(text) == "object") {
		if(text.text) {
			self.text = text.text;
		}
		else {
			self.text = "";
		}
		
		if(text.completed && text.completed === true) {
			self.completed = true;
		}
		else {
			self.completed = false;
		}
	}
	
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
	
	self.items = ko.observableArray([]);
	
	self.addItem = function(data, event) {
		self.items.push(new Item($("#new-item-input").val()));
		$("#new-item-input").val('');
		
		self.save();
	}
	
	self.removeItem = function(item) {
		self.items.remove(item);
		
		self.save();
	}
	
	self.initStorage = function() {
		try {
			self.storage = window.localStorage;
		} catch(e) {
			self.storage = false;
		}
	}
	
	self.load = function() {
		if(self.storage === false) {
			return;
		}
		
		var data = self.storage.getItem("ko-list");
		
		if(typeof(data) != "undefined") {
			self.items($.map(JSON.parse(data), function(item) { return new Item(item); }));
		}
	}
	
	self.save = function() {
		if(self.storage === false) {
			return;
		}
		
		storage.setItem("ko-list", ko.toJSON(self.items));
	}
	
	
	self.initStorage();
	self.load();
	
	self.items.subscribe(function() {
		self.save();
	});
}


ko.applyBindings(new ItemListViewModel());