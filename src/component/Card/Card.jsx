/* eslint-disable react/prop-types */
import { Rate, Space, Tag } from 'antd';
import './Card.css';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import MoveapiService from '../../fetch';

function kitcut(text) {
  return text.split(' ').splice(0, 17).join(' ') + '...';
}

function kitcutTitle(text) {
  if (text.split(' ').length > 4) {
    return text.split(' ').splice(0, 4).join(' ') + '...';
  }
  return text;
}
function formatDate(date) {
  if (date === '') return 'no date';
  return format(new Date(date), 'yyyy-MM-dd');
}

function raitingColor(vote_averarge) {
  if (vote_averarge > 7) {
    return 'colorA';
  } else if (vote_averarge > 5) {
    return 'colorB';
  } else if (vote_averarge > 3) {
    return 'colorC';
  } else {
    return 'colorD';
  }
}

function addRate(rate, id) {
  const fetch = new MoveapiService();
  fetch.postRaiting(rate, id);
}

const Card = ({
  id,
  title,
  poster_patch,
  popularity,
  vote_averarge,
  release_date,
  overview,
  gener,
}) => {
  return (
    <div className='card-container'>
      <div className='card__left'>
        {poster_patch ? (
          <img
            className='card__img'
            src={`https://image.tmdb.org/t/p/w500/${poster_patch}`}
            alt='IMAGE'
          />
        ) : (
          <div className='card__no-img'>
            <span className='no-img__text'>NO IMG</span>
          </div>
        )}
      </div>
      <div className='card__right'>
        <div className='top'>
          <header className='card__header'>
            <h2 className='card__title'>{kitcutTitle(title)}</h2>
            <div
              className={
                'card__raiting color ' + `${raitingColor(vote_averarge)}`
              }
            >
              {vote_averarge.toFixed(1)}
            </div>
          </header>
          <span className='card__date'>{formatDate(release_date)}</span>
          {console.log(gener)}
          <div className='card__list-catigore'>
            <Space size={[0, 8]} wrap>
              {gener.map((e) => (
                <Tag key={e.id}>{e.name}</Tag>
              ))}
            </Space>
          </div>

          <p className='card__desc'>{kitcut(overview)}</p>
        </div>
        <div className='card__star'>
          <Rate
            count={10}
            allowHalf
            defaultValue={popularity}
            onChange={(e) => addRate(e, id)}
          />
        </div>
      </div>
    </div>
  );
};
Card.propsTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  poster_patch: PropTypes.string.isRequired,
  popularity: PropTypes.number.isRequired,
  vote_averarge: PropTypes.number.isRequired,
  release_date: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
};

export default Card;
