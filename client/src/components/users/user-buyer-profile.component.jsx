import React, { useState, useEffect } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import {selectBuyerError, selectBuyerLoadingStatus, selectCurrentBuyer} from "../../redux/buyer/buyer.selectors";
import Buyer from "../../backend/Buyer";
import FormInput from "../form-elements/form-input.component";
import FormButton from "../form-elements/form-buttom.component";
import ButtonSpinner from "../spinners/button-spinner.component";
import {updateBuyerProfileStart} from "../../redux/buyer/buyer.actions";


class UserBuyerProfileComponent extends React.Component{
    constructor() {
        super();

        this.state = {
            address: '',
            location: '',
            city: '',
            state: '',
            country: '',
            postcode: '',
        }

    }

    fetchBuyerProfile = async (user_id) => {
       return await Buyer.fetchBuyerProfile(user_id).then(response => {
           const { buyer } = response.data;
           this.setState({address: buyer.address});
           this.setState({location: buyer.location});
           this.setState({city: buyer.city});
           this.setState({state: buyer.state});
           this.setState({country: buyer.country});
           this.setState({postcode: buyer.postcode});
           console.log(buyer);
       })
    }

    componentDidMount() {
        this.fetchBuyerProfile(this.props.user.user._id);
    }

    handleChange = (event) => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        this.props.updateUserBuyerProfile(this.state, this.props.user.user._id);
    }

    render() {
        const { buyerError, isUpdating } = this.props;
        return (
            <div className="tab-pane fade" id="buyer-profile" role="tabpanel" aria-labelledby="buyer-profile-tab">
                <div className="mb-4">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h6 className="card-title mb-4">Buyer Information</h6>
                            <form onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Address</label>
                                            <FormInput
                                                placeholder="Buyer address"
                                                type="text"
                                                name='address'
                                                handleChange={this.handleChange}
                                                className={' form-control ' + ((buyerError)? 'is-invalid' : '')}
                                                value={this.state.address}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Location</label>
                                            <FormInput
                                                placeholder="Delivery location"
                                                type="text"
                                                name='location'
                                                handleChange={this.handleChange}
                                                className={' form-control ' + ((buyerError)? 'is-invalid' : '')}
                                                value={this.state.location}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">City</label>
                                            <FormInput
                                                placeholder="City"
                                                type="text"
                                                name='city'
                                                handleChange={this.handleChange}
                                                className={' form-control ' + ((buyerError)? 'is-invalid' : '')}
                                                value={this.state.city}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">State</label>
                                            <FormInput
                                                placeholder="State"
                                                type="text"
                                                name='state'
                                                handleChange={this.handleChange}
                                                className={' form-control ' + ((buyerError)? 'is-invalid' : '')}
                                                value={this.state.state}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Country</label>
                                            <FormInput
                                                placeholder="Country"
                                                type="text"
                                                name='country'
                                                handleChange={this.handleChange}
                                                className={' form-control ' + ((buyerError)? 'is-invalid' : '')}
                                                value={this.state.country}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Postcode</label>
                                            <FormInput
                                                placeholder="Post code"
                                                type="text"
                                                name='postcode'
                                                handleChange={this.handleChange}
                                                className={' form-control ' + ((buyerError)? 'is-invalid' : '')}
                                                value={this.state.postcode}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <FormButton type="submit" disabled={isUpdating} category='primary' >
                                            { isUpdating ? (<ButtonSpinner />): 'Save changes' }
                                        </FormButton>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = createStructuredSelector({
   currentBuyer: selectCurrentBuyer,
   updateError: selectBuyerError,
   isUpdating: selectBuyerLoadingStatus
});
const mapDispatchToProps = dispatch => ({
   updateUserBuyerProfile: (formData, userId) => dispatch(updateBuyerProfileStart({ formData, userId }))
});
export default connect(mapStateToProps, mapDispatchToProps)(UserBuyerProfileComponent);