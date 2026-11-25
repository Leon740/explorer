interface FileSystemItem {
  getName(): string;
  getSize(): number;
}

class File implements FileSystemItem {
  name: string;
  size: number;
  constructor({ name, size }: { name: string; size: number }) {
    this.name = name;
    this.size = size;
  }

  getName(): string {
    return this.name;
  }
  getSize(): number {
    return this.size;
  }
}

const file_0 = new File({ name: "File_0.md", size: 8 });
console.log(file_0);
const file_1 = new File({ name: "File_1.md", size: 16 });
console.log(file_1);

class Folder implements FileSystemItem {
  name: string;
  children: FileSystemItem[] = [];
  constructor(name: string) {
    this.name = name;
  }

  add(child: FileSystemItem): void {
    this.children.push(child);
  }

  getName(): string {
    return this.name;
  }
  getSize(): number {
    return this.children.reduce((total, child) => total + child.getSize(), 0);
  }
}

const folder_0 = new Folder("Folder_0");
folder_0.add(file_0);
folder_0.add(file_1);
const folder_1 = new Folder("Folder_1");
folder_1.add(folder_0);
console.log(folder_1);
