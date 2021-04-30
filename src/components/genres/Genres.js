import { Chip } from "@material-ui/core";
import axios from "axios";
import { useEffect } from "react";
import "./Genres.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const Genres = ({
  type,
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  setPage,
}) => {
  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id),
    );
    setGenres([...genres, genre]);
    setPage(1);
  };

  const getGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_KEY}&language=en-US`,
    );
    setGenres(data.genres);
  };

  useEffect(() => {
    getGenres();

    return () => {
      setGenres({}); // unmounting
    };
    // eslint-disable-next-line
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="chip">
        {selectedGenres.map((genre) => (
          <Chip
            style={{ margin: 2 }}
            label={genre.name}
            key={genre.id}
            variant="outlined"
            color="secondary"
            clickable
            size="medium"
            onDelete={() => handleRemove(genre)}
          />
        ))}
        {genres &&
          genres.map((genre) => (
            <Chip
              style={{ margin: 3 }}
              label={genre.name}
              key={genre.id}
              clickable
              variant="outlined"
              size="medium"
              onClick={() => handleAdd(genre)}
            />
          ))}
      </div>
    </ThemeProvider>
  );
};

export default Genres;
