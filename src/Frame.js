import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';

export default class Frame extends Component {
  render() {
    return (
      <div className="frame"
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Header/>
        <main style={mainStyle}>
          {this.props.children}
        </main>
        <Footer/>
      </div>
    );
  }
}

const mainStyle = {
  flex: 1,
};
