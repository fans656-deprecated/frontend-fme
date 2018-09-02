import React from 'react';
import styles from './styles';

export default class NotFound extends React.Component {
  render() {
    return (
      <div style={styles.centered}>
        <h1>Oops, not found</h1>
      </div>
    );
  }
}
