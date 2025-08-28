import admin from 'firebase-admin';
import { firebase } from '../serviceAccountKey.js'
import { ApiError } from "../utils/ApiError.js";
import { FCMDevice } from '../models/User.js';

admin.initializeApp({
    credential: admin.credential.cert(firebase),
});


export const authenticateToken = async (req, res, next) => {
  const { provider, token } = req.body
  
  if(!provider){
      return next();
  }
  if (!token) {
      return res.status(401).json(new ApiError(401, "Access token required"));
  }
  try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      req.user = decodedToken;
      next();
  } catch (error) {
      return res.status(401).json(new ApiError(401, "Invalid Access Token"));
  }

};


const db = admin.firestore();

export const addDataToFirestore = async(req, res) => {
  try {
    const data = {
      name: 'John Doe',
      age: 30,
      email: 'johndoe@example.com',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };

    const res = await db.collection('delivery_locations').add(data);
    
    console.log('Document written with ID: ', res.id);
  } catch (error) {
    console.error('Error adding document: ', error);
  }
  
}


// send notification for multiple device
export const sendNotification = async (user_id, message) => {
  try {
    const query = user_id ? { user_id } : {}
    const devices = await FCMDevice.find(query);

    if (!devices || devices.length === 0) {
      console.error('No devices found for this user');
      return;
    }

    const tokens = devices.map(device => device.fcm_token).filter(token => token);

    if (tokens.length === 0) {
      console.error('No valid FCM tokens found');
      return;
    }

    const payload = {
      notification: {
        title: message.title,
        body: message.body,
      },
    };

    const response = await admin.messaging().sendEachForMulticast({
      tokens: tokens,
      ...payload,
    });

    console.log('Successfully sent messages:', response);
  } catch (error) {
    console.error('Error sending message:', error.message);
  }

};