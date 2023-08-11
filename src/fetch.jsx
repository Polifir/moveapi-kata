class MoveapiService {
  async getSearchResault(search, page) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5N2MxZjMyMzc4MTI0NTkwZjUwNDAwMTAxNjQ2NTdhZCIsInN1YiI6IjY0Y2VhNTZmNmQ0Yzk3MDBhZmFkYjI3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.C90fdSxcUvBfqN_YyQsUzGt9IGBEt0FF-FqvTX6wqmk',
      },
    };
    let res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=${page}`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        return res;
      });
    return res;
  }

  async getRatedMovie() {
    const arrRes = [];
    let keys = Object.keys(localStorage);
    for (let key of keys) {
      arrRes.push(JSON.parse(localStorage.getItem(key)));
    }
    return arrRes;
  }

  async postRaiting(raiting, filmId) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5N2MxZjMyMzc4MTI0NTkwZjUwNDAwMTAxNjQ2NTdhZCIsInN1YiI6IjY0Y2VhNTZmNmQ0Yzk3MDBhZmFkYjI3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.C90fdSxcUvBfqN_YyQsUzGt9IGBEt0FF-FqvTX6wqmk',
      },
    };

    const film = await fetch(
      `https://api.themoviedb.org/3/movie/${filmId}?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => response)
      .catch((err) => console.error(err));
    const filmJson = JSON.stringify({ ...film, popularity: raiting });

    localStorage.setItem(filmId.toString(), filmJson);
  }

  getYourRaitingFilm(filmId) {
    const item = JSON.parse(localStorage.getItem(filmId.toString()));
    if (!item) return 0;
    const yourRait = item.popularity ? item.popularity : 0;
    return yourRait;
  }
}

export default MoveapiService;
