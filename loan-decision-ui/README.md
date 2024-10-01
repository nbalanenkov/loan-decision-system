
# Loan Decision UI

This is the frontend of the Loan Decision System, built using React and Material-UI (MUI).

The frontend interacts with the backend API to make loan decisions based on user inputs such as personal code, loan amount, and loan period.


## Flow

- **Personal code input:** The user enters their personal code in a field, which is validated to ensure it is exactly 11 digits long and contains only numbers.

- **Loan amount input:** The user enters the desired loan amount, which must be between 2000 and 10000 EUR.

- **Loan period input:** The user enters the loan period in months, which must be between 12 and 60 months.

- **Submitting loan request:** After filling out all the input fields, the user submits the form. A loading indicator appears while the system processes the loan request.

- **Receiving loan decision:** The frontend communicates with the backend to get a loan decision. Depending on the backend's response, the user is shown either an approval message with the approved loan amount and period or a rejection message with the reason for denial.

- **Error handling** : If there are validation issues or an error in processing, the system provides error messages, guiding the user on how to correct their input or alerts them of backend issues.


## Prerequisites

- **Node.js** (v18.x or later)

- **npm** or **yarn** for package management
## Run Locally

Clone the project

```bash
  git clone git@github.com:nbalanenkov/loan-decision-system.git
```

Go to the project directory

```bash
  cd loan-decision-ui
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

The app will run locally at http://localhost:3000/


## Key dependencies

- **React:** A JavaScript library for building user interfaces.
- **Material-UI (MUI):** A popular React UI framework.
- **Axios:** For making HTTP requests to the backend.
- **TypeScript:** Superset of JavaScript for adding static types to React components.
## Available scripts

In the project directory, you can run:

- ```npm start```: Runs the app in development mode.
- ```npm run build```: Builds the app for production.
- ```npm test```: Launches the test runner.
- ```npm run lint```: Launches lint checks.
- ```npm run lint:fix```: Fixes detected lint errors.
- ```npm run prettier```: Applies prettier on code.
## API Integration

Frontend communicates with backend via the following API:
[Backend API Endpoints](../loan-decision-engine/README.md#api-endpoints)
