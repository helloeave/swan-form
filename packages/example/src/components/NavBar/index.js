/* eslint-disable jsx-a11y/anchor-is-valid, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { classes } from '@swan-form/helpers';
import Portal from '../Portal';
import { baseName, dedupeSlashes, pages } from '../../routes';
import { hide, show } from '../../redux/nav';

import styles from './NavBar.scss';

function createLink(path, name, pathname) {
  const p = dedupeSlashes(`${baseName}/${path}`);

  return (
    <Link key={p} to={p}>
      <li className={pathname === p ? styles.active : ''}>{name}</li>
    </Link>
  );
}

class NavBar extends Component {
  static propTypes = {
    isShowing: PropTypes.bool.isRequired,
    hide: PropTypes.func.isRequired,
    show: PropTypes.func.isRequired,
    location: PropTypes.any, // eslint-disable-line
  };

  toggle = () => {
    const { isShowing, hide: doHide, show: doShow } = this.props;
    (isShowing ? doHide : doShow)();
  };

  render() {
    const { pathname } = this.props.location;

    return (
      <Portal>
        <div className={classes(styles.navBar, !this.props.isShowing && styles.hide)}>
          <ul>{pages.map(([path, name, ...ignore]) => createLink(path, name, pathname))}</ul>
          <div className={styles.toggler} onClick={this.toggle}>
            {this.props.isShowing ? '↓ Hide ↓' : '↑ Show ↑'}
          </div>
        </div>
      </Portal>
    );
  }
}

export default withRouter(
  connect(
    state => ({ isShowing: state.nav.show }),
    { hide, show },
  )(NavBar),
);
