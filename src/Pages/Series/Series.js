import React, { useEffect, useState } from "react";
import axios from "axios";
import Genres from '../../components/genres/Genres'
import useGenres from '../../hooks/useGenres'
import SingleContent from "../../components/singleContent/SingleContent";
import CustomPagination from "../../components/pagination/CustomPagination";
import "./Series.css";

const Series = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [selectedGenres, setSelectedGenres] = useState([])
  const [genres, setGenres] = useState([]);
  const genreforURL = useGenres(selectedGenres)

  const getSeries = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`,
    );
    // console.log(data.results); &with_genres=${genreforURL}
    setContent(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    window.scroll(0, 0)
    getSeries();
    // eslint-disable-next-line
  }, [page, genreforURL]);

  return (
    <div>
      <span className="pageTitle">TV Shows</span>
      <Genres
      type='tv'
      selectedGenres={selectedGenres}
      genres={genres}
      setSelectedGenres={setSelectedGenres}
      setGenres={setGenres}
      setPage={setPage}
      />

      <div className="series">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.release_date || c.first_air_date}
              media_type="tv"
              vote_average={c.vote_average}
            />
          ))}
      </div>
      {numOfPages > 1 && (<CustomPagination setPage={setPage} numOfPages={numOfPages} />) }
    
    </div>
  );
};

export default Series;
