import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import {selectCurrentUser, selectCurrentUserLoadingStatus} from "../../redux/user/user.selectors";
import System from "../../backend/System";
import FormInput from "../form-elements/form-input.component";
import FormButton from "../form-elements/form-buttom.component";
import ButtonSpinner from "../spinners/button-spinner.component";
import {updateUserPrimaryProfileStart} from "../../redux/user/user.actions";

class UserPrimaryProfileComponent extends React.Component{
    constructor(props) {
        super(props);

        const { user } = this.props.currentUser;
        this.state = {
            name: user.name,
            email: user.email,
            phone: user.phone,
            dateOfBirth: user.dateOfBirth,
            username: user.username,
            gender: user.gender,
            image: user.image,

            currentImage: ''
        }
    }

    handleChange = (event) => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    }

    handleFileChange = (event) => {
        const { files, name } = event.target;
        this.setState({ [name]: files[0] });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        // Create the formData
        const formData = new FormData();

        formData.append('name', this.state.name);
        formData.append('phone', this.state.phone);
        formData.append('dateOfBirth', this.state.dateOfBirth);
        formData.append('username', this.state.username);
        formData.append('gender', this.state.gender);
        formData.append('image', this.state.image);


        //Post form data
        this.props.updatePrimaryProfile(formData);
    }

    render() {
        const updateError = null;
        return (
            <div className="tab-pane fade show active" id="profile" role="tabpanel"
                 aria-labelledby="profile-tab">
                <div className="mb-4">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h6 className="card-title mb-4">Basic Information</h6>
                            <form onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Name</label>
                                            <FormInput
                                                placeholder="App name"
                                                type="text"
                                                name='name'
                                                handleChange={this.handleChange}
                                                className={' form-control ' + ((updateError)? 'is-invalid' : '')}
                                                value={this.state.name}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Username</label>
                                            <FormInput
                                                placeholder="Username"
                                                type="text"
                                                name='username'
                                                handleChange={this.handleChange}
                                                className={' form-control ' + ((updateError)? 'is-invalid' : '')}
                                                value={this.state.username}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Email</label>
                                            <FormInput
                                                placeholder="Email"
                                                disabled
                                                type="email"
                                                className={' form-control ' + ((updateError)? 'is-invalid' : '')}
                                                value={this.state.email}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Date of Birth</label>
                                            <FormInput
                                                placeholder="Date of birth"
                                                type="date"
                                                name='dateOfBirth'
                                                handleChange={this.handleChange}
                                                className={' form-control ' + ((updateError)? 'is-invalid' : '')}
                                                value={this.state.dateOfBirth}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Gender</label>
                                            <div>
                                                <div className="form-check form-check-inline">
                                                    <input type="radio" value="Male" onChange={this.handleChange} checked={(this.state.gender === "Male")} id="inlineRadio1" name="gender"
                                                           className="form-check-input" />
                                                    <label className="form-check-label"
                                                           htmlFor="inlineRadio1">Male</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input type="radio" value="Female" onChange={this.handleChange} checked={(this.state.gender === "Female")} id="inlineRadio2" name="gender"
                                                           className="form-check-input" />
                                                    <label className="form-check-label"
                                                           htmlFor="inlineRadio2">Female</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input type="radio" value="Complicated" onChange={this.handleChange} checked={(this.state.gender === "Complicated")} id="inlineRadio3" name="gender"
                                                           className="form-check-input" />
                                                    <label className="form-check-label"
                                                           htmlFor="inlineRadio3">Other</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Phone</label>
                                            <FormInput
                                                placeholder="Date of birth"
                                                type="tel"
                                                name='phone'
                                                handleChange={this.handleChange}
                                                className={' form-control ' + ((updateError)? 'is-invalid' : '')}
                                                value={this.state.phone}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Image</label>
                                            <FormInput
                                                type="file"
                                                name='image'
                                                handleChange={this.handleFileChange}
                                                className={' form-control ' + ((updateError)? 'is-invalid' : '')}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <FormButton type="submit" disabled={this.props.isUpdating} category='primary' >
                                                { this.props.isUpdating ? (<ButtonSpinner />): 'Save changes' }
                                            </FormButton>
                                        </div>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    isUpdating: selectCurrentUserLoadingStatus,
});
const  mapDispatchToProps = dispatch => ({
    updatePrimaryProfile: formData => dispatch(updateUserPrimaryProfileStart({ formData }))
})
export default connect(mapStateToProps, mapDispatchToProps)(UserPrimaryProfileComponent);