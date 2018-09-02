import React from 'react';
import { withRouter } from 'react-router-dom';
import Frame from './Frame';
import NotFound from './NotFound';
import noter from './noter';
import { PageType } from './constants';

class App extends React.Component {
  state = {
    pageType: null,
    note: null,
    pagedNotes: null,
    navNote: null,
  }

  componentDidMount() {
    this.init(this.props);
  }

  componentWillReceiveProps(props) {
    this.init(props);
  }

  init(props) {
    this.fetchNavNote();
    this.fetchNote(props);
  }

  render() {
    switch (this.state.pageType) {
      case PageType.NotFound:
        return this.renderNotFound();
      default:
        return this.renderDefault();
    }
  }

  renderNotFound() {
    return this.renderFramed(<NotFound/>);
  }

  renderDefault() {
    return this.renderFramed(null);
  }

  renderFramed(content) {
    return this.renderApp(
      <Frame navNote={this.state.navNote}>
        {content}
      </Frame>
    );
  }

  renderApp(content) {
    return <div className="App">{content}</div>;
  }

  fetchNavNote = async () => {
    const note = await noter.byPath('/nav');
    if (note) {
      this.setState({navNote: note});
    }
  }

  fetchNote = async (props) => {
    const path = props.location.pathname;
    const note = await noter.byPath(path);
    if (note) {
      console.info(note);
    } else {
      console.info(path + ' not found');
      this.setState({pageType: PageType.NotFound});
    }
  }
}

App = withRouter(App);

export default App;
