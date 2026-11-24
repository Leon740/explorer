// Problem
// Imagine hundreds of thousands users each storing same data, which wastes memory.
// Solution
// Moving repeated data into one shared object and let others reference it.
interface AvatarImgShape {
  url: string;
  alt: string;
}

class Avatar {
  readonly url: AvatarImgShape["url"];
  readonly alt: AvatarImgShape["alt"];
  constructor({ url, alt }: AvatarImgShape) {
    this.url = url;
    this.alt = alt;
  }
}

class AvatarFactory {
  private static avatars = new Map<string, Avatar>();

  static getAvatar({ url, alt }: AvatarImgShape): Avatar {
    const key = `${url}-${alt}`;

    if (!this.avatars.has(key)) {
      this.avatars.set(key, new Avatar({ url, alt }));
    }

    return this.avatars.get(key)!;
  }
}

class User {
  readonly id: number;
  readonly name: string;
  readonly avatar: Avatar;
  constructor({
    id,
    name,
    avatar,
  }: {
    id: number;
    name: string;
    avatar: Avatar;
  }) {
    this.id = id;
    this.name = name;
    this.avatar = avatar;
  }
}

const defaultAvatar = AvatarFactory.getAvatar({
  url: "/assets/default-avatar.png",
  alt: "Default avatar",
});

const user_0 = new User({ id: 1, name: "Leonid", avatar: defaultAvatar });
const user_1 = new User({ id: 1, name: "Nikita", avatar: defaultAvatar });
const user_2 = new User({
  id: 2,
  name: "Derek",
  avatar: new Avatar({
    url: "/assets/custom-avatar.png",
    alt: "Derek's avatar",
  }),
});
console.log(user_0, user_1, user_2);
console.log(user_0.avatar === user_1.avatar);
