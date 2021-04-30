import React, { useEffect, useState } from "react";
import {
  createMuiTheme,
  ThemeProvider,
  TextField,
  Button,
  Tabs,
  Tab,
} from "@material-ui/core";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import MovieFilterIcon from "@material-ui/icons/MovieFilter";
import LiveTvIcon from "@material-ui/icons/LiveTv";
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import "./Search.css";
import axios from "axios";
import SingleContent from "../../components/singleContent/SingleContent";
import CustomPagination from "../../components/pagination/CustomPagination";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const Search = () => {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState();
  const [numOfPages, setNumOfPages] = useState();

  const getSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`,
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    getSearch();
    // eslint-disable-next-line
  }, [page, type]);

  return (
    <div>
        
      <span className="pageTitle">Search</span>

      <ThemeProvider theme={darkTheme}>
        <div className="searchBar">
          <TextField
            style={{ flex: 1 }}
            color="secondary"
            className="searchBox"
            label="Search"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            onClick={getSearch}
            variant="outlined"
            color="secondary"
            size="large"
            style={{ marginLeft: "2rem" }}
            startIcon={<SearchRoundedIcon
            />}
          >
            Search
          </Button>
        </div>

        <Tabs
          className="tabs"
          value={type}
          indicatorColor="secondary"
          textColor="secondary"
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
        >
          <Tab
            style={{ with: "50%" }}
            label="Search Movies"
            icon={<MovieFilterIcon />}
          />
          <Tab
            style={{ with: "50%" }}
            label="Search TV Shows"
            icon={<LiveTvIcon />}
          />
        </Tabs>
      </ThemeProvider>

      <div className="movies">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.release_date || c.first_air_date}
              media_type={type ? "tv" : "movie"}
              vote_average={c.vote_average}
            />
          ))}
          {searchText && !content && (type ? <h2>No Tv Shows were found <SentimentDissatisfiedIcon/></h2> : <h2>No Movies were found <SentimentDissatisfiedIcon/></h2>)}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Search;
