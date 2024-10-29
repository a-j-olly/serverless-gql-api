variable "stage" {
  type = string
}

variable "db_name" {
  type = string
}

variable "db_username" {
  type = string
}

variable "db_password" {
  type      = string
  sensitive = true
}

variable "vpc_id" {
  description = "The VPC ID where the Aurora cluster will be created"
  type        = string
}

variable "private_subnet_ids" {
  description = "The private subnet IDs where Aurora instances will be placed"
  type        = list(string)
}

variable "lambda_rds_sg_id" {
  description = "The ID of the security group that allows tcp traffic to reach port 5432"
  type        = string
}
