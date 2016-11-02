import React from 'react';
import request from 'superagent';
import Modal from 'react-modal';
import SpotifyTrackView from './SpotifyTrackView.jsx';

export default class Spotify extends React.Component {
  constructor () {
    super();
    this.state = {
      keyword: '',
      tracks: [],
      spotifyModalOpen: false,
      invalidData: true,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getTracks = this.getTracks.bind(this);
    this.openSpotifyModal = this.openSpotifyModal.bind(this);
    this.closeSpotifyModal = this.closeSpotifyModal.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    nextState.invalidData = !nextState.keyword;
  }

  cleanTrackData (data) {
    const cleanTrackObject = {
      title: data.name,
      artist: data.artists[0].name,
      previewURL: data.preview_url,
    };
    return cleanTrackObject;
  }

  getTracks() {
    const searchInput = this.state.keyword;
    const cleanSearchInput = searchInput.replace(' ', '%20');
    const trackList = [];
    const URL = `https://api.spotify.com/v1/search?q=${cleanSearchInput}&type=track&limit=10`;
    request.get(URL).then((response) => {
      const returnedTracks = response.body.tracks.items;
      returnedTracks.forEach((track) => {
        const cleanTrack = this.cleanTrackData(track);
        trackList.push(cleanTrack);
      });
      this.setState({
        tracks: trackList,
      });
    });
  }

  handleChange (e) {
    e.preventDefault();
    const target = e.target;
    this.setState({
      keyword: target.value,
    });
  }

  handleSubmit (e) {
    e.preventDefault();
    this.getTracks();
    this.openSpotifyModal();
    this.setState({
      keyword: '',
    });
  }

  openSpotifyModal() {
    this.setState({ spotifyModalOpen: true });
  }

  closeSpotifyModal() {
    this.setState({ spotifyModalOpen: false });
  }

  render () {
    return (
      <div>
        <form id="search-form" onSubmit={this.handleSubmit}>
          <input className="track-input"
                 type="text"
                 name="keyword"
                 placeholder="don't know them? search for a song to preview here!"
                 value={this.state.keyword}
                 onChange={this.handleChange}
          />
          <input id="spotify-search-button"
                 type="submit"
                 onClick={this.handleSubmit}
                 value="search"
                 disabled={this.state.invalidData}
          />
        </form>
        <Modal
              className="spotify-search-modal"
              isOpen={this.state.spotifyModalOpen}
              onRequestClose={this.closeSpotifyModal}
        >
          <button onClick={this.closeSpotifyModal}>X</button>

          <ul id="song-list">
            {this.state.tracks.map((track) => {
              return (

                <SpotifyTrackView trackData={track} />

              );
            })}
          </ul>
        </Modal>
      </div>
    );
  }
}


