class Approver {
  constructor(
    private name: string,
    private limit: number,
    private next?: Approver,
  ) {}

  approve(amount: number): string {
    if (amount <= this.limit) {
      return `${this.name} approved the expense of $${amount}`;
    }

    return (
      this.next?.approve(amount) ?? `Expense of $${amount} was not approved`
    );
  }
}

const director = new Approver("Director", 1000);
const manager = new Approver("Manager", 100, director);

console.log(manager.approve(50));
console.log(manager.approve(500));
console.log(manager.approve(1500));
