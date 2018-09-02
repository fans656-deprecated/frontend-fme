import React from 'react';
import styles from './styles';

export default class NoteList extends React.Component {
  render() {
    const note = this.props.note;
    return (
      <pre style={inListStyle}>
        {JSON.stringify(note, null, 2)}
      </pre>
    );
  }
}

const inListStyle = {
  background: 'white',
  boxShadow: '0 0 5px #ddd',
  fontFamily: 'Consolas',
  fontSize: '.9rem',
  color: '#333',
  padding: '2em',
  width: '45rem',
};
