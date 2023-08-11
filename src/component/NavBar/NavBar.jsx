import { Tabs } from 'antd';

const onChange = (key) => {
  console.log(key);
};

const items = [
  {
    key: '1',
    label: `Search`,
  },
  {
    key: '2',
    label: `Rated`,
  },
];

const NavBar = () => <Tabs defaultActiveKey='1' centered onChange={onChange} />;

export default NavBar;
