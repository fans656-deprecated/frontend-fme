import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import defaultNotes from './defaultNotes';
import styles from './styles';

export default class Header extends Component {
  render() {
    const note = this.props.navNote || defaultNotes['/nav'];
    const links = note.links;
    const linkComps = links.map(link => (
      <li key={link.href} style={liStyle}>
        <Link to={link.href}>{link.name}</Link>
      </li>
    ));
    return (
      <header style={headerStyle}>
        <ul style={ulStyle}>{linkComps}</ul>
      </header>
    );
  }
}

const ulStyle = {
  color: styles.darkForeground,
};

const liStyle = {
  color: 'inherit',
  display: 'inline-block',
  marginLeft: '1em',
};

const headerStyle = styles.headerFooter;
