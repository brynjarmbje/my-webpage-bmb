import React, { Component } from 'react';

class AudioPlayer extends Component {
constructor(props) {
    super(props);
    this.state = {
        isPlaying: false,
        isLoading: true,
        error: null,
    };
    this.audioContext = new (window.AudioContext || window.AudioContext)();
    this.source = null;
}

  loadAudio = async (url) => {
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      this.audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      this.setState({ isLoading: false });
    } catch (error) {
      console.error('Error loading audio:', error);
      this.setState({ error: 'Failed to load audio.', isLoading: false });
    }
  }

  playAudio = () => {
    if (!this.audioBuffer || this.audioContext.state === 'closed') {
      console.log("Audio not loaded or AudioContext is closed");
      return;
    }
    // Check if a source is already playing, if yes, stop it before starting a new one
    if (this.source) {
        this.source.disconnect();
    }
    this.source = this.audioContext.createBufferSource();
    this.source.buffer = this.audioBuffer;
    this.source.connect(this.audioContext.destination);
    this.source.start();
    this.setState({ isPlaying: true });
    this.source.onended = () => {
        this.setState({ isPlaying: false });
        // Disconnect source when finished playing to free up resources
        if (this.source) {
            this.source.disconnect();
            this.source = null;
        }
    };
  }
  
  stopAudio = () => {
    if (this.source) {
      this.source.stop();
      this.source.disconnect(); // Disconnect the source to cleanup
      this.source = null;
      this.setState({ isPlaying: false });
    }
  }

  componentDidMount() {
    this.loadAudio(this.props.url);
  }

  componentWillUnmount() {
    this.stopAudio(); // Stop any currently playing audio and clean up
    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close()
        .then(() => console.log('AudioContext closed successfully'))
        .catch(error => console.error('Error closing AudioContext:', error));
    }
  }

  render() {
    const { isLoading, isPlaying, error } = this.state;

    return (
        <div>
            {error && <p>Error: {error}</p>}
            {isLoading ? <p>Loading...</p> : (
                <>
                    <button onClick={this.playAudio} disabled={isPlaying || !!error}>
                        Play
                    </button>
                    <button onClick={this.stopAudio} disabled={!isPlaying || !!error}>
                        Stop
                    </button>
                </>
            )}
        </div>
    );
  }
}

export default AudioPlayer;