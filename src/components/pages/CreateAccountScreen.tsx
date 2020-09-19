import React from 'react';
import MainLayout from '../layouts/MainLayout';
import {Row, Typography, Button, Col} from 'antd';
import {connect} from 'react-redux';
import {SyncOutlined, LoginOutlined} from '@ant-design/icons';
import {withRouter, RouteComponentProps} from "react-router-dom";
import {getPath} from "utils/router-paths";
import {faucetAboundAsync} from "features/faucet/actions";
import {login} from "features/auth/actions";
import {generateNewAccount} from "features/lisk-node-api/utils";
import {LiskAccountCredentials} from 'services/types';

type State = {
  generatedAccount: Partial<LiskAccountCredentials>;
};

type Props = typeof mapDispatchToProps & RouteComponentProps<any>;

export class CreateAccountScreen extends React.Component<Props, State> {

  readonly state = {
    generatedAccount: {
      passphrase: undefined,
      publicKey: undefined,
      address: undefined,
    },
  };

  componentDidMount(): void {
    this.rollNewAccount();
  }

  rollNewAccount = () => {
    this.setState({generatedAccount: generateNewAccount()});
  };

  login = () => {

    this.props.login(this.state.generatedAccount.passphrase!);
    this.props.abound({
      recipientId: this.state.generatedAccount.address!,
      amount: '10000',
    });
    this.props.history.push(getPath('account'));
  };

  render() {

    return <MainLayout>
      <Typography.Title className={'uk-text-center'}>
        Create an account
      </Typography.Title>

      <Typography.Paragraph className={'uk-text-center'}>
        Creating a new account to get started
      </Typography.Paragraph>

      <Row justify='center'>
        <Button type="ghost" icon={<SyncOutlined/>} onClick={this.rollNewAccount}>
          Generate a new account
        </Button>
      </Row>

      <Row justify="center" className='uk-margin-large-top'>
        <Col xs={{span: 5, offset: 0}} lg={{span: 1, offset: 0}} className='uk-text-right'>Passphrase</Col>
        <Col xs={{span: 24, offset: 0}} lg={{span: 10, offset: 1}}>
          <Typography.Paragraph copyable code>
            {this.state.generatedAccount.passphrase}
          </Typography.Paragraph>
        </Col>
      </Row>

      <Row justify="center">
        <Col xs={{span: 5, offset: 0}} lg={{span: 1, offset: 0}} className='uk-text-right'>Address</Col>
        <Col xs={{span: 24, offset: 0}} lg={{span: 10, offset: 1}}>
          <Typography.Paragraph copyable className='uk-text-right'>
            {this.state.generatedAccount.address}
          </Typography.Paragraph>
        </Col>
      </Row>

      <Row justify='center' className='uk-margin-large-top'>
        <Button type="primary" icon={<LoginOutlined/>} onClick={this.login}>
          Login with this account
        </Button>
      </Row>

    </MainLayout>;
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = {
  login,
  abound: faucetAboundAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateAccountScreen));
