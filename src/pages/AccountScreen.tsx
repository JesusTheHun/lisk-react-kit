import React from 'react';
import {FormattedMessage} from 'react-intl';
import {Typography, Button, Modal} from 'antd';
import {connect} from 'react-redux';
import {withRouter, RouteComponentProps} from "react-router-dom";
import {getPath} from "../utils/router-paths";
import MainLayout from "../layouts/MainLayout";
import AccountDetailsComponent from "../components/AccountDetails";
import QRCodeModal from "../components/QRCodeModal";
import {QrcodeOutlined} from '@ant-design/icons';
import _ from "lodash";
import {RootState} from "../store/types";
import {fetchAccountAsync} from "../features/lisk-node-api/actions/account";

type State = {
  isModalOpen: boolean;
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & RouteComponentProps<any>;

export class AccountScreen extends React.Component<Props, State> {

  readonly state = {
    isModalOpen: false,
  };

  componentDidMount() {
    if (_.isEmpty(this.props.auth.passphrase)) {
      this.props.history.push(getPath("login"));
      return;
    }
  }

  toggleModal = () => {
    this.setState(state => ({
      isModalOpen: !state.isModalOpen,
    }));
  };

  onRefresh = () => {
    this.props.fetchAccount(this.props.auth.address!);
  };

  render() {

    return <MainLayout>
      <div className="uk-flex uk-flex-column uk-height-1-1">
        <Typography.Title className={'uk-text-center'}>
          <FormattedMessage id="hi" defaultMessage={"Your account"}/>
        </Typography.Title>

        <Modal title="Link to your account" visible={this.state.isModalOpen} footer={[]} onCancel={this.toggleModal}>
          <QRCodeModal address={this.props.auth.address!}/>
        </Modal>

        <div className='uk-flex'>
          <div className="uk-flex-none">
            <Button type='primary' icon={<QrcodeOutlined/>} onClick={this.toggleModal}>Download your QRCode</Button>
          </div>

        </div>

        <AccountDetailsComponent/>

      </div>
    </MainLayout>;
  }
}

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
  account: state.lisk.account,
  transaction: state.lisk.transaction,
});

const mapDispatchToProps = {
  fetchAccount: fetchAccountAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AccountScreen));
