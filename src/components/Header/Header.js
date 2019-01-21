import React from 'react';
import { withRouter } from 'react-router-dom'
import HeaderSearchBar from "./HeaderSearchBar";

function SearchAppBar(props) {
  return (
    <div className="header">
      <div className="header__logo">
        <img alt="" src="/img/001-frog.svg" className="header__logo_img" onClick={() => props.history.push('/')} />
        <span className="header__title">Anura</span>
      </div>
      <HeaderSearchBar />
    </div>
  );
}

export default withRouter(SearchAppBar);