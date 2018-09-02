import React, { Component } from 'react';
import styles from './styles';

export default class Footer extends Component {
  render() {
    return (
      <footer style={footerStyle}>
        fans656's site
      </footer>
    );
  }
}

const footerStyle = styles.combined(
  styles.headerFooter,
  {
    display: 'flex',
    justifyContent: 'center',
  }
);
