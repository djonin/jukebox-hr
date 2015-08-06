var JukeboxActions = require('./actions/JukeboxActions.js');
var JukeboxStore = require('./stores/data.js');
var React = require('react');
var App = React.createClass({

	getInitialState: function() {
		return { tracks : JukeboxStore.getResults(), playlist: JukeboxStore.getPlaylist() };
	},

	componentDidMount: function() {
		JukeboxStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		JukeboxStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState({ tracks : JukeboxStore.getResults(), playlist: JukeboxStore.getPlaylist() });
	},

	render: function() {
		return (<div>
					<h1 className='title'>Play Music</h1>
					<SearchBox />
					<SearchResults />
              		<Playlist />
              		<PlaybackControl />
				</div>);
	}
});

var ResultEntry = React.createClass({
	clickEvent: function() {
		JukeboxActions.addToPlaylist(this.props.track);
	},

	render: function() {
		if(!this.props.track.artwork_url) {
			this.props.track.artwork_url = "cat-music.jpg";
		}

		return (<div onClick={this.clickEvent} onclassName='entry'><img src={this.props.track.artwork_url}></img><div className='song-title'>{this.props.track.title}</div></div>);
	}
});

var SearchResults = React.createClass({
	render: function() {
		var elems = [];
		var tracks = JukeboxStore.getResults();
		for (var i = 0; i < tracks.length; i++) {
			elems.push(<ResultEntry track={tracks[i]} />);
		}
		return  (<div className='tracks'>
					{elems}
				</div>);
	}

});

var SearchBox = React.createClass({

	render: function() {
		return (<input className='search input-lg' placeholder='Search' onChange={JukeboxActions.updateSearchResults}></input>);
	}
});

var PlaylistEntry = React.createClass({

	onClickEvent: function(evt) {
		console.log(this.props.track);
		JukeboxActions.startPlayback(this.props.track);
	},

	render: function() {
		return (<li onClick={this.onClickEvent} className='listEntry list-group-item'><h4>{this.props.track.title}</h4><span>{this.props.track.duration}</span></li>);
	}
});

var Playlist = React.createClass({
  render: function() {
    var elems = [];
    var tracks = JukeboxStore.getPlaylist();
    for (var i = 0; i < tracks.length; i++) {
      elems.push(<PlaylistEntry track={tracks[i]} />);
    }

    return (<ul data-spy='affix' id='playlist' className='list-group'>{elems}</ul>);
  }
});

var PlaybackControl = React.createClass({

	render : function() {
		var audioSource = JukeboxStore.getCurrentTrack().stream_url+'?client_id='+SOUND_CLOUD_KEY;
		return (<div data-spy='affix' id='player'>{JukeboxStore.getCurrentTrack().title} <br/><audio src={audioSource} controls></audio></div>);
	}
});



React.render(<App />, document.body);
