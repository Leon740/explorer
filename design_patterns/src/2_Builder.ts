type Theme = "dark" | "light";

interface UserShape {
  firstName: string;
  lastName: string;
  age: number;
  theme: Theme;
  cookie: boolean;
}

const USER: UserShape = {
  firstName: "Leonid",
  lastName: "Dobrinov",
  age: 25,
  theme: "dark",
  cookie: false,
};

// Problem
// User exists before its configuration is complete.
// Callers must remember to assign the remaining settings separately.

class ManuallyConfiguredUser {
  firstName: string;
  lastName: string;
  age: number;
  theme?: Theme;
  cookie?: boolean;

  constructor({
    firstName,
    lastName,
    age,
  }: Omit<UserShape, "theme" | "cookie">) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }
}

const manuallyConfiguredUser = new ManuallyConfiguredUser({
  firstName: USER.firstName,
  lastName: USER.lastName,
  age: USER.age,
});
manuallyConfiguredUser.theme = USER.theme;
manuallyConfiguredUser.cookie = USER.cookie;
console.log("Manual construction:", manuallyConfiguredUser);

// Solution
// The builder holds unfinished configuration and validates it in build().
// The resulting User has every required field; it is separate from the builder.

class User implements UserShape {
  readonly firstName: string;
  readonly lastName: string;
  readonly age: number;
  readonly theme: Theme;
  readonly cookie: boolean;

  constructor({ firstName, lastName, age, theme, cookie }: UserShape) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.theme = theme;
    this.cookie = cookie;
  }
}

class UserBuilder {
  private firstName?: string;
  private lastName?: string;
  private age?: number;
  private theme?: Theme;
  private cookie?: boolean;

  setFirstName(firstName: string): this {
    this.firstName = firstName;
    return this;
  }

  setLastName(lastName: string): this {
    this.lastName = lastName;
    return this;
  }

  setAge(age: number): this {
    this.age = age;
    return this;
  }

  setTheme(theme: Theme): this {
    this.theme = theme;
    return this;
  }

  setCookie(cookie: boolean): this {
    this.cookie = cookie;
    return this;
  }

  build(): User {
    if (this.firstName === undefined) {
      throw new Error("First name is required");
    }
    if (this.lastName === undefined) {
      throw new Error("Last name is required");
    }
    if (this.age === undefined) {
      throw new Error("Age is required");
    }
    if (this.theme === undefined) {
      throw new Error("Theme is required");
    }
    if (this.cookie === undefined) {
      throw new Error("Cookie preference is required");
    }

    return new User({
      firstName: this.firstName,
      lastName: this.lastName,
      age: this.age,
      theme: this.theme,
      cookie: this.cookie,
    });
  }
}

// Usage: configure step by step, then build a complete user.
const builtUser = new UserBuilder()
  .setFirstName(USER.firstName)
  .setLastName(USER.lastName)
  .setAge(USER.age)
  .setTheme(USER.theme)
  .setCookie(USER.cookie)
  .build();
console.log("Builder construction:", builtUser);
