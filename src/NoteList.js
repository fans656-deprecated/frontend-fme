import React from 'react';
import Note from './Note';
import { Display } from './constants';

export default class NoteList extends React.Component {
  render() {
    const pagedNotes = this.props.pagedNotes || {};
    const notes = pagedNotes.notes || [];
    const noteComps = notes.map(note => (
      <Note key={note.id} note={note} display={Display.InList}/>
    ));
    return (
      <div className="note-list" style={noteListStyle}>
        <div className="notes">
          {noteComps}
        </div>
      </div>
    );
  }
}

const noteListStyle = {
  margin: '2em',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};
