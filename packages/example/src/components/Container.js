import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import NavBar from './NavBar';
import styles from './Container.scss';

@connect(state => ({ navVisible: state.nav.show }))
export default class Container extends PureComponent {
  render() {
    return (
      <div>
        <NavBar />
        <div className={[styles.container, this.props.navVisible && styles.navVisible].filter(O => O).join(' ')}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
