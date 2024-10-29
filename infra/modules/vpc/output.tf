output "vpc_id" {
  value = aws_vpc.main.id
}

output "private_subnet_ids" {
  value = aws_subnet.private_subnets[*].id
}

output "lambda_rds_sg_id" {
  value = aws_security_group.lambda_rds_sg.id
}