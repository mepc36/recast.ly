import exampleVideoData from '../data/exampleVideoData.js';
import VideoList from './VideoList.js';
import VideoPlayer from './VideoPlayer.js';
import Search from './Search.js';
import YOUTUBE_API_KEY from '../config/youtube.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentVideo: exampleVideoData[0], videos: exampleVideoData};
    this.onSearch();
  }

  onClick(videoIndex) {
    return this.setState({currentVideo: this.state.videos[videoIndex]});
  }

  onSearch(searchTerms) {
    return this.props.searchYouTube({key: YOUTUBE_API_KEY, query: searchTerms, max: 5}, (data) => {
      return this.setState({currentVideo: data[0], videos: data});
    });
  }

  render() {
    return (<div>
      <nav className="navbar">
        <div className="col-md-6 offset-md-3">
          <Search onSearch={this.onSearch.bind(this)}/>
        </div>
      </nav>
      <div className="row">
        <div className="col-md-7">
          <VideoPlayer video={this.state.currentVideo}/>
        </div>
        <div className="col-md-5">
          <VideoList videos={this.state.videos} onClick={this.onClick.bind(this)}/>
        </div>
      </div>
    </div>);
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;
