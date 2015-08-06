//var ui = require('material_bundle');


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
		return (<div><h1 className='title'>Play Music</h1><SearchBox />
					    <SearchResults />
              <Playlist />
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
		var tracks = JukeboxStore.getSearchResults;
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
  render: function() {
    return (<li onClick={JukeboxActions.startPlayback} className='listEntry list-group-item'><h4>{this.props.track.title}</h4><span>{this.props.track.duration}</span></li>);
  }
});

var Playlist = React.createClass({
  render: function() {
    var elems = [];
    var tracks = JukeboxStore.getPlaylist();
    for (var i = 0; i < tracks.length; i++) {
      elems.push(<PlaylistEntry track={tracks[i]} />);
    }

    return (<ul className='list list-group'>{elems}</ul>);
  }
});



React.render(<App />, document.body);
