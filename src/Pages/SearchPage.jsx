import React from 'react';
import './SearchPage.css';
import Card from '../component/Card';
import MoveapiService from '../fetch';
import { Alert, Input, Pagination, Spin } from 'antd';
import debounce from 'lodash.debounce';

class SearchPage extends React.Component {
  state = {
    resArr: [],
    totalPage: 5,
    totalRes: 10,
    isLoading: true,
    error: false,
    search: '',
    arrGenres: [],
  };
  fetch(e = 1) {
    this.setState({
      isLoading: true,
    });
    const fetch = new MoveapiService();
    fetch
      .getSearchResault(this.state.search, e)
      .then((res) => {
        this.setState({
          resArr: res.results,
          totalPage: res.total_pages,
          totalRes: res.total_results,
          isLoading: false,
        });
      })
      .catch(() => {
        return this.setState({ error: true });
      });
  }

  getRait(id) {
    const fetch = new MoveapiService();
    return fetch.getYourRaitingFilm(id);
  }

  async getGener(arrId) {
    const fetch = new MoveapiService();
    return await fetch.getGenersSearch(arrId).then((e) => e);
  }

  onFetchDebounce = debounce(this.fetch, 1000);

  onError() {
    this.setState({
      error: true,
      isLoading: false,
    });
  }
  onChangeInput(e) {
    this.setState({
      search: e,
    });
    this.onFetchDebounce();
  }

  getArrGen(arrId) {
    return this.state.arrGenres.filter((e) =>
      arrId.indexOf(e.id) !== -1 ? e.name : false
    );
  }

  componentDidMount() {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5N2MxZjMyMzc4MTI0NTkwZjUwNDAwMTAxNjQ2NTdhZCIsInN1YiI6IjY0Y2VhNTZmNmQ0Yzk3MDBhZmFkYjI3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.C90fdSxcUvBfqN_YyQsUzGt9IGBEt0FF-FqvTX6wqmk',
      },
    };
    fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
      .then((response) => response.json())
      .then((response) =>
        this.setState({
          arrGenres: response.genres,
        })
      )
      .catch((err) => console.error(err));
  }

  render() {
    const spinner = this.state.isLoading ? <Spin /> : null;
    console.log(this.state.arrGenres);
    return (
      <>
        <Input
          value={this.state.search}
          onChange={(e) => this.onChangeInput(e.target.value)}
        />
        {this.state.search === '' ? (
          <p>Нет запроса</p>
        ) : (
          <section className='card-collection__container'>
            {this.state.resArr === undefined || this.state.error ? (
              <Alert message='Error' type='error' />
            ) : this.state.isLoading ? (
              spinner
            ) : (
              this.state.resArr.map((e) => {
                return (
                  <Card
                    key={e.id}
                    id={e.id}
                    title={e.title}
                    poster_patch={e.poster_path}
                    popularity={this.getRait(e.id)}
                    vote_averarge={e.vote_average}
                    release_date={e.release_date}
                    overview={e.overview}
                    gener={this.getArrGen(e.genre_ids)}
                  />
                );
              })
            )}
          </section>
        )}
        {this.state.search !== '' && this.state.resArr.length === 0 && (
          <p>
            По запросу `&quot;`{this.state.search}`&quot;` ничего не найдено
          </p>
        )}

        {!(this.state.totalRes === 0) && (
          <Pagination
            size='small'
            total={this.state.totalRes}
            defaultPageSize={20}
            onChange={(e) => {
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth',
              });
              this.fetch(e);
            }}
          />
        )}
      </>
    );
  }
}

export default SearchPage;
