resource "aws_rds_cluster" "aurora_postgresql" {
  engine         = "aurora-postgresql"
  engine_version = "16.1"
  engine_mode    = "provisioned"
  serverlessv2_scaling_configuration {
    min_capacity = 0.5
    max_capacity = 1
  }
  database_name       = "${var.stage}${var.db_name}"
  master_username     = var.db_username
  master_password     = var.db_password
  skip_final_snapshot = true

  vpc_security_group_ids = [var.lambda_rds_sg_id]
  db_subnet_group_name   = aws_db_subnet_group.aurora_subnet_group.name
}

resource "aws_rds_cluster_instance" "aurora_postgresql_instance" {
  cluster_identifier = aws_rds_cluster.aurora_postgresql.id
  instance_class     = "db.serverless"
  engine             = aws_rds_cluster.aurora_postgresql.engine
  engine_version     = aws_rds_cluster.aurora_postgresql.engine_version
}

resource "aws_db_subnet_group" "aurora_subnet_group" {
  name       = "aurora-subnet-group"
  subnet_ids = var.private_subnet_ids
}