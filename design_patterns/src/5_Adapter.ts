// Adaptee
// Existing class which can't be modified for some reasons
// Problem
// The app can't work with it because of incompatible interfaces
interface LegacyEmailInterface {
  address: string;
  subject: string;
  body: string;
}

class LegacyEmailService {
  send({ address, subject, body }: LegacyEmailInterface) {
    console.log(`Sending email to ${address}`);
    console.log(`Subject ${subject}`);
    console.log(`Body ${body}`);
  }
}

// Target interface
// The interface the app can work with
interface NewEmailInterface {
  recipient: string;
  subject: string;
  message: string;
}
interface NewEmailService {
  send(email: NewEmailInterface): void;
}

// Solution
// Adapter design pattern (converter)
class EmailServiceAdapter implements NewEmailService {
  constructor(private readonly legacyEmailService: LegacyEmailService) {}

  send({ recipient, subject, message }: NewEmailInterface): void {
    this.legacyEmailService.send({
      address: recipient,
      subject,
      body: message,
    });
  }
}

// Client
const emailService = new EmailServiceAdapter(new LegacyEmailService());
emailService.send({
  recipient: "dobrinovleonid@gmail.com",
  subject: "Adapter Design Pattern",
  message:
    "Adapter converts the interface of a class into another interface the clients expect. Adapter lets classes work together that couldn't otherwise because of incompatible interfaces.",
});
