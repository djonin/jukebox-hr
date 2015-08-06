//var ui = require('material_bundle');

SC.initialize({
	client_id: SOUND_CLOUD_KEY
});

var App = React.createClass({

	getInitialState: function() {
		return { tracks : [], playlist: [] };
	},

	updateSearchResults: function(evt) {
		var input = evt.target.value;
		var that = this;
		// find all sounds of buskers licensed under 'creative commons share alike'
		SC.get('/tracks', { q: input}, function(tracks) {
			that.setState({tracks:tracks, playlist: that.state.playlist});
			that.render();
		});
	},

  onSearchResultClick: function(evt, track) {
    console.log('click evt:', evt.target);
    console.log('track:', track);
    var list = this.state.playlist;
    list.push(track);
    this.setState({tracks: this.state.tracks, playlist: list});
    this.render();
  },

	render: function() {
		return (<div><h1 className='title'>Play Music</h1><SearchBox onChange={this.updateSearchResults}/>
					    <SearchResults onClick={this.onSearchResultClick} tracks={this.state.tracks}/>
              <Playlist list={this.state.playlist}/>
				  </div>);
	}
});

var ResultEntry = React.createClass({
  clickEvent: function(evt) {
    this.props.onClick(evt, this.props.track);
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
		var tracks = this.props.tracks;
		for (var i = 0; i < tracks.length; i++) {
			elems.push(<ResultEntry onClick={this.props.onClick} track={tracks[i]} />);
		}
		return  (<div className='tracks'>
					{elems}
				</div>);
	}

});

var SearchBox = React.createClass({

	updateResults: function(evt) {
		this.props.onChange(evt);
	},

	render: function() {
		return (<input className='search input-lg' placeholder='Search' onChange={this.updateResults}></input>);
	}
});

var PlaylistEntry = React.createClass({
  clickEvent: function(evt) {
    this.props.onClick(evt, this.props.track);
  },

  render: function() {
    return (<li onClick={this.clickEvent} className='listEntry list-group-item'><h4>{this.props.track.title}</h4><span>{this.props.track.duration}</span></li>);
  }
});

var Playlist = React.createClass({
  onClick: function(evt, track) {
    SC.stream(track.uri, function(sound){
      sound.play();
    });
  },

  render: function() {
    var elems = [];
    var tracks = this.props.list;
    for (var i = 0; i < tracks.length; i++) {
      elems.push(<PlaylistEntry onClick={this.onClick} track={tracks[i]} />);
    }

    return (<ul className='list list-group'>{elems}</ul>);
  }
});



React.render(<App />, document.body);
