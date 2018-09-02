import React from 'react';
import { withRouter } from 'react-router-dom';
import Frame from './Frame';
import NotFound from './NotFound';
import NoteList from './NoteList';
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
      case PageType.NoteList:
        return this.renderNoteList();
      default:
        return this.renderDefault();
    }
  }

  renderNotFound() {
    return this.renderFramed(<NotFound/>);
  }

  renderNoteList() {
    return this.renderFramed(
      <NoteList pagedNotes={this.state.pagedNotes}/>
    );
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
      if (note.type === 'filter') {
        this.fetchPagedNotes(note);
      } else {
        console.log('render note', note);
      }
    } else {
      console.info(path + ' not found');
      this.setState({pageType: PageType.NotFound});
    }
  }

  fetchPagedNotes = async (filterNote) => {
    const pagedNotes = await noter.byQuery(filterNote.filter);
    if (pagedNotes) {
      console.log(pagedNotes);
      this.setState({
        pageType: PageType.NoteList,
        pagedNotes: pagedNotes,
      });
    } else {
      console.error('failed to fetch notes using', filterNote);
    }
  }
}

App = withRouter(App);

export default App;
