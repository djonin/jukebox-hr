var AppDispatcher = require('../dispatcher/dispatcher.js');

SC.initialize({
	client_id: SOUND_CLOUD_KEY
});

module.exports = {

	endCurrentTrack: function() {
		console.log('asdasd');
		AppDispatcher.dispatch({
			actionType: 'endCurrentTrack'
		});
	},

	removeFromPlaylist: function(track) {
		AppDispatcher.dispatch({
			actionType: 'removeFromPlaylist',
			track: track
		});
	},

	startPlayback: function(track) {
		AppDispatcher.dispatch({
			actionType: 'setCurrentTrack',
			track: track
		});
	},

	updateSearchResults: function(evt) {
		var input = evt.target.value;
		var that = this;
		// find all sounds of buskers licensed under 'creative commons share alike'
		SC.get('/tracks', { q: input}, function(tracks) {
			AppDispatcher.dispatch({
				actionType: 'updateSearchResults',
				tracks : tracks
			});
		});
	},

	addToPlaylist: function(track) {
		AppDispatcher.dispatch({
			actionType: 'addToPlaylist',
			track: track
		});
	},

	removeFromPlaylist:function(track) {
		AppDispatcher.dispatch({
			actionType: 'removeFromPlaylist',
			track: track
		});
	}

}