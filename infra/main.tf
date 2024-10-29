module "vpc" {
  source               = "./modules/vpc"
  stage                = var.stage
  aws_region           = var.aws_region
  vpc_cidr             = var.vpc_cidr
  private_subnet_cidrs = var.private_subnet_cidrs
}

module "aurora" {
  source             = "./modules/aurora"
  stage              = var.stage
  db_name            = var.db_name
  db_username        = var.db_username
  db_password        = var.db_password
  vpc_id             = module.vpc.vpc_id
  private_subnet_ids = module.vpc.private_subnet_ids
  lambda_rds_sg_id   = module.vpc.lambda_rds_sg_id
}

module "db_migration_lambda" {
  source                             = "./modules/db_migration_lambda"
  stage                              = var.stage
  db_migration_lambda_name           = var.db_migration_lambda_name
  db_migration_lambda_exec_role_name = var.db_migration_lambda_exec_role_name
  lambda_rds_sg_id                   = module.vpc.lambda_rds_sg_id
  private_subnet_ids                 = module.vpc.private_subnet_ids
  database_url                       = module.aurora.database_url
}

module "graphql_api_lambda" {
  source                            = "./modules/graphql_api_lambda"
  stage                             = var.stage
  graphql_api_lambda_name           = var.graphql_api_lambda_name
  graphql_api_lambda_exec_role_name = var.graphql_api_lambda_exec_role_name
  lambda_rds_sg_id                   = module.vpc.lambda_rds_sg_id
  private_subnet_ids                 = module.vpc.private_subnet_ids
  database_url                      = module.aurora.database_url
}

module "api_gateway" {
  source                        = "./modules/api_gateway"
  stage                         = var.stage
  graphql_api_lambda_invoke_arn = module.graphql_api_lambda.graphql_api_lambda_invoke_arn
  graphql_api_name              = var.graphql_api_name
  graphql_api_lambda_name       = var.graphql_api_lambda_name
}