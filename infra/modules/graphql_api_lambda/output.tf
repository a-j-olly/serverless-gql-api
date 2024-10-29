output "graphql_api_lambda_invoke_arn" {
    value = aws_lambda_function.graphql_api_lambda.invoke_arn
}

output "graphql_api_lambda_name" {
    value = aws_lambda_function.graphql_api_lambda.function_name
}