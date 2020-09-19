import React from 'react';
import MainLayout from '../layouts/MainLayout';
import {FormattedMessage} from 'react-intl';
import {Typography, Form, Input, Button} from 'antd';
import {Col, Row} from "antd/es";
import {connect} from 'react-redux';
import lisk from '@liskhq/lisk-client';
import {withRouter, RouteComponentProps} from "react-router-dom";
import {getPath} from "../utils/router-paths";
import {login} from "../features/auth/actions";

type State = {};

type Props = typeof mapDispatchToProps & RouteComponentProps<any>;

export class LoginScreen extends React.Component<Props, State> {

  onFinish = (values: any) => {
    this.props.login(values.passphrase);
    this.props.history.push(getPath('account'));
  };

  render() {

    return <MainLayout>
      <Typography.Title className={'uk-text-center'}>
        <FormattedMessage id="hi" defaultMessage={"Sign In"}/>
      </Typography.Title>

      <Row justify={'center'} className={'uk-margin-large-top'}>
        <Col xs={22} xl={11}>
          <Form name="normal_login"
                className="login-form"
                onFinish={this.onFinish}
          >
            <Form.Item
              name="passphrase"
              rules={[
                {validator: (_, value) => lisk.passphrase.Mnemonic.validateMnemonic(value) ? Promise.resolve() : Promise.reject('Invalid passphrase')},
              ]}
            >
              <Input.Password placeholder="Passphrase"/>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>

          </Form>
        </Col>
      </Row>

    </MainLayout>;
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginScreen));
