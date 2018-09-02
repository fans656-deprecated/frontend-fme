import React, { Component } from 'react';
import styles from './styles';
import { Icon } from 'react-icons-kit'
import { ic_help } from 'react-icons-kit/md/ic_help';

export default class Footer extends Component {
  render() {
    return (
      <footer style={footerStyle}>
        <div className="left">
        </div>
        <div className="center" style={centerStyle}>
          fans656's site
        </div>
        <div className="right">
          <a href="/help" target="_blank">
            <Icon icon={ic_help}/>
          </a>
        </div>
      </footer>
    );
  }
}

const footerStyle = styles.combined(styles.headerFooter, {
  display: 'flex',
  padding: '0 1em',
  justifyContent: 'center',
});

const centerStyle = {
  flex: 1,
  textAlign: 'center',
};
