import { Link, Route, Routes } from 'react-router-dom';
// import CardCollection from '../CardCollection';
import Header from '../Header';
// import { Offline, Online } from 'react-detect-offline';
import './App.css';
import Rated from '../../Pages/rated';
import SearchPage from '../../Pages/SearchPage';
import { Tabs } from 'antd';

const itemsTabs = [
  {
    key: '1',
    label: (
      <Link className='link' to='/'>
        Search
      </Link>
    ),
  },
  {
    key: '2',
    label: (
      <Link className='link' to='/rated'>
        Rated
      </Link>
    ),
  },
];

function App() {
  return (
    <div>
      <section className='container'>
        <Header />
        <Tabs
          centered
          defaultActiveKey='1'
          items={itemsTabs}
          className='styleTab'
        />

        {/* <CardCollection /> */}
        <Routes>
          <Route path='/' element={<SearchPage />} />
          <Route path='/rated' element={<Rated />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
