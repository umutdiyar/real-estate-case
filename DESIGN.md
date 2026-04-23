# DESIGN.md

## 1. Overview

This project is a full-stack real estate transaction management system.

The goal is to:
- Track the lifecycle of transactions
- Automate commission distribution
- Provide financial transparency
- Offer a dashboard interface for managing operations

The system is designed using a clear separation between backend business logic and frontend presentation.

---

## 2. Architecture

The application is divided into two main parts:

- Backend: NestJS (API + business logic)
- Frontend: Nuxt 3 (UI + state management)

The backend is responsible for:
- Data persistence
- Business rules
- API exposure

The frontend is responsible for:
- User interaction
- Data visualization
- State management

---

## 3. Backend Design

### 3.1 Module Structure

The backend is structured using modular architecture:

- Transactions Module
- Agents Module

Each module contains:
- Controller (API layer)
- Service (business logic)
- Schema (MongoDB model)
- DTOs (validation layer)

---

### 3.2 Data Modeling

Transactions are stored in MongoDB using a schema that includes:

- title
- propertyAddress
- transactionType
- totalServiceFee
- listingAgentId
- sellingAgentId
- stage
- commissionBreakdown
- timestamps

Agents are stored separately and referenced inside transactions.

---

### 3.3 Commission Strategy

Commission breakdown is stored **inside the transaction document**.

Reasoning:
- Avoid recalculating on every request
- Preserve historical financial state
- Improve read performance

The breakdown is generated when the transaction reaches the final stage.

---

### 3.4 Business Logic

#### Transaction Lifecycle

Transactions follow predefined stages:

- agreement
- earnest_money
- title_deed
- completed

Stage transitions are handled via a dedicated service.

Invalid transitions are controlled to maintain data consistency.

---

#### Commission Calculation

Commission logic is handled by a dedicated service.

Rules:

- 50% → Agency
- 50% → Agent pool

Scenario 1:
- Same listing and selling agent → receives full 50%

Scenario 2:
- Different agents → each receives 25%

This logic is tested with unit tests.

---

### 3.5 Validation & Error Handling

- DTOs are used for input validation
- ValidationPipe ensures clean input
- Errors are handled consistently via NestJS

---

### 3.6 API Design

RESTful endpoints are used:

- GET /transactions
- GET /transactions/:id
- POST /transactions
- PATCH /transactions/:id/stage

Swagger is enabled for API documentation.

---

## 4. Frontend Design

### 4.1 Structure

The frontend is built using Nuxt 3 with a modular structure:

- Pages:
  - Dashboard
  - Transaction Detail
  - Create Transaction

- Components:
  - TransactionTable
  - DashboardStats
  - StageBadge
  - Commission Breakdown
  - Chart (Stage distribution)

---

### 4.2 State Management

Pinia is used for:

- Fetching transactions
- Managing loading & error states
- Triggering API actions
- Storing selected transaction

---

### 4.3 UI/UX Decisions

- Sidebar layout for navigation
- Dashboard with key metrics
- Chart for stage distribution
- Clear financial breakdown in detail page
- Action buttons for stage transitions

The UI focuses on clarity and usability.

---

### 4.4 Data Flow

1. Frontend sends request to backend API
2. Backend processes business logic
3. MongoDB stores/retrieves data
4. Frontend updates state and UI

---

## 5. Deployment

The application is deployed using:

- Backend: Railway
- Frontend: Vercel
- Database: MongoDB Atlas

Environment variables are used for configuration.

---

## 6. Trade-offs

- Commission is stored instead of computed → better performance
- Simple structure instead of over-engineering → clarity for case scope
- No authentication → out of scope for this task

---

## 7. Conclusion

This system demonstrates:

- Clean separation of concerns
- Proper backend architecture
- Real-world business logic implementation
- Functional frontend with clear UX
- End-to-end full-stack integration

The focus was on correctness, clarity, and maintainability.
