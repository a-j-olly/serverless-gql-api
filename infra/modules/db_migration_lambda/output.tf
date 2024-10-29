output "db_migration_lambda_invoke_arn" {
  value = aws_lambda_function.db_migration_lambda.invoke_arn
}

output "db_migration_lambda_name" {
  value = aws_lambda_function.db_migration_lambda.function_name
}