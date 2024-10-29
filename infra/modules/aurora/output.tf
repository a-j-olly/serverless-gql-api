output "database_url" {
  value = "postgresql://${var.db_username}:${var.db_password}@${aws_rds_cluster.aurora_postgresql.endpoint}:5432/${var.stage}${var.db_name}?schema=public"
}