import React from 'react';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import Frame from './Frame';
import NotFound from './NotFound';
import NoteList from './NoteList';
import Note from './Note';
import EditNote from './EditNote';
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
      case PageType.Note:
        return this.renderNote();
      case PageType.EditNote:
        return this.renderEditNote();
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

  renderNote() {
    return this.renderFramed(<Note note={this.state.note}/>);
  }

  renderEditNote() {
    return this.renderFramed(<EditNote note={this.state.note}/>);
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
    let note = null;
    if (path.match(/\/note\/\d+/)) {
      note = await noter.byId(path.match(/\/note\/(\d+)/)[1]);
    } else {
      note = await noter.byPath(path);
    }
    if (note) {
      if (this.isEditing(props)) {
        this.setState({pageType: PageType.EditNote, note: note});
      } else {
        if (note.type === 'filter') {
          const args = qs.parse(props.location.search.substring(1));
          this.fetchPagedNotes(note, {page: args.page});
        } else {
          this.setState({pageType: PageType.Note, note: note});
        }
      }
    } else {
      console.info(path + ' not found');
      this.setState({pageType: PageType.NotFound});
    }
  }

  fetchPagedNotes = async (filterNote, {page}) => {
    page = parseInt(page, 10);
    if (!page) {
      page = 1;
    }
    const pagedNotes = await noter.byQuery(filterNote.filter, {page: page});
    if (pagedNotes) {
      this.setState({
        pageType: PageType.NoteList,
        pagedNotes: pagedNotes,
      });
    } else {
      console.error('failed to fetch notes using', filterNote);
    }
  }

  isEditing = (props) => {
    const search = props.location.search;
    const args = qs.parse(search.substring(1));
    return 'e' in args || 'edit' in args;
  }
}

App = withRouter(App);

export default App;
