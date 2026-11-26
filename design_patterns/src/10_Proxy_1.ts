// Subject
// Proxy and RealSubject implement same interface.
interface ImageInterface {
  getSource(): string;
  display(): void;
}

// RealSubject
// Performs expensive operation.
class Image implements ImageInterface {
  constructor(private readonly source: string) {
    this.load();
  }
  private load(): void {
    console.log(`Loading image from ${this.source}`);
  }

  getSource(): string {
    return this.source;
  }
  display(): void {
    console.log(`Displaying image ${this.source}`);
  }
}

// Proxy
// Controls access to RealSubject.
// The image is not created until display() is called.
class ImageProxy implements ImageInterface {
  private image?: Image;

  constructor(private readonly source: string) {}

  getSource(): string {
    return this.source;
  }
  display(): void {
    if (!this.image) {
      console.log("Starting to load");
      this.image = new Image(this.source);
    }
    this.image.display();
  }
}

// Client
// Client depends on ImageInterface.
// It does not know whether it received a Proxy or RealSubject.
class Gallery {
  constructor(private readonly images: ImageInterface[]) {}

  showImages(): void {
    for (const image of this.images) {
      console.log(image.getSource());
    }
  }
  openImage(index: number): void {
    const image = this.images[index];

    if (!image) {
      console.log("Image does not exist");
      return;
    }

    image.display();
  }
}

const gallery = new Gallery([
  new ImageProxy("./images/me.jpg"),
  new ImageProxy("./images/Audi_RS6.jpg"),
  new ImageProxy("./images/Wife.jpg"),
  new ImageProxy("./images/Home.jpg"),
]);
gallery.showImages();
gallery.openImage(1);
