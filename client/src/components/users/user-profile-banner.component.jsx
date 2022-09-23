import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import System from "../../backend/System";
const UserProfileBannerComponent = ({ currentUser }) => {

    return (
      <div>
          <div className="profile-cover bg-image mb-4"  style={{ backgroundImage:`url(${System.userImagePath("profile-bg.jpg")})` }}>
              <div className="container d-flex align-items-center justify-content-center h-100 flex-column flex-md-row text-center text-md-start">
                  <div className="avatar avatar-xl me-3">
                      <img src={System.userImagePath(currentUser.user.image)} className="rounded-circle"
                           alt="user profile picture" />
                  </div>
                  <div className="my-4 my-md-0">
                      <h3 className="mb-1">{currentUser.user.name}</h3>
                      <small>{currentUser.user.email}</small>
                  </div>
                  <div className="ms-md-auto">
                      <a href="settings.html" className="btn btn-primary btn-lg btn-icon">
                          <i className="bi bi-pencil small"></i> Edit Profile
                      </a>
                  </div>
              </div>
          </div>

          <div className="row g-4">
              <div className="col-lg-7 col-md-12">
                  <ul className="nav nav-pills mb-4">
                      <li className="nav-item">
                          <a className="nav-link active" href="#">Products</a>
                      </li>
                      <li className="nav-item">
                          <a className="nav-link " href="#">Orders</a>
                      </li>
                  </ul>

              </div>
          </div>
      </div>
    );
}
const mapStateToProps = createStructuredSelector({
   currentUser: selectCurrentUser
});
export default connect(mapStateToProps)(UserProfileBannerComponent);