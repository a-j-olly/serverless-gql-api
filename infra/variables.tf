variable "aws_region" {
  description = "The AWS region where resources will be created"
  type        = string
  default     = "eu-west-1"
}

variable "stage" {
  description = "The stage name for the application"
  type        = string
  default     = "dev"
}

variable "vpc_cidr" {
  description = "The CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/26"
}

variable "private_subnet_cidrs" {
  description = "List of CIDR blocks for private subnets"
  type        = list(string)
  default     = ["10.0.0.0/27", "10.0.0.32/27"]
}

variable "db_name" {
  description = "The name of the PostgreSQL database"
  type        = string
  default     = "pgsqldb"
}

variable "db_username" {
  description = "The master username for the PostgreSQL database"
  type        = string
  default     = "masteruser"
}

variable "db_password" {
  description = "The master password for the PostgreSQL database"
  type        = string
  sensitive   = true
}

variable "graphql_api_name" {
  description = "The name of the GraphQL API"
  type        = string
  default     = "graphql-api"
}

variable "graphql_api_lambda_name" {
  description = "The name of the GraphQL API Lambda function"
  type        = string
  default     = "graphql-api-handler"
}

variable "db_migration_lambda_name" {
  description = "The name of the database migration Lambda function"
  type        = string
  default     = "db-migration"
}

variable "db_migration_lambda_exec_role_name" {
  description = "The name of the database migration Lambda function execution role"
  type        = string
  default     = "DBMigrationLambdaExecRole"
}

variable "graphql_api_lambda_exec_role_name" {
  description = "The name of the database migration Lambda function execution role"
  type        = string
  default     = "GraphQLAPILambdaExecRole"
}