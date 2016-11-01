import React from 'react';

const propTypes = {
  trackData: React.PropTypes.object,
};

export default class SpotifyTracks extends React.Component {
  render () {
    return (
      <div id="track-element">
        <ul>
          <li id="artist-name">{this.props.trackData.artist}</li>
          <li id="song-title">"{this.props.trackData.title}"</li>
        </ul>
        <audio controls>
          <source src={this.props.trackData.previewURL} type="audio/mpeg" />
        </audio>
      </div>
    );
  }
}

SpotifyTracks.propTypes = propTypes;
