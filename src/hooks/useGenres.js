const useGenres = (selectedGenres) => {
    if(selectedGenres.length < 1) return '';
    const gID = selectedGenres.map((g) => g.id)
    return gID.reduce((acc, current) => acc+','+current)
};

export default useGenres



