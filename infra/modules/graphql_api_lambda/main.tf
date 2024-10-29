data "archive_file" "graphql_api_lambda_code_archive" {
  type        = "zip"
  source_dir = "./dist/build/graphql_api/"
  output_path = "./dist/out/graphql_api.zip"
}

resource "aws_lambda_function" "graphql_api_lambda" {
  function_name = "${var.stage}-${var.graphql_api_lambda_name}"
  handler       = "index.handler"
  runtime       = "nodejs20.x"
  role = aws_iam_role.graphql_api_lambda_exec_role.arn
  memory_size = 1024
  timeout    = 30

  vpc_config {
    subnet_ids         = var.private_subnet_ids
    security_group_ids = [var.lambda_rds_sg_id]
  }
  
  source_code_hash = data.archive_file.graphql_api_lambda_code_archive.output_base64sha256
  filename         = data.archive_file.graphql_api_lambda_code_archive.output_path

  environment {
    variables = {
      DATABASE_URL    = var.database_url
    }
  }
}

resource "aws_iam_role" "graphql_api_lambda_exec_role" {
  name = var.graphql_api_lambda_exec_role_name
  assume_role_policy = file("./modules/iam/policies/trust/LambdaAssumeRolePolicy.json")
}

resource "aws_iam_role_policy_attachment" "graphql_api_lambda_exec_role_policy_attach" {
  role       = aws_iam_role.graphql_api_lambda_exec_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole"
}