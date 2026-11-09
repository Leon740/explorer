type NotificationType = "Email" | "SMS";

interface Notification {
  type: NotificationType;
  message: string;
}

// Problem
// One sender class owns the logic for every notification channel.
// Changing any channel requires modifying this shared sender class.

class DirectNotificationSender {
  send(notification: Notification): void {
    switch (notification.type) {
      case "Email":
        console.log(`Sending ${notification.type}: ${notification.message}`);
        break;
      case "SMS":
        console.log(`Sending ${notification.type}: ${notification.message}`);
        break;
      default:
        throw new Error(`Unsupported notification type: ${notification.type}`);
    }
  }
}

const directNotificationSender = new DirectNotificationSender();
directNotificationSender.send({ type: "Email", message: "message" });
directNotificationSender.send({ type: "SMS", message: "message" });

// Solution
// A simple factory creates services with a shared interface.
// Each service owns its channel-specific sending behavior.
// Adding a channel still requires updating NotificationType and the factory.

interface NotificationService {
  send(message: string): void;
}

class EmailNotificationService implements NotificationService {
  send(message: string): void {
    console.log(`Sending Email: ${message}`);
  }
}

class SmsNotificationService implements NotificationService {
  send(message: string): void {
    console.log(`Sending SMS: ${message}`);
  }
}

class NotificationFactory {
  static create(notificationType: NotificationType): NotificationService {
    switch (notificationType) {
      case "Email":
        return new EmailNotificationService();
      case "SMS":
        return new SmsNotificationService();
      default:
        throw new Error(`Unsupported notification type: ${notificationType}`);
    }
  }
}

const emailService = NotificationFactory.create("Email");
emailService.send("Message");
const smsService = NotificationFactory.create("SMS");
smsService.send("Message");
