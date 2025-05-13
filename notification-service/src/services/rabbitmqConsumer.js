exports.sendNotification = async ({ userId, type, message }) => {
  // Simule l'envoi d'une notification (email, SMS, etc.)
  console.log(`🔔 [NOTIFY] To: ${userId} | Type: ${type} | Message: ${message}`);
  // En prod : appeler un service externe (e.g. SendGrid, Twilio, etc.)
};
