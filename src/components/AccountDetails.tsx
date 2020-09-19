import React from "react";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {Button, Card, Typography} from "antd";
import {connect} from "react-redux";
import {SyncOutlined} from "@ant-design/icons";
import _ from "lodash";
import {utils} from "@liskhq/lisk-transactions";
import {RootState} from 'store/types';
import {fetchAccountAsync} from "../features/lisk-node-api/actions/account";
import {LiskAddress} from "../services/types";

type State = {};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & RouteComponentProps<any> & {
  address: LiskAddress;
};

export class AccountDetails extends React.Component<Props, State> {

  interval: NodeJS.Timeout;

  constructor(props: Props, context: any) {
    super(props, context);

    this.interval = setInterval(() => this.refreshAccountDetails(), 10 * 1000)
  }

  componentDidMount() {
    this.refreshAccountDetails();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  refreshAccountDetails = () => {
    this.props.fetchAccount(this.props.address)
  };

  render() {
    return <Card
      title="Account details"
      extra={<Button icon={<SyncOutlined spin={this.props.account.isLoading}/>} onClick={this.refreshAccountDetails}/>}
      className="uk-margin-small-top"
    >
      <div>
        <strong>Address</strong> : <Typography.Text copyable>
        {this.props.address}
      </Typography.Text>
      </div>
      <div>
        <strong>Balance</strong> : {this.props.account.entity ? utils.convertBeddowsToLSK(this.props.account.entity.balance) : 0} LSK
      </div>
    </Card>
  }
}

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
  account: state.lisk.account,
});

const mapDispatchToProps = {
  fetchAccount: fetchAccountAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AccountDetails));
