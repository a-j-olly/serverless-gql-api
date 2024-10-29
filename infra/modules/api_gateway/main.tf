resource "aws_apigatewayv2_api" "graphql_api" {
  name          = "${var.stage}-${var.graphql_api_name}"
  protocol_type = "HTTP"
  cors_configuration {
    allow_origins = ["*"]
    allow_methods = ["POST", "OPTIONS"]
    allow_headers = ["content-type"]
    max_age = 300
  }
}

resource "aws_apigatewayv2_deployment" "graphql_api_deployment" {
  api_id = aws_apigatewayv2_api.graphql_api.id

  lifecycle {
    create_before_destroy = true
  }

  depends_on = [
    aws_apigatewayv2_route.graphql_api_post_route,
    aws_apigatewayv2_route.graphql_api_get_route
  ]
}

resource "aws_apigatewayv2_integration" "graphql_api_integration" {
  api_id                 = aws_apigatewayv2_api.graphql_api.id
  integration_type       = "AWS_PROXY"
  integration_method     = "POST"
  payload_format_version = "2.0"
  integration_uri        = var.graphql_api_lambda_invoke_arn
}

resource "aws_apigatewayv2_route" "graphql_api_post_route" {
  api_id    = aws_apigatewayv2_api.graphql_api.id
  route_key = "POST /graphql"
  target    = "integrations/${aws_apigatewayv2_integration.graphql_api_integration.id}"
}

resource "aws_apigatewayv2_route" "graphql_api_get_route" {
  api_id    = aws_apigatewayv2_api.graphql_api.id
  route_key = "GET /graphql"
  target    = "integrations/${aws_apigatewayv2_integration.graphql_api_integration.id}"
}

resource "aws_apigatewayv2_stage" "dev_stage" {
  api_id      = aws_apigatewayv2_api.graphql_api.id
  name        = var.stage
  auto_deploy = true
}

resource "aws_lambda_permission" "apigw_lambda_permission" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = "${var.stage}-${var.graphql_api_lambda_name}"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.graphql_api.execution_arn}/*"
}
