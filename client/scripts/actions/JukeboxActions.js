var AppDispatcher = require('../dispatcher/dispatcher.js');

SC.initialize({
	client_id: SOUND_CLOUD_KEY
});

module.exports = {

	startPlayback: function(track) {
		AppDispatcher.dispatch({
			actionType: 'setCurrentTrack',
			track: track
		});
	    SC.stream(track.uri, function(sound){
	      sound.play();
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