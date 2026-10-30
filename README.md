# SmartOps — E-commerce Operations Dashboard

A **working portfolio MVP** for monitoring e-commerce inventory, orders, fulfillment, supplier characteristics, and operational KPIs. The interface uses fictional gardening-store data inspired by common retail workflows; **it is not affiliated with The Affordable Organic Store or any real business**.

## Implemented features
- Product-level inventory dashboard and low-stock identification
- Reorder quantity suggestions based on a simple 2× reorder-point target (not predictive ML)
- Order creation and transition from pending to shipped; stock deducted at shipment
- Safeguards against shipping twice or dispatching more units than available
- Calculated order counts, fulfillment rate, stock units, inventory value and order revenue
- Supplier comparison table for lead times, delivery reliability and shipping charges
- Resettable demonstration dataset
- Automated Node tests for inventory and fulfillment rules

## Stack
**React, Vite, Recharts, Node.js, Express, JSON file storage**. The prototype uses local JSON persistence to run without external services. MongoDB/Shopify integrations and sophisticated demand forecasting are **not implemented**.

## Run locally
Prerequisite: Node.js 20+ and npm.

```bash
npm run install:all
npm run dev
```

Open **http://localhost:5173**. API on **http://localhost:4000**. The Vite dev server proxies `/api` calls to Express.

To run the tests:

```bash
npm test --prefix server
```

## Demo scenario
1. Open dashboard and inspect SKUs marked **Low stock**.
2. Create a pending order for Rose Seeds (quantity 2).
3. Press **Ship** in Recent Orders; inventory decreases by 2 and revenue changes.
4. Attempt an order quantity larger than available stock and try to ship; the API rejects it.
5. Press **Reset demo** to restore the supplied example dataset.

## API
| Method | Route | Purpose |
|---|---|---|
| GET | `/api/health` | Service status |
| GET | `/api/dashboard` | Inventory, orders, suppliers, KPIs |
| POST | `/api/orders` | Create pending order (`productId`, `quantity`) |
| POST | `/api/orders/:id/ship` | Deduct stock and mark shipped |
| PATCH | `/api/products/:id/stock` | Update stock (`stock`) |
| POST | `/api/reset` | Reset sample data (demo only) |

## Architecture
React dashboard → Vite `/api` proxy → Express routes → JSON persistence. Operational calculations live in `server/logic.js` and are unit-tested.

## Current limitations
This is a learning/demo MVP, not a production warehouse management system. It lacks authentication, audit logs, transaction-safe persistence, multi-user synchronization, refunds, demand prediction, actual supplier integrations, shipping carrier APIs, and real business data. The `/api/reset` route is intended for demo use only and should not be exposed in production.

## Possible next steps
- MongoDB persistence with atomic stock updates and order transactions
- Returns management and warehouse-level stock allocation
- Supplier scorecards using actual lead-time histories
- Rolling-demand reorder point forecasting
- CSV import/export and hosted deployment

## License
MIT — see LICENSE.
