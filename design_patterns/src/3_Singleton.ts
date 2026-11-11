// Problem
// Imagine app config object which can be modified in multiple places, the app config object will have separate instances which will cause bugs.
// Solution
// Create one instance only and use everywhere as a Single Source of Truth.
// Examples
// OS clipboard, car ECU, airport tower, house electric panel

// Example 1

class Logger {
  private static instance: Logger;

  private constructor() {}

  static getInstance(): Logger {
    if (!this.instance) {
      this.instance = new Logger();
    }

    return this.instance;
  }

  log(message: string) {
    console.log(message);
  }
}

// Error, because constructor is private
// const logger = new Logger();

const logger_1 = Logger.getInstance();
const logger_2 = Logger.getInstance();
console.log(logger_1);
console.log(logger_2);
console.log(logger_1 === logger_2);

// Example 2

interface AppConfigShape {
  apiUrl: string;
  theme: "dark" | "light";
}

class AppConfig {
  private static instance: AppConfig;

  apiUrl: AppConfigShape["apiUrl"];
  theme: AppConfigShape["apiUrl"];

  private constructor({
    apiUrl,
    theme,
  }: {
    apiUrl: AppConfigShape["apiUrl"];
    theme: AppConfigShape["theme"];
  }) {
    this.apiUrl = apiUrl;
    this.theme = theme;
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new AppConfig({
        apiUrl: "https://apiUrl/",
        theme: "dark",
      });
    }

    return this.instance;
  }

  setTheme(theme: AppConfigShape["theme"]) {
    this.theme = theme;
  }
}

const appConfig_1 = AppConfig.getInstance();
const appConfig_2 = AppConfig.getInstance();
appConfig_2.setTheme("light");
console.log(appConfig_1);
console.log(appConfig_2);
console.log(appConfig_1 === appConfig_2);
