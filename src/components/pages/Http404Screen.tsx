import React from 'react';
import MainLayout from '../layouts/MainLayout';
import {Typography} from 'antd';

type Props = {};

type State = {};

class Home extends React.Component<Props, State> {

  render() {
    return <MainLayout>
      <Typography.Title className={'uk-text-center'}>
        Page not found
      </Typography.Title>
    </MainLayout>;
  }
}

export default Home;
