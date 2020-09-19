import React from 'react';
import MainLayout from '../layouts/MainLayout';
import {Typography} from 'antd';

type Props = {};

type State = {};

class HomeScreen extends React.Component<Props, State> {

  render() {
    return <MainLayout>
      <Typography.Title className={'uk-text-center'}>
        Lisk React Kit
      </Typography.Title>
    </MainLayout>
  }
}

export default HomeScreen;
