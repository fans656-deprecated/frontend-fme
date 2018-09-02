import React from 'react';
import styles from './styles';

export default class NoteList extends React.Component {
  render() {
    const note = this.props.note;
    return (
      <div className="note" style={inListNoteStyle}>
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

const inListNoteStyle = {
  background: 'white',
  boxShadow: '0 0 5px #ddd',
  fontFamily: 'Consolas',
  fontSize: '.9rem',
  color: '#333',
  padding: '2em',
  width: '45rem',
  marginBottom: '1rem',
};

const actionsStyle = {
  color: '#ccc',
};
