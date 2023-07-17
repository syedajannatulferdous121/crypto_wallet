// Define the CryptoWallet class
class CryptoWallet {
  constructor() {
    this.balance = 0; // Initial balance
    this.transactions = []; // Array to store transaction history
    this.address = this.generateAddress(); // Generate a unique wallet address
  }

  // Method to generate a unique wallet address
  generateAddress() {
    // Implement address generation logic here
    return "0xABCDEF1234567890";
  }

  // Method to get current balance
  getBalance() {
    return this.balance;
  }

  // Method to add funds to the wallet
  addFunds(amount) {
    this.balance += amount;
    this.transactions.push({
      type: "Deposit",
      amount: amount,
      date: new Date().toLocaleString()
    });
    console.log(`Funds added: ${amount}`);
  }

  // Method to send funds from the wallet
  sendFunds(amount, recipient) {
    if (amount <= this.balance) {
      this.balance -= amount;
      this.transactions.push({
        type: "Sent",
        amount: amount,
        recipient: recipient,
        date: new Date().toLocaleString()
      });
      console.log(`Funds sent: ${amount}`);
    } else {
      console.log("Insufficient balance.");
    }
  }

  // Method to display transaction history
  viewTransactions() {
    console.log("Transaction History:");
    this.transactions.forEach(transaction => {
      console.log(`Type: ${transaction.type}`);
      console.log(`Amount: ${transaction.amount}`);
      if (transaction.type === "Sent") {
        console.log(`Recipient: ${transaction.recipient}`);
      }
      console.log(`Date: ${transaction.date}`);
      console.log("---------------------");
    });
  }

  // Method to get wallet address
  getAddress() {
    return this.address;
  }

  // Method to export wallet data
  exportWalletData() {
    return {
      balance: this.balance,
      transactions: this.transactions,
      address: this.address
    };
  }

  // Method to import wallet data
  importWalletData(walletData) {
    this.balance = walletData.balance || 0;
    this.transactions = walletData.transactions || [];
    this.address = walletData.address || this.generateAddress();
  }
}

// Usage example
const wallet = new CryptoWallet();

// Function to handle user input
function handleUserInput(wallet) {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log("Welcome to JSCryptoWallet!");

  rl.question("What would you like to do? (add / send / view / export / import / exit): ", (choice) => {
    switch (choice) {
      case "add":
        rl.question("Enter the amount to add: ", (amount) => {
          wallet.addFunds(parseFloat(amount));
          handleUserInput(wallet);
        });
        break;

      case "send":
        rl.question("Enter the amount to send: ", (amount) => {
          rl.question("Enter the recipient: ", (recipient) => {
            wallet.sendFunds(parseFloat(amount), recipient);
            handleUserInput(wallet);
          });
        });
        break;

      case "view":
        wallet.viewTransactions();
        handleUserInput(wallet);
        break;

      case "export":
        console.log("Wallet data exported:");
        console.log(wallet.exportWalletData());
        handleUserInput(wallet);
        break;

      case "import":
        rl.question("Enter the wallet data to import: ", (walletData) => {
          try {
            const parsedData = JSON.parse(walletData);
            wallet.importWalletData(parsedData);
            console.log("Wallet data imported successfully.");
          } catch (error) {
            console.log("Invalid wallet data. Please try again.");
          }
          handleUserInput(wallet);
        });
        break;

      case "exit":
        rl.close();
        console.log("Thank you for using JSCryptoWallet!");
        break;

      default:
        console.log("Invalid choice. Please try again.");
        handleUserInput(wallet);
        break;
    }
  });
}

// Start handling user input
handleUserInput(wallet);
