import React from 'react';
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import AppContainerComponent from "../../components/layouts/app-container.component";
import UserProfileBannerComponent from "../../components/users/user-profile-banner.component";
import UserPasswordResetComponent from "../../components/users/user-password-reset.component";
import UserPrimaryProfileComponent from "../../components/users/user-primary-profile.component";
import UserBuyerProfileComponent from "../../components/users/user-buyer-profile.component";
import UserBusinessProfileComponent from "../../components/users/user-business-profile.component";
import UserOperationsComponent from "../../components/users/user-operations-componenent";
import UserProfileSwitchComponent from "../../components/users/user-profile-switch.component";

const CurrentUserProfilePage = ({ currentUser }) => {


    return (
        <AppContainerComponent>
           <UserProfileBannerComponent />
            <div className="row flex-column-reverse flex-md-row">
                <div className="col-md-8">
                    <div className="tab-content" id="myTabContent">

                        <UserPrimaryProfileComponent />

                        <UserPasswordResetComponent />

                        <UserBuyerProfileComponent user={currentUser} />

                        <UserBusinessProfileComponent />

                        <UserOperationsComponent />

                    </div>
                </div>

                {/*Toggling between profile sections*/}
               <UserProfileSwitchComponent />

            </div>
        </AppContainerComponent>
    );
}
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})
export default connect(mapStateToProps)(CurrentUserProfilePage);