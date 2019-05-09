import React from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { Button } from "reactstrap";
import loadTest from "./LoadTest";
import IntlMessages from "util/IntlMessages";
import LoadTest from "./LoadTest";

const Welcome = ({ loadStorageTest, history }) => (
  <div className="app-wrapper page-error-container animated slideInUpTiny animation-duration-3">
    <div className="page-error-content">
      <div className=" mb-4 animated zoomInDown">
        <img src="assets/images/excited-Woman.png" style={{ width: "100%" }} />
      </div>
      <h2 className="text-center fw-regular title bounceIn animation-delay-10 animated mb-0">
        Bem vindo
      </h2>
      <h1 className="text-center fw-regular title bounceIn animation-delay-15 animated mt-0">
        Fm.io
      </h1>
      {/* <form className="mb-4" role="search">
                <div className="search-bar flipInX animation-delay-16 animated">
                    <div className="form-group">
                        <input type="search" className="form-control form-control-lg border-0"
                               placeholder="Search..."/>
                        <button className="search-icon">
                            <i className="zmdi zmdi-search zmdi-hc-lg"/>
                        </button>
                    </div>
                </div>
            </form> */}
      <p className="text-center zoomIn animation-delay-20 animated">
        <Link className="btn btn-primary" to="/app/dashboard">
          Dashboard
        </Link>
        <Button color="secondary" onClick={() => {loadStorageTest(LoadTest); history.push('/app/dashboard')}}>Quero testar</Button>
      </p>
      <p className="text-center zoomIn animation-delay-20 animated">
      </p>
    </div>
  </div>
);

const mapDispatchToProps = dispatch => {
  return {
    loadStorageTest: languages => dispatch({ type: "LOAD_STORAGE", payload: languages })
  }
}

export default connect(null, mapDispatchToProps)(withRouter(Welcome));
