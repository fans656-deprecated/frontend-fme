import React from 'react';
import { Display } from './constants';
import styles from './styles';

export default class NoteList extends React.Component {
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
    return (
      <div className="note" style={style}>
        <pre>
          {JSON.stringify(note, null, 2)}
        </pre>
        <div className="actions left-right" style={actionsStyle}>
          <div className="left">
          </div>
          <div className="right">
            <a href={`/note/${note.id}`} target="_blank">
              {note.ctime}
            </a>
          </div>
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
  padding: '2em',
  width: '45rem',
  marginBottom: '1rem',
};

const singleStyle = styles.combined(baseStyle, {
  margin: '2rem auto',
  width: '55rem',
});

const actionsStyle = {
  color: '#ccc',
};
