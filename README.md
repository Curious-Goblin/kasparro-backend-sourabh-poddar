# Kasparro Backend – ETL & API Service

This project is a backend system built as part of a recruitment assignment for Kasparro.  
It implements a complete **ETL (Extract, Transform, Load)** pipeline for cryptocurrency data and exposes the processed data through a REST API.

The system is designed with production-readiness in mind and includes containerization, database migrations, health monitoring, and scheduled ETL execution.

---

## Project Overview

The backend performs the following tasks:

1. **Extract** cryptocurrency data from external APIs:
   - CoinGecko
   - CoinPaprika

2. **Transform** the raw data into a normalized schema so that data from different sources can be queried uniformly.

3. **Load** the processed data into a PostgreSQL database with idempotent logic (rerunning ETL does not create duplicates).

4. **Expose** the normalized data via REST endpoints.

5. **Schedule** ETL runs using cron without interrupting the running API.

---


### Technologies Used

- **Node.js + Express** – API server
- **PostgreSQL** – Database
- **Prisma ORM** – Database access and migrations
- **Docker & Docker Compose** – Containerization
- **NGINX** – Reverse proxy
- **Cron** – Scheduled ETL execution

---

## Key Features

- ETL ingestion from multiple external data sources
- Idempotent data ingestion (safe to rerun ETL)
- Normalized database schema
- REST API with health and stats endpoints
- One-shot ETL execution suitable for cron
- Dockerized setup for easy deployment
- Production-ready configuration (no dev tools in runtime)

---


## Running the Project Locally

### Prerequisites

Make sure you have the following installed:

- Docker
- Docker Compose

No local Node.js or PostgreSQL installation is required.

---

### Step 1: Clone the Repository

```bash
git clone https://github.com/Curious-Goblin/kasparro-backend-sourabh-poddar.git
cd kasparro-backend-sourabh-poddar
```

### Step 2: Start Services with Docker
```bash
docker compose up -d --build
```

### Step 3: Apply Database Migrations
```bash
docker compose run --rm backend npx prisma migrate deploy
docker compose restart backend
```

### Step 4: Verify the Setup
```bash
http://localhost:3000/health
```

#### Expected response 
```bash
{
  "status": "ok"
}
```

## API Endpoints
```bash
GET /health
GET /data?limit=10&source=coingecko
GET /stats
```