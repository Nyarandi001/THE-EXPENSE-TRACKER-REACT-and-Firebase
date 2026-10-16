# EXPENSE-TRACKER-REACT-and-Firebase


Expense Tracker is a personal finance management application built with React and Firebase. It allows users to securely create accounts, log in, and manage their financial records by recording income and expenses.

The application stores financial records in Firebase Cloud Firestore, allowing users to retrieve and view their records, archive transactions they want to keep separate, restore archived records, and permanently delete records they no longer need.

 Features

- User Authentication: Register and log in securely using Firebase Authentication.
- Add Expenses: Record and manage money spent.
- Add Revenue: Record and manage income.
- View Financial Records: Retrieve and display saved expense and revenue records.
- Archive Records: Archive records that you want to keep without displaying them in the main active records view.
- Unarchive Records: Restore archived records when needed.
- Delete Records:Permanently remove records from the database.
- Cloud Database: Store and retrieve financial records using Firebase Cloud Firestore.
- User-Specific Access:** Designed for authenticated users to manage their financial information.

 🛠️ Technologies Used

- React — Builds the user interface and interactive components.
- Firebase Authentication— Handles user registration and login.
- Firebase Cloud Firestore — Stores and retrieves financial records.
- JavaScript — Implements application logic and functionality.
- HTML5— Structures the application interface.
- Talwind CSS— Styles the application.

 📂 Project Structure


EXPENSE-TRACKER-REACT/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── config/
│   │   └── firebase.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .gitignore
├── package.json
├── package-lock.json
└── README.md


## ⚙️ Prerequisites

Before installing the application, make sure you have:

- [Node.js](https://nodejs.org/) installed.
- npm, which is included with Node.js.
- A Git installation.
- A Firebase account and a Firebase project.

Check whether Node.js and npm are installed by running:

```bash
node -v
npm -v
```

Check Git:

```bash
git --version
```

 🚀 Installation and Setup

### 1. Clone the repository

Open your terminal or command prompt and run:

```bash
git clone https://github.com/YOUR-GITHUB-USERNAME/EXPENSE-TRACKER-REACT.git
```

### 2. Navigate into the project directory

```bash
cd EXPENSE-TRACKER-REACT
```

### 3. Install dependencies

Run the following command to install the project's dependencies:

```bash
npm install
npm install motion 
```

### 4. Configure Firebase

1. Visit the [Firebase Console](https://console.firebase.google.com/).
2. Create a Firebase project or open an existing one.
3. Register a web application within your Firebase project.
4. Copy the Firebase configuration details.
5. Enable Authentication and configure the sign-in method used by your application.
6. Create a Cloud Firestore database.

Configure the Firebase SDK in your project, for example, in `src/config/firebase.js`:

```javascript
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
```

Use the configuration values from your own Firebase project. Adjust the file path and exports to match your existing Firebase setup.

**Security note:** Never commit service-account private keys, Admin SDK credentials, or other server-side secrets. Configure Firestore Security Rules so authenticated users can access only the records they are authorized to manage. Firebase web configuration values are not a substitute for database security rules.

 5. Start the development server

Run:

```bash
npm run dev
```

If your project was created with Create React App rather than Vite or another setup, the development command may instead be:

```bash
npm start
```

Use the command defined in your `package.json`.

### 6. Open the application

Open the local URL printed in your terminal. For a typical Vite application, this is:

```text
http://localhost:5173
```

For Create React App, it is commonly:

```text
http://localhost:3000
```

The exact address depends on your development setup.

## 📖 How to Use the Application

1. Register: Create a user account using the application's registration interface.
2. Log in: Sign in using your registered credentials.
3. Add a transaction: Enter the required details to create an expense or revenue record.
4. View records: Retrieve and review your saved financial records.
5. Archive a record: Move a record into the archived state.
6. Restore a record: Unarchive a previously archived transaction.
7. Delete a record: Permanently remove a transaction when it is no longer needed.



## 🗄️ Database

The application uses **Firebase Cloud Firestore** to persist financial records and **Firebase Authentication** to manage user accounts.

Typical transaction data may include fields such as:

- Transaction name or description.
- Transaction amount.
- Transaction type, such as expense or revenue.
- Transaction date.
- Archive status.
- User identifier.

These are illustrative fields; the actual schema depends on your implementation.

## 🔐 Security and Privacy

- Firebase Authentication manages user sign-in.
- Firestore Security Rules should enforce access control for financial records.
- Users should not be able to read, modify, or delete another user's records unless explicitly authorized.
- Avoid committing private credentials or sensitive configuration files to GitHub.
- Validate transaction data before saving it to Firestore.

## 🔮 Future Improvements

Possible enhancements include:

- Monthly and yearly income and expense summaries.
- Interactive financial charts and visualizations.
- Search, filtering, and sorting transactions.
- Category-based expense tracking.
- Budget creation and budget alerts.
- Exporting financial records to CSV or PDF.
- Responsive improvements for mobile devices.

These are potential future features, not claims about the current version.

## 🤝 Contributing

Contributions, suggestions, and bug reports are welcome.

1. Fork this repository.
2. Create a feature branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Commit your changes:

   ```bash
   git commit -m "Add your feature"
   ```

4. Push the branch:

   ```bash
   git push origin feature/your-feature-name
   ```

5. Open a Pull Request.

## 📄 License

This is an open source project.No Licenece

## 👨‍💻 Author

**Japheth Nyarandi**

