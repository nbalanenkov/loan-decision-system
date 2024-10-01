
# Loan Decision Engine

Loan Decision Engine is a Spring Boot-based backend application that provides loan decision functionality. It allows users to submit loan requests and receive either an approval with loan details or a rejection with the corresponding reason.


## Features

- Loan eligibility check based on personal code and loan amount/period.
- Validation of personal code, loan amount, and loan period.
- Customized error handling for invalid requests and unknown personal codes.
- Logging for error tracking and debugging.
- REST API for loan decision.


## Tech Stack

- **Java 21**
- **Spring Boot 3.3.4**
- **Spring Validation** for request validation.
- **Lombok** for boilerplate code reduction.
- **SpringDoc** for OpenAPI documentation.
- **Maven** for dependency management and build automation.


## Installation

- Clone the repository:

```bash
git clone https://github.com/nbalanenkov/loan-decision-system.git
cd loan-decision-engine
```

- Build the application:

```bash
mvn clean install
```

- Run the application:

```bash
mvn spring-boot: run
```
## API Endpoints

#### POST /loan-decision

**Description:**   Submit a loan request for decision making.

**Request Body:**

```json
{
  "personalCode": "string",
  "loanAmount": 5000,
  "loanPeriod": 24
}
```

| Field        | Type       | Description                               |
|--------------|------------|-------------------------------------------|
| personalCode | String     | Personal code (must be exactly 11 digits) |
| loanAmount   | BigDecimal | Loan amount (min: 2000, max: 10000)       |
| loanPeriod   | Integer    | Loan period in months (min: 12, max: 60)  |

**Responses:**

200 OK: Approved or rejected loan decision

*Response example for approval:*
```json
{
  "personalCode": "string",
  "loanAmount": 5000,
  "loanPeriod": 24
}
```

*Response example for rejection:*
```json
{
  "decision": "rejected",
  "reason": "No suitable loan amount and loan period were found with provided parameters"
}
```

400 Bad Request: Validation error (e.g., invalid personal code format or out-of-range loan amount/period)

```json
{
  "messages": ["Personal code can only contain numbers", "Loan amount must be at least 2000"],
  "status": 400,
  "timestamp": "2023-09-30T14:27:06.764429695"
}
```

404 Not Found: Unknown personal code

```json
{
  "messages": ["Unknown personal code"],
  "status": 404,
  "timestamp": "2023-09-30T14:27:06.764429695"
}
```

500 Internal Server Error: Generic error response for unexpected issues

```json
{
  "messages": ["An unexpected error occurred"],
  "status": 500,
  "timestamp": "2023-09-30T14:27:06.764429695"
}
```
## Logging

The application uses SLF4J for logging purposes, with different log levels to track various types of errors and information.
## Exception handling

The application handles various exceptions using a global exception handler (GlobalExceptionHandler):

- ```MethodArgumentNotValidException```: Handles validation errors for request body fields.
- ```UnknownPersonalCodeException```: Custom exception thrown when a requested personal code is not found.
- Generic exceptions are handled to return user-friendly error messages and log them appropriately.
##  Swagger documentation

The application provides interactive API documentation via Swagger.

URL: http://localhost:8080/swagger-ui.html
## Tests

To run the tests, use the Maven test command: ```mvn test```