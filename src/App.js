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
  }

  componentDidMount = async () => {
    await this.fetchNote();
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
    return this.renderApp(<Frame>{content}</Frame>);
  }

  renderApp(content) {
    return <div className="App">{content}</div>;
  }

  fetchNote = async () => {
    const path = this.props.location.pathname;
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
