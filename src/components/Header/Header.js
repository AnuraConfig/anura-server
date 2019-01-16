import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search';
import styles from './HeaderStyle';
import { SearchContext } from '../../Context/Contexts';
import HeaderSearchBar from "./HeaderSearchBar";

function SearchAppBar(props) {
  const { classes } = props;
  return (
    <div className={"header"}>
      <div className={"header__logo"}>
          <img src={'/img/001-frog.svg'} className={"header__logo_img"} onClick={() => props.history.push('/')}/>
      </div>
      <HeaderSearchBar/>
    </div>
  );
}

SearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(SearchAppBar));

{/*<div className={classes.root}>*/}
{/*<AppBar position="static">*/}
{/*<Toolbar>*/}
{/*<IconButton onClick={() => props.history.push('/')} className={classes.menuButton} color="inherit" aria-label="Open drawer">*/}
{/*<img width={30} height={30} src={'/img/001-frog.svg'} alt="icon" />*/}
{/*</IconButton>*/}
{/*<Typography className={classes.title} variant="h6" color="inherit" noWrap>*/}
{/*Anura*/}
{/*</Typography>*/}
{/*<div className={classes.grow} />*/}
{/*<div className={classes.search}>*/}
{/*<div className={classes.searchIcon}>*/}
{/*<SearchIcon />*/}
{/*</div>*/}
{/*<SearchContext.Consumer>*/}
{/*{({ text, changeText }) => (*/}
{/*<InputBase*/}
{/*placeholder="Search…"*/}
{/*value={text}*/}
{/*onChange={(event) => changeText(event.target.value)}*/}
{/*classes={{*/}
{/*root: classes.inputRoot,*/}
{/*input: classes.inputInput,*/}
{/*}}*/}
{/*/>*/}
{/*)}*/}
{/*</SearchContext.Consumer>*/}
{/*</div>*/}
{/*</Toolbar>*/}
{/*</AppBar>*/}
{/*</div>*/}