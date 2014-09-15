

function Item(text, completed) {
	var self = this;
	
	if(typeof(text) == "object") {
		self.parseObject(text);
	}
	
	else if(typeof(text) == "undefined") {
		self.text = ko.observable("");
		self.completed = ko.observable(false);
	}
	
	else {
		self.text = ko.observable(text);
		self.completed = ko.observable(completed === true);
	}
	
	self.toggleCompleted = function() {
		self.completed(!self.completed());
	}
	
	self.parseObject = function(object) {
		if(object.text) {
			self.text = ko.observable(object.text);
		}
		else {
			self.text = ko.observable("");
		}
		
		self.completed = ko.observable(object.completed && object.completed === true);
	}
}


function ItemListViewModel() {
	var self = this;
	
	self.items = ko.observableArray([]);
	
	self.addItem = function(data, event) {
		self.items.push(new Item($("#new-item-input").val()));
		$("#new-item-input").val('');
	}
	
	self.removeItem = function(item) {
		self.items.remove(item);
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
		
		if(data && typeof(data) != "undefined") {
			self.items($.map(JSON.parse(data), function(item) { return new Item(item); }));
		}
	}
	
	self.save = function() {
		if(self.storage === false) {
			return;
		}
		
		self.storage.setItem("ko-list", ko.toJSON(self.items));
	}
	
	
	self.initStorage();
	self.load();
	
	self.items.subscribe(function() {
		self.save();
	});
}


ko.applyBindings(new ItemListViewModel());