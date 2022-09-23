import axios from "axios";
import Api from "./Api";

class Buyer extends Api{

    fetchMyBuyerProfile = async () => {
        return await axios.get(`${this.endPoint()}/buyers/account/me`,{ withCredentials: true });
    }

    updateBuyerProfile = async ({ formData, userId }) => {
        return await axios.patch(`${this.endPoint()}/buyers/user-account/${userId}`,  formData,{
            withCredentials: true,
        });
    }

    fetchBuyerProfile = async (user_id) => {
        return await axios.get(`${this.endPoint()}/buyers/user-account/${user_id}`,{ withCredentials: true });
    }

}

export default new Buyer;