import React from 'react';

const propTypes = {
  trackData: React.PropTypes.object,
};

export default class SpotifyTrackView extends React.Component {

  stopPlaying() {
    document.addEventListener('play', function(e){
      let audios = document.getElementsByTagName('audio');
        for(let i = 0; i < audios.length; i++) {
          if(audios[i] != e.target){
            audios[i].pause();
          }
        }
    }, true);
  }

  render () {
    return (
      <div id="track-element">
        <ul id="artist-title-list">
          <li id="artist-name">{this.props.trackData.artist}</li>
          <li id="song-title">"{this.props.trackData.title}"</li>
        </ul>
        <audio className="audio" controls>
          <source onClick={this.stopPlaying()} src={this.props.trackData.previewURL} type="audio/mpeg" />
        </audio>
      </div>
    );
  }
}

SpotifyTrackView.propTypes = propTypes;
