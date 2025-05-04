# Serverless GraphQL API

## Project Overview

This project is a serverless GraphQL API designed to be lightweight, powerful, and highly performant. Originally built to serve project and tag information for [aaronjayoliver.com](https://aaronjayoliver.com), it now acts as a tech demo for a modern serverless GraphQL stack, integrating AWS Lambda, Aurora Serverless V2 (PostgreSQL), and TypeScript.

## Technology Stack

- **AWS Lambda**: Provides serverless compute for running the GraphQL API and database migration logic, ensuring scalability and cost efficiency.
- **Amazon Aurora Serverless V2 (PostgreSQL)**: A fully managed, auto-scaling relational database that serves as the persistent data store.
- **API Gateway**: Exposes the GraphQL endpoint to the web, routing requests to the Lambda function.
- **GraphQL Yoga**: A modern, lightweight GraphQL server library that runs efficiently in serverless environments.
- **TypeScript**: Ensures type safety and maintainability across the codebase.
- **Terraform**: Infrastructure as code for provisioning AWS resources in a repeatable, version-controlled manner.
- **pnpm Workspaces**: Manages the monorepo, allowing for modular development and shared dependencies.

## Architecture Overview

1. **API Gateway** receives HTTP requests at the `/graphql` endpoint.
2. Requests are forwarded to the **GraphQL API Lambda** function, which runs the GraphQL Yoga server.
3. The API Lambda executes resolvers, which may query or mutate data in **Aurora Serverless PostgreSQL**.
4. **Database access** is managed via the `pg` library, with connection details securely injected via environment variables.
5. **Infrastructure** (VPC, Aurora, Lambdas, API Gateway) is provisioned and managed using Terraform modules in the `infra/` directory.

## Monorepo Structure

```
├── infra/                # Infrastructure as code (Terraform)
├── be/
│   ├── graphql_api/      # Main GraphQL API backend (TypeScript, GraphQL Yoga)
│   └── db_migration/     # Database migration tool (TypeScript, SQL)
├── packages/
│   └── shared_types/     # Shared TypeScript types/interfaces
├── pnpm-workspace.yaml   # Monorepo workspace configuration
└── package.json          # Project metadata
```

### Module Details

- **infra/**: Contains Terraform code to provision AWS resources, including VPC, Aurora Serverless, Lambda functions, and API Gateway. Modularized for clarity and reusability.
- **be/graphql_api/**: Implements the GraphQL API using GraphQL Yoga. Contains schema definitions, resolvers, and utility libraries for database access and response mapping.
- **be/db_migration/**: Provides scripts and utilities for managing database schema migrations and seeding data.
- **packages/shared_types/**: Houses common TypeScript types and interfaces shared across backend modules, promoting type safety and reducing duplication.

## How It Works

- **Serverless Execution**: The API runs entirely on AWS Lambda, scaling automatically with demand and incurring zero cost when idle.
- **GraphQL Yoga**: Offers a fast, modern GraphQL server that is optimized for serverless environments, minimizing cold start times and memory usage.
- **Aurora Serverless**: Provides a highly available, auto-scaling PostgreSQL database, eliminating the need for manual database management.
- **Type Safety**: Shared types ensure that data models are consistent across API, resolvers, and database logic.
- **Infrastructure as Code**: Terraform enables reproducible, version-controlled infrastructure deployments, making it easy to spin up or tear down environments.

## Getting Started

1. **Install dependencies**:
   ```sh
   pnpm install
   ```
2. **Provision infrastructure** (requires AWS credentials):
   ```sh
   cd infra
   terraform init
   terraform apply
   ```
3. **Run db_migration lambda** (see `be/db_migration/`):
   Terraform will deploy a lambda that automates the setup and seeding of the posgresql database. Invoke it to setup the DB, it's tables and populate it with some sample data.
