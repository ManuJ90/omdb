import React from "react";
import { Pagination } from "@material-ui/lab";
import './CustomPagination.css'
import { createMuiTheme, ThemeProvider } from "@material-ui/core";


const darkTheme = createMuiTheme({
    palette:{
        type: 'dark'
    }
})

const CustomPagination = ({ setPage, numOfPages = 10 }) => {
  const handlePage = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };

  return (
    <div className='pagination'>
        <ThemeProvider theme={darkTheme}>
        <Pagination
        count={numOfPages}
        hideNextButton
        hidePrevButton
        variant="outlined" 
        color="secondary"
        onChange={(e) => handlePage(e.target.textContent)}
      />
        </ThemeProvider>
    </div>
  );
};

export default CustomPagination;
