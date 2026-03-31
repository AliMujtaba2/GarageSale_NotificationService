const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
require('dotenv').config();

// Initialize Firebase Admin SDK
let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  // For production (Vercel): Use environment variable
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
  // For local development: Use service account file
  serviceAccount = require('./serviceAccountKey.json');
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();

// Middleware
app.use(cors()); // Allow requests from your React Native app
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    status: 'Server is running',
    service: 'GarageSale Notification Server'
  });
});

// Main endpoint to send push notifications
app.post('/send-notification', async (req, res) => {
  try {
    const { recipientId, senderId, senderEmail, text, conversationId } = req.body;

    // Validate required fields
    if (!recipientId || !senderId || !text) {
      return res.status(400).json({ 
        error: 'Missing required fields: recipientId, senderId, text' 
      });
    }

    console.log('📬 Sending notification to user:', recipientId);

    // Get recipient's FCM token from Firestore
    const userDoc = await admin.firestore()
      .collection('users')
      .doc(recipientId)
      .get();

    if (!userDoc.exists) {
      console.log('❌ User not found:', recipientId);
      return res.status(404).json({ error: 'Recipient user not found' });
    }

    const fcmToken = userDoc.data().fcmToken;

    if (!fcmToken) {
      console.log('❌ No FCM token for user:', recipientId);
      return res.status(400).json({ error: 'Recipient has no FCM token' });
    }

    // Prepare notification payload
    const payload = {
      token: fcmToken,
      notification: {
        title: `New message from ${senderEmail || 'Someone'}`,
        body: text.substring(0, 100) // Limit to 100 characters
      },
      data: {
        type: 'message',
        senderId: senderId,
        recipientId: recipientId,
        senderEmail: senderEmail,
        conversationId: conversationId || ''
        
      },
      android: {
        priority: 'high',
        notification: {
          sound: 'default',
          channelId: 'messages'
        }
      },
      apns: {
        payload: {
          aps: {
            sound: 'default',
            badge: 1
          }
        }
      }
    };

    // Send notification via FCM
    const response = await admin.messaging().send(payload);
    
    console.log('✅ Notification sent successfully:', response);
    
    res.json({ 
      success: true, 
      messageId: response,
      recipient: recipientId 
    });

  } catch (error) {
    console.error('❌ Error sending notification:', error);
    res.status(500).json({ 
      error: 'Failed to send notification',
      details: error.message 
    });
  }
});

app.post('/send-call-notification', async (req, res) => {
  try {
    const { recipientId, senderId, senderEmail, callType, meetingId } = req.body;

    if (!recipientId || !senderId || !callType || !meetingId) {
      return res.status(400).json({ error: 'Missing required fields for call' });
    }

    console.log('📞 Sending call notification to:', recipientId);

    const userDoc = await admin.firestore().collection('users').doc(recipientId).get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: 'Recipient not found' });
    }

    const fcmToken = userDoc.data().fcmToken;
    if (!fcmToken) return res.status(400).json({ error: 'Recipient has no FCM token' });

    const payload = {
      token: fcmToken,
      data: {
        type: 'incoming_call',
        senderId,
        recipientId,
        senderEmail: senderEmail,
        callType,
        meetingId
      },
      android: {
        priority: 'high',
        notification: {
          sound: 'default',
          channelId: 'calls'
        }
      },
      apns: {
        payload: {
          aps: {
            sound: 'default',
            badge: 1
          }
        }
      }
    };

    const response = await admin.messaging().send(payload);

    console.log('✅ Call notification sent:', response);

    res.json({ success: true, messageId: response });

  } catch (error) {
    console.error('❌ Error sending call notification:', error);
    res.status(500).json({ error: 'Failed to send call notification', details: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Notification server running on port ${PORT}`);
  console.log(`📡 Ready to send push notifications`);
});
