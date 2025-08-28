import axios from "axios";
import { asyncHandler }  from "./asyncHandler.js";

const sendSMS = async (phoneNumber, message) => {
    try {
        console.log("phoneNumber",phoneNumber)
        const response = await axios.post('https://www.fast2sms.com/dev/bulkV2', {
            message: message,
            language: 'english',
            route: 'q',
            numbers: phoneNumber
        }, {
            headers: {
                'authorization': process.env.SMS_API_KEY
            }
        });

        console.log(response.data);
    } catch (error) {
        if (error.response) {
            console.error('Error response:', error.response.data);
            throw new Error(error.response.data);
        } else if (error.request) {
            console.error('Error request:', error.request);
            throw new Error('No response received from SMS API');
        } else {
            console.error('Error message:', error.message);
            throw new Error(error.message);
        }
    }
};

export default sendSMS;