import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import MovieFilterIcon from '@material-ui/icons/MovieFilter';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import SearchIcon from '@material-ui/icons/Search';



const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: '0',
    zIndex: 100,
    backgroundColor: '#86868640',
    boxShadow: '0 -10px 18px 0 #f48fb141',
    backdropFilter: 'blur(10.5px)',
    border: '1px solid #ffffff2e',
    textShadow:'0 0 0.5rem black;',
    fontWeight:'300'
  },
});


export default function Navbar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const history = useHistory()

  useEffect(()=>{
    if(value === 0) history.push('/');
    else if (value === 1) history.push('/movies');
    else if (value === 2) history.push('/series');
    else if (value === 3) history.push('/search');
  }, [value, history])

  return (
    <BottomNavigation value={value} onChange={(event, newValue) => {setValue(newValue);}} showLabels className={classes.root}>
      <BottomNavigationAction style={{color:'white', fontWeight:'bold'}} label="Trending" icon={<TrendingUpIcon />} />
      <BottomNavigationAction style={{color:'white', fontWeight:'bold'}} label="Movies" icon={<MovieFilterIcon />} />
      <BottomNavigationAction style={{color:'white', fontWeight:'bold'}} label="TV Shows" icon={<LiveTvIcon />} />
      <BottomNavigationAction style={{color:'white', fontWeight:'bold'}} label="Search" icon={<SearchIcon />} />
    </BottomNavigation>
  );
}












