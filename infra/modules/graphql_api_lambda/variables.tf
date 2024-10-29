variable "stage" {
  type = string
}

variable "database_url" {
  type = string
}

variable "graphql_api_lambda_name" {
  type = string
}

variable "graphql_api_lambda_exec_role_name" {
  type = string
}

variable "private_subnet_ids" {
  type = list(string)
}

variable "lambda_rds_sg_id" {
  type = string
}