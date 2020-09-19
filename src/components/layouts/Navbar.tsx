import {Menu} from "antd";
import {Link, RouteComponentProps, withRouter} from "react-router-dom";
import {getPath} from "utils/router-paths";
import SubMenu from "antd/es/menu/SubMenu";
import React from "react";
import {UserAddOutlined} from '@ant-design/icons';
import {LoginOutlined, UserOutlined} from "@ant-design/icons/lib";
import {connect} from "react-redux";
import {Location} from "history";
import {logout} from "features/auth/actions";
import {fetchAccountAsync} from "features/lisk-node-api/actions/account";
import {RootState} from "store/types";

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & RouteComponentProps<any>;

type State = {
  activeKeys: string[];
};

export class Navbar extends React.Component<Props, State> {

  getActiveMenuKeys = (location: Location): string[] => {

    switch (true) {
      case location.pathname === getPath('createAccount'):
        return ['createAccount'];
      case location.pathname === getPath('login'):
        return ['login'];
      case location.pathname === getPath('account'):
        return ['account'];

      default:
        return ['home'];
    }
  };

  logout = (e: React.MouseEvent) => {
    e.preventDefault();

    this.props.logout();
    this.props.history.push(getPath("login"));
  };

  renderAnonymousAccountMenu = () => {
    return <SubMenu
      key="account"
      title={
        <span>
                <UserOutlined/>
                <span>Account</span>
                </span>
      }
    >
      <Menu.Item key='createAccount'>
        <UserAddOutlined/>
        <Link to={getPath('createAccount')}>Create an account</Link>
      </Menu.Item>
      <Menu.Item key='login'>
        <LoginOutlined/>
        <Link to={getPath('login')}>Sign in</Link>
      </Menu.Item>
    </SubMenu>
  };

  renderConnectedAccountMenu = () => {
    return <SubMenu
      key="account"
      onTitleClick={() => this.props.history.push(getPath('account'))}
      title={
        <span><UserOutlined/> Account</span>
      }
    >
      <Menu.Item key='signIn'>
        <LoginOutlined/>
        <a href={getPath('login')} onClick={this.logout}>Logout</a>
      </Menu.Item>
    </SubMenu>
  };

  render() {
    return <Menu
      theme="dark"
      mode="horizontal"
      style={{lineHeight: '64px'}}
      selectedKeys={this.getActiveMenuKeys(this.props.location)}
      forceSubMenuRender={true}
    >
      <Menu.Item key="home"><Link to={getPath('home')}>Home</Link></Menu.Item>
      {this.props.auth.passphrase ? this.renderConnectedAccountMenu() : this.renderAnonymousAccountMenu()}
    </Menu>
  }
}

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
  account: state.lisk.account.entity,
});

const mapDispatchToProps = {
  logout,
  fetchAccount: fetchAccountAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));
