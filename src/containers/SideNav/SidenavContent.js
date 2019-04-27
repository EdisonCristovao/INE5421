import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { Input, Button } from "reactstrap";

import IntlMessages from "util/IntlMessages";
import CustomScrollbars from "util/CustomScrollbars";
import { makeNewLanguage, changeSelectedLanguage } from "../../actions/index";

class SidenavContent extends Component {
  state = {
    newLanguageName: ""
  };

  componentDidMount() {
    const { history } = this.props;
    const that = this;
    const pathname = `#${history.location.pathname}`; // get current path

    const subMenuLi = document.querySelectorAll(".sub-menu > li");
    for (let i = 0; i < subMenuLi.length; i++) {
      subMenuLi[i].onclick = function(event) {
        event.stopPropagation();
      };
    }

    const menuLi = document.getElementsByClassName("menu");
    for (let i = 0; i < menuLi.length; i++) {
      menuLi[i].onclick = function(event) {
        for (let j = 0; j < menuLi.length; j++) {
          const parentLi = that.closest(this, "li");
          if (
            menuLi[j] !== this &&
            (parentLi === null || !parentLi.classList.contains("open"))
          ) {
            menuLi[j].classList.remove("open");
          }
        }
        this.classList.toggle("open");
        event.stopPropagation();
      };
    }

    const activeLi = document.querySelector('a[href="' + pathname + '"]'); // select current a element
    try {
      const activeNav = this.closest(activeLi, "ul"); // select closest ul
      if (activeNav.classList.contains("sub-menu")) {
        this.closest(activeNav, "li").classList.add("open");
      } else {
        this.closest(activeLi, "li").classList.add("open");
      }
    } catch (error) {}
  }

  closest(el, selector) {
    try {
      let matchesFn;
      // find vendor prefix
      [
        "matches",
        "webkitMatchesSelector",
        "mozMatchesSelector",
        "msMatchesSelector",
        "oMatchesSelector"
      ].some(function(fn) {
        if (typeof document.body[fn] == "function") {
          matchesFn = fn;
          return true;
        }
        return false;
      });

      let parent;

      // traverse parents
      while (el) {
        parent = el.parentElement;
        if (parent && parent[matchesFn](selector)) {
          return parent;
        }
        el = parent;
      }
    } catch (e) {}

    return null;
  }

  render() {
    const {
      listLanguages,
      selectedLanguage,
      makeNewLanguage,
      changeSelectedLanguage
    } = this.props;
    const { newLanguageName } = this.state;

    return (
      <CustomScrollbars className="scrollbar" style={{ height: "calc(100vh)" }}>
        {/* <CustomScrollbars className="scrollbar" style={{height: 'calc(100vh - 70px)'}}> */}
        <ul className="nav-menu">
          <li className="nav-header">Lista de linguagens</li>
          {/* <li className="menu no-arrow">
                        <NavLink to="/app/sample-page">
                            <i className="zmdi zmdi-view-dashboard zmdi-hc-fw"/>
                            <span className="nav-text"><IntlMessages id="pages.samplePage"/> </span>
                        </NavLink>
                    </li> */}

          {listLanguages.map((language, index) => (
            <li className="nav-header d-flex">
              <Button
                className="w-100 text-left mr-0"
                onClick={() => {
                  changeSelectedLanguage(index);
                  this.forceUpdate();
                }}
              >
                <i className="zmdi zmdi-view-dashboard zmdi-hc-fw" />
                <span className="nav-text">{language.name} </span>
              </Button>
              <Button className="ml-1">
                <i class="zmdi zmdi-tag-close p-0 m-0" />
              </Button>
            </li>
          ))}

          <li className="nav-header">
            <form>
              <Input
                type="text"
                placeholder="Nova linguagem"
                value={newLanguageName}
                onChange={e =>
                  this.setState({ newLanguageName: e.target.value })
                }
              />
              <Button
                type="submit"
                className="w-100 mt-1"
                color="primary"
                onClick={e => {
                  e.preventDefault();
                  makeNewLanguage(newLanguageName);
                  this.setState({ newLanguageName: "" });
                }}
              >
                <span className="nav-text"> Adicionar </span>
              </Button>
            </form>
          </li>
        </ul>
      </CustomScrollbars>
    );
  }
}

const mapState = ({ languages, language }) => {
  const { listLanguages, selectedLanguage } = languages;
  return { listLanguages, selectedLanguage };
};

export default connect(
  mapState,
  { makeNewLanguage, changeSelectedLanguage }
)(withRouter(SidenavContent));
