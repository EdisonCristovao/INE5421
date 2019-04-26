import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import {
  COLLAPSED_DRAWER,
  FIXED_DRAWER,
  HORIZONTAL_NAVIGATION,
  INSIDE_THE_HEADER
} from "constants/ActionTypes";
import SearchBox from "components/SearchBox";
import MailNotification from "../MailNotification/index";
import AppNotification from "../AppNotification/index";
import CardHeader from "components/dashboard/Common/CardHeader/index";
import { switchLanguage, toggleCollapsedNav } from "actions/Setting";
import IntlMessages from "util/IntlMessages";
import LanguageSwitcher from "components/LanguageSwitcher/index";
import FunctionSwitcher from "./FunctionSwitcher";
import UserInfo from "components/UserInfo";
import Menu from "components/Header/Menu";

class Header extends React.Component {
  onAppNotificationSelect = () => {
    this.setState({
      appNotification: !this.state.appNotification
    });
  };
  onMailNotificationSelect = () => {
    this.setState({
      mailNotification: !this.state.mailNotification
    });
  };

  onUserInfoSelect = () => {
    this.setState({
      userInfo: !this.state.userInfo
    });
  };

  onLangSwitcherSelect = event => {
    this.setState({
      langSwitcher: !this.state.langSwitcher
    });
  };
  onSearchBoxSelect = () => {
    this.setState({
      searchBox: !this.state.searchBox
    });
  };
  handleRequestClose = () => {
    this.setState({
      langSwitcher: false,
      mailNotification: false,
      appNotification: false,
      searchBox: false
    });
  };
  onToggleCollapsedNav = e => {
    const val = !this.props.navCollapsed;
    this.props.toggleCollapsedNav(val);
  };

  constructor() {
    super();
    this.state = {
      searchBox: false,
      searchText: "",
      mailNotification: false,
      langSwitcher: false,
      appNotification: false,
      userInfo: false
    };
  }

  updateSearchText(evt) {
    this.setState({
      searchText: evt.target.value
    });
  }

  render() {
    const {
      drawerType,
      locale,
      navigationStyle,
      horizontalNavPosition,
      language,
      selectedLanguage
    } = this.props;
    const drawerStyle = drawerType.includes(FIXED_DRAWER)
      ? "d-flex d-xl-none"
      : drawerType.includes(COLLAPSED_DRAWER)
      ? "d-flex"
      : "d-none";

    return (
      <div className="app-main-header">
        <div className="d-flex app-toolbar align-items-center">
          {navigationStyle === HORIZONTAL_NAVIGATION ? (
            <div className="app-logo-bl">
              <div className="d-block d-md-none">
                <span
                  className="jr-menu-icon"
                  onClick={this.onToggleCollapsedNav}
                >
                  <span className="menu-icon" />
                </span>
              </div>
              <div className="app-logo pointer d-none d-md-block">
                <img
                  className="d-none d-lg-block"
                  alt="..."
                  src="http://via.placeholder.com/105x36"
                />
                <img
                  className="d-block d-lg-none mr-3"
                  alt="..."
                  src="http://via.placeholder.com/32x32"
                />
              </div>
            </div>
          ) : (
            <span
              className={`jr-menu-icon pointer ${drawerStyle}`}
              onClick={this.onToggleCollapsedNav}
            >
              <span className="menu-icon" />
            </span>
          )}

          <div>
            <h1 className="m-0">
              {language === undefined
                ? "Escolha ou selecione uma linguagem"
                : language.name}
            </h1>
          </div>

          {selectedLanguage !== null && (
            <ul className="header-notifications list-inline ml-auto">
              <li className="list-inline-item">
                <Dropdown
                  className="quick-menu"
                  isOpen={this.state.langSwitcher}
                  toggle={this.onLangSwitcherSelect.bind(this)}
                >
                  <DropdownToggle
                    className="d-inline-block"
                    tag="span"
                    data-toggle="dropdown"
                  >
                    <div className="d-flex align-items-center pointer">
                      <i class="zmdi zmdi-more-vert zmdi-hc-2x" />
                    </div>
                  </DropdownToggle>

                  <DropdownMenu right className="w-50">
                    <FunctionSwitcher />
                  </DropdownMenu>
                </Dropdown>
              </li>
            </ul>
          )}
          {/* <li className="d-inline-block d-lg-none list-inline-item">
                            <Dropdown
                                className="quick-menu nav-searchbox"
                                isOpen={this.state.searchBox}
                                toggle={this.onSearchBoxSelect.bind(this)}>

                                <DropdownToggle
                                    className="d-inline-block"
                                    tag="span"
                                    data-toggle="dropdown">
                                    <span className="icon-btn size-30">
                                        <i className="zmdi zmdi-search zmdi-hc-fw"/>
                                    </span>
                                </DropdownToggle>

                                <DropdownMenu right className="p-0">
                                    <SearchBox styleName="search-dropdown" placeholder=""
                                               onChange={this.updateSearchText.bind(this)}
                                               value={this.state.searchText}/>
                                </DropdownMenu>
                            </Dropdown>
                        </li> */}
          {/* <li className="list-inline-item app-tour">
                            <Dropdown
                                className="quick-menu"
                                isOpen={this.state.appNotification}
                                toggle={this.onAppNotificationSelect.bind(this)}>

                                <DropdownToggle
                                    className="d-inline-block"
                                    tag="span"
                                    data-toggle="dropdown">
                                    <span className="icon-btn size-20 font-size-16">
                                        <i className="zmdi zmdi-notifications-active zmdi-hc-lg icon-alert"/>
                                    </span>
                                </DropdownToggle>

                                <DropdownMenu right>
                                    <CardHeader styleName="align-items-center"
                                                heading={<IntlMessages id="appNotification.title"/>}/>
                                    <AppNotification/>
                                </DropdownMenu>
                            </Dropdown>
                        </li> */}
          {/* <li className="list-inline-item mail-tour">
                            <Dropdown
                                className="quick-menu"
                                isOpen={this.state.mailNotification}
                                toggle={this.onMailNotificationSelect.bind(this)}
                            >
                                <DropdownToggle
                                    className="d-inline-block"
                                    tag="span"
                                    data-toggle="dropdown">

                                    <span className="icon-btn size-20 font-size-16">
                                        <i className="zmdi zmdi-comment-alt-text icon-alert zmdi-hc-lg"/>
                                    </span>
                                </DropdownToggle>


                                <DropdownMenu right>
                                    <CardHeader styleName="align-items-center"
                                                heading={<IntlMessages id="mailNotification.title"/>}/>
                                    <MailNotification/>
                                </DropdownMenu>
                            </Dropdown>
                        </li> */}
          {/* <li className="list-inline-item user-nav">
                            <Dropdown
                                className="quick-menu"
                                isOpen={this.state.userInfo}
                                toggle={this.onUserInfoSelect.bind(this)}>

                                <DropdownToggle
                                    className="d-inline-block"
                                    tag="span"
                                    data-toggle="dropdown">
                                    <img
                                        alt='...'
                                        src='http://via.placeholder.com/150x150'
                                        className="pointer user-avatar size-30"/>
                                </DropdownToggle>

                                <DropdownMenu right>

                                    <UserInfo/>
                                </DropdownMenu>
                            </Dropdown>

                        </li> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ settings, languages }) => {
  const {
    drawerType,
    locale,
    navigationStyle,
    horizontalNavPosition
  } = settings;
  const { listLanguages, selectedLanguage } = languages;

  return {
    drawerType,
    locale,
    navigationStyle,
    horizontalNavPosition,
    listLanguages,
    selectedLanguage
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { toggleCollapsedNav, switchLanguage }
  )(Header)
);
