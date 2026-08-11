enum Notification {
  EMAIL = "Email",
  SMS = "SMS",
}

// Problem
// Tight coupling
// _NotificationInterface owns send function logic, if it has to be changed - the interface has to changed
class _NotificationInterface {
  send({
    notification,
    message,
  }: {
    notification: Notification;
    message: string;
  }): void {
    switch (notification) {
      case Notification.EMAIL:
        console.log(`Sending ${notification}: ${message}`);
        break;
      case Notification.SMS:
        console.log(`Sending ${notification}: ${message}`);
        break;
    }
  }
}

const notificationInterface = new _NotificationInterface();
notificationInterface.send({
  notification: Notification.EMAIL,
  message: "Message",
});
notificationInterface.send({
  notification: Notification.SMS,
  message: "Message",
});

// Solution
// Loose coupling
// Simple Factory
// Every notification type is separate, if one of them has to be changed, the interface remains the same

// Contract
interface NotificationInterface {
  send(message: string): void;
}
class EmailNotification implements NotificationInterface {
  send(message: string): void {
    console.log(`Sending email: ${message}`);
    // do smth else
  }
}
class SmsNotification implements NotificationInterface {
  send(message: string): void {
    console.log(`Sending sms: ${message}`);
  }
}

// Factory owns creation decision
class NotificationFactory {
  static create(notification: Notification) {
    switch (notification) {
      case Notification.EMAIL:
        return new EmailNotification();
      case Notification.SMS:
        return new SmsNotification();
    }
  }
}

const emailNotification = NotificationFactory.create(Notification.EMAIL);
emailNotification.send("Message");
const smsNotification = NotificationFactory.create(Notification.SMS);
smsNotification.send("Message");
