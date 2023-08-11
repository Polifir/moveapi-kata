import Card from '../component/Card';
import './SearchPage.css';
import MoveapiService from '../fetch';
import { Component } from 'react';

const fetch = new MoveapiService();

class Rated extends Component {
  state = {
    elements: [],
  };

  componentDidMount() {
    fetch.getRatedMovie().then((res) => this.setState({ elements: res }));
  }

  render() {
    return (
      <section className='card-collection__container'>
        {this.state.elements.map((e) => {
          console.log(e);
          return (
            <Card
              key={e.id}
              id={e.id}
              title={e.title}
              poster_patch={e.poster_path}
              popularity={e.popularity}
              vote_averarge={e.vote_average}
              release_date={e.release_date}
              overview={e.overview}
              gener={e.genres}
            />
          );
        })}
      </section>
    );
  }
}

export default Rated;
