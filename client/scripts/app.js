
SC.initialize({
	client_id: SOUND_CLOUD_KEY
});

var App = React.createClass({

	getInitialState: function() {
		return { tracks : [] };
	},


	updateSearchResults: function(evt) {
		var input = evt.target.value;
		var that = this;
		// find all sounds of buskers licensed under 'creative commons share alike'
		SC.get('/tracks', { q: input}, function(tracks) {
			that.setState({tracks:tracks});
			that.render();
		});
	},


	render: function() {
		return (<div><SearchBox onChange={this.updateSearchResults.bind(this)}/>
					<SearchResults tracks={this.state.tracks}/>
				</div>);
	}
});

var ResultEntry = React.createClass({

	render: function() {
		if(!this.props.artwork_url) {
			this.props.artwork_url = "cat-music.jpg";
		}

		return (<div className='entry'><img src={this.props.artwork_url}></img>{this.props.title}</div>);
	}
});

var SearchResults = React.createClass({
	render: function() {
		var elems = [];
		var tracks = this.props.tracks;
		for (var i = 0; i < tracks.length; i++) {
			elems.push(<ResultEntry artwork_url={tracks[i].artwork_url} title={tracks[i].title} stream={tracks[i].stream_url} />);
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
		return (<input className='search' placeholder='Search' onChange={this.updateResults}></input>);
	}
});

React.render(<App />, document.body);