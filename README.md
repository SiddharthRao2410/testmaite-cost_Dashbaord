# Testmaite Customer Usage & Cost Dashboard

A state-of-the-art, production-grade Customer Cost and Usage Dashboard designed for the **Testmaite** AI-powered test automation platform.

Built strictly in accordance with the **Qualiquest Customer Usage Dashboard** requirements.

---

## 🌟 Key Features

### 1. Plan & Quota Tracking
- **Plan Tiers**: Real-time visualization of current tier (**Starter**, **Professional**, **Enterprise**).
- **Consumption Meter**: Visual progress bar showing test executions used vs. monthly allocation, percentage consumed, and billing cycle reset date.
- **Plan Upgrade**: Dedicated CTA to request plan tier upgrades from account administrators.

### 2. Real-Time KPI Metrics
- **Test Executions**: Completed test execution count vs. plan limit with pass/fail breakdown.
- **Test Cases**: Total test case inventory, active cases, and remaining monthly quota.
- **Test Runs**: Total test execution runs with health status.
- **Execution Time**: Cumulative automation runtime in hours with average runtime per test suite (2m 18s).

### 3. Usage Trends & Analytics
- **Monthly Execution Trend Chart**: Interactive smooth area chart with hover tooltips displaying execution volume over historical billing cycles.
- **Automation Category Breakdown**: Exclusively tracks **Web Tests (100%)** per platform requirements (API & regression testing excluded).

### 4. Automation Credits Management & Governance
- **Credit Balances**: Clear breakdown of remaining **Execution Credits** and **Design Credits**.
- **Credit Policy**: Explicit policy stating customers cannot add credits directly.
- **Interactive Credit Request Modal**: Seamless modal for team members to select credit type, specify quantity, provide a business justification, and submit to the administrator.

### 5. Admin Quota & Credit Governance (`/admin/quota`)
- **Review Requests**: Dedicated admin panel listing incoming credit requests with user metadata, timestamp, amount, and reason.
- **Approval Workflow**: One-click **Approve** and **Reject** actions with immediate credit allocation and audit logging.

---

## 🎨 Design & Aesthetics
- **Theme**: Curated, modern **Light Mode** design with crisp contrast and slate backgrounds.
- **Typography**: Clean, professional typography with tailored letter spacing.
- **Components**: Glassmorphism accents, soft border radiuses, subtle hover micro-interactions, and responsive layout.

---

## 🛠 Tech Stack
- **Framework**: Vite + Vanilla JavaScript / Chart.js (Standalone Module) & Next.js 16 + Mantine UI + Recharts (Platform Integration).
- **Styling**: Modern CSS variables & design tokens.
- **API Integration**: RESTful endpoints with Bearer token authentication (`/api/v1/quota`, `/api/v1/quota/usage`, `/api/v1/credits/request`, `/api/v1/quota/admin/credit-requests`).

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

The standalone dashboard will be available at `http://localhost:5173`.

---

## 🔌 System Integration Guide

This module is designed for **zero-friction integration** into Testmaite:

### Option 1: Direct Next.js / React Drop-In
If integrating directly into the Testmaite Next.js platform:
1. **User Dashboard**: Copy the page component to `app/(app)/usage/page.tsx`.
2. **Admin Governance**: Copy the approval component to `app/(app)/admin/quota/page.tsx`.
3. **Dependencies**: Uses `@mantine/core`, `@tabler/icons-react`, and `recharts`.

### Option 2: Standalone Micro-Frontend / Web Component
If embedding as an independent module or iframe:
1. Import `src/main.js` and `src/styles/index.css`.
2. Pass the user's API token via `localStorage.setItem('auth_token', token)` or configure `NEXT_PUBLIC_API_BASE_URL`.

---

## 📡 Backend API Contract

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/quota` | Retrieves user plan, test cases used/remaining, execution runs, and billing period dates. |
| `GET` | `/api/v1/quota/usage` | Returns audit trail of recent test executions. |
| `POST` | `/api/v1/credits/request` | Submits credit request (`credit_type`, `amount`, `reason`) to admin. |
| `GET` | `/api/v1/quota/admin/credit-requests` | (Admin) Lists all pending and historical credit requests. |
| `POST` | `/api/v1/quota/admin/credit-requests/{id}/approve` | (Admin) Approves credit request and allocates quota. |

---

## 📂 Project Structure

```
Cost_dashboard/
├── index.html              # Main HTML entry point
├── package.json            # Project dependencies and scripts
├── src/
│   ├── components/         # Modular dashboard UI components
│   │   ├── AutomationBreakdown.js
│   │   ├── CreditsPanel.js
│   │   ├── MetricCards.js
│   │   ├── Modal.js
│   │   ├── PlanBanner.js
│   │   ├── Toast.js
│   │   └── UsageChart.js
│   ├── data/
│   │   └── plans.js        # Plan tiers, quota limits & usage data
│   ├── services/
│   │   └── api.js          # API service layer
│   ├── styles/
│   │   └── index.css       # Light mode theme & styles
│   └── main.js             # Application initialization & state
└── README.md
```
