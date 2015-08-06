var AppDispatcher = require('../dispatcher/dispatcher.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var searchResults = [];
var playlist = [];
var currentTrack = {};

var endCurrentTrack = function() {
	removeFromPlaylist(currentTrack);
	currentTrack = playlist[0] || {};
}

var setCurrentTrack = function(track) {
	currentTrack = track;
}

var updateSearchResults = function(results) {
	searchResults = results;
}

var addToPlaylist = function(track) {
	playlist.push(track);
}

var removeFromPlaylist = function(track) {
	var index = playlist.indexOf(track);
	if(index > -1) {
		playlist.splice(index, 1);
	}
}

var JukeboxStore = assign({}, EventEmitter.prototype, {
	getResults: function() {
		return searchResults;
	},

	getPlaylist: function() {
		return playlist;
	},

	getCurrentTrack: function() {
		return currentTrack;
	},

	emitChange: function() {
		this.emit('change');
	},

	addChangeListener: function(callback) {
		this.on('change', callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener('change', callback);
	}

});

AppDispatcher.register(function(action) {

	switch(action.actionType) {
		case 'endCurrentTrack' :
			endCurrentTrack();
			JukeboxStore.emitChange();
			break;
		case 'setCurrentTrack' :
			setCurrentTrack(action.track);
			JukeboxStore.emitChange();
			break;
		case 'updateSearchResults' : 
			updateSearchResults(action.tracks);
			JukeboxStore.emitChange();
			break;
		case 'addToPlaylist' :
			addToPlaylist(action.track);
			JukeboxStore.emitChange();
			break;
		case 'removeFromPlaylist' :
			removeFromPlaylist(action.track);
			JukeboxStore.emitChange();
			break;

	}
});

module.exports = JukeboxStore;
