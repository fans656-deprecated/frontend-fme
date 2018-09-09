import React from 'react';
import dateFormat from 'dateformat';
import { Display } from './constants';
import styles from './styles';
import './css/Note.css';

export default class Note extends React.Component {
  render() {
    const note = this.props.note;
    switch (this.props.display) {
      case Display.InList:
        return this.renderInList(note);
      default:
        return this.renderSingle(note);
    }
  }

  renderInList(note) {
    return this.renderNote(note, baseStyle);
  }

  renderSingle(note) {
    return this.renderNote(note, singleStyle);
  }

  renderNote(note, style) {
    const title = this.renderTitle(note);
    if (title) {
      style = styles.combined(style, {paddingTop: '1rem'});
    }
    return (
      <div className="note" style={style}>
        {title}
        {this.renderContent(note)}
        {this.renderActions(note)}
      </div>
    );
  }

  renderTitle = (note) => {
    return note.title ? <h2>{note.title}</h2> : null;
  }

  renderContent = (note) => {
    let contentText = null;
    if (note.content) {
      contentText = note.content;
    } else {
      contentText = JSON.stringify(note, null, 2);
    }
    switch (note.type) {
      case 'html':
        return (
          <div className="content"
            dangerouslySetInnerHTML={{__html: contentText}}
          />
        );
      default:
        return (
          <pre style={{fontFamily: 'Consolas'}}>
            {contentText}
          </pre>
        );
    }
  }

  renderActions = (note) => {
    const ctime = new Date(note.ctime)
    const ctimeFull = dateFormat(ctime, 'yyyy-mm-dd HH:MM:ss');
    const ctimeSimple = (
      this.props.display === Display.InList ?
      dateFormat(ctime, 'yyyy-mm-dd') : ctimeFull
    );
    return (
      <div className="actions left-right" style={actionsStyle}>
        <div className="left">
        </div>
        <div className="right">
          <a href={`/note/${note.id}`} target="_blank"
            title={ctimeFull}
          >
            {ctimeSimple}
          </a>
        </div>
      </div>
    );
  }
}

const baseStyle = {
  background: 'white',
  boxShadow: '0 0 5px #ddd',
  fontFamily: 'Consolas',
  fontSize: '.9rem',
  color: '#333',
  padding: '3rem',
  paddingBottom: '2rem',
  width: '40rem',
  margin: '1rem',
};

const singleStyle = styles.combined(baseStyle, {
  margin: '2rem auto',
  width: '50rem',
});

const actionsStyle = {
  marginTop: '1rem',
  color: '#ccc',
};
