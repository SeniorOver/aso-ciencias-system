terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }
  required_version = ">= 1.2.0"
}

provider "aws" {
  region = "us-east-1"
  # Credenciales tomadas de ~/.aws/credentials
}

# 1. SEGURIDAD
resource "aws_security_group" "microservices_sg_v3" {
  name        = "microservices_security_group_final"
  description = "Permitir trafico al Gateway"

  # PUERTO 8080: La puerta principal (Gateway)
  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # PUERTO 22: SSH (Mantenimiento)
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # SALIDA: Permitir descargas
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# 2. SERVIDOR PRINCIPAL
resource "aws_instance" "app_server" {
  ami           = "ami-0c7217cdde317cfec" # Ubuntu 22.04
  instance_type = "t2.small"
  
  # --- ¡AQUÍ ESTABA EL PROBLEMA! ---
  key_name      = "vockey"  # Agregamos esto para usar tu labsuser.pem
  # ---------------------------------
   
  vpc_security_group_ids = [aws_security_group.microservices_sg_v3.id]

  # DISCO DE 20GB
  root_block_device {
    volume_size = 20    
    volume_type = "gp2" 
  }

  # 3. EL SCRIPT DE DESPLIEGUE (Nota: Aun levanta postgres local, lo cambiaremos al entrar)
  user_data = <<-EOF
              #!/bin/bash
              echo "--- INICIANDO CONFIGURACION DEL SERVIDOR ---"
              
              # A. Instalar Docker
              sudo apt-get update -y
              sudo apt-get install -y docker.io
              sudo systemctl start docker
              sudo systemctl enable docker
              sudo usermod -aG docker ubuntu

              # B. Crear Red Interna
              sudo docker network create app-network

              # C. Infraestructura (RabbitMQ + Postgres Local)
              echo "--- LEVANTANDO INFRAESTRUCTURA ---"
              sudo docker run -d --name rabbitmq --network app-network --restart always rabbitmq:3-management
              
              # Mantenemos este Postgres local TEMPORALMENTE para que el script no falle al arrancar.
              # Cuando entres por SSH, cambiaremos las variables para usar el RDS.
              sudo docker run -d --name postgres --network app-network --restart always \
                -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=password123 -e POSTGRES_DB=aso_db \
                postgres:13

              sleep 15 

              # D. LOS 10 MICROSERVICIOS
              echo "--- DESCARGANDO Y LEVANTANDO SERVICIOS ---"

              # 1. Auth
              sudo docker run -d --name auth-service --network app-network --restart always \
                -e DB_HOST=postgres -e RABBITMQ_URL=amqp://rabbitmq:5672 \
                erickfabricioc/aso-ciencias-system:auth-service

              # 2. Inventory
              sudo docker run -d --name inventory-service --network app-network --restart always \
                -e DB_HOST=postgres -e RABBITMQ_URL=amqp://rabbitmq:5672 \
                erickfabricioc/aso-ciencias-system:inventory-service

              # 3. Sales
              sudo docker run -d --name sales-service --network app-network --restart always \
                -e DB_HOST=postgres -e RABBITMQ_URL=amqp://rabbitmq:5672 \
                erickfabricioc/aso-ciencias-system:sales-service

              # 4. Notification
              sudo docker run -d --name notification-service --network app-network --restart always \
                -e RABBITMQ_URL=amqp://rabbitmq:5672 \
                erickfabricioc/aso-ciencias-system:notification-service

              # 5. Analytics
              sudo docker run -d --name analytics-service --network app-network --restart always \
                -e RABBITMQ_URL=amqp://rabbitmq:5672 \
                erickfabricioc/aso-ciencias-system:analytics-service

              # 6. Payment
              sudo docker run -d --name payment-service --network app-network --restart always \
                erickfabricioc/aso-ciencias-system:payment-service

              # 7. Invoice
              sudo docker run -d --name invoice-service --network app-network --restart always \
                erickfabricioc/aso-ciencias-system:invoice-service

              # 8. Review
              sudo docker run -d --name review-service --network app-network --restart always \
                erickfabricioc/aso-ciencias-system:review-service

              # 9. Support
              sudo docker run -d --name support-service --network app-network --restart always \
                erickfabricioc/aso-ciencias-system:support-service

              # 10. Audit
              sudo docker run -d --name audit-service --network app-network --restart always \
                erickfabricioc/aso-ciencias-system:audit-service

              # E. GATEWAY
              echo "--- LEVANTANDO GATEWAY ---"
              sudo docker run -d --name api-gateway --network app-network --restart always \
                -p 8080:8080 \
                erickfabricioc/aso-ciencias-system:gateway
              
              echo "--- DESPLIEGUE EXITOSO ---"
              EOF

  tags = {
    Name = "ASO-Ciencias-Final-10Services"
  }
}

output "server_public_ip" {
  value = aws_instance.app_server.public_ip
  description = "IP Publica del Servidor Final"
}

# 4. SEGURIDAD BASTION
resource "aws_security_group" "bastion_sg" {
  name        = "bastion_sg_final"
  description = "Security Group solo para Bastion Host"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] 
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# 5. SERVIDOR BASTION
resource "aws_instance" "bastion_host" {
  ami           = "ami-0c7217cdde317cfec" 
  instance_type = "t2.micro"              
  key_name      = "vockey"                

  vpc_security_group_ids = [aws_security_group.bastion_sg.id]

  tags = {
    Name = "ASO-Bastion-Security"
  }
}

# 6. SEGURIDAD RDS
resource "aws_security_group" "rds_sg" {
  name        = "rds_security_group"
  description = "Permitir acceso al puerto 5432 (Postgres)"

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# 7. BASE DE DATOS RDS
resource "aws_db_instance" "postgres_db" {
  identifier             = "aso-postgres-db"
  allocated_storage      = 20              
  engine                 = "postgres"
  engine_version         = "16.6"          
  instance_class         = "db.t3.micro"   
  db_name                = "aso_db"        
  username               = "aso_admin"     
  password               = "password123"   
  parameter_group_name   = "default.postgres16"
  skip_final_snapshot    = true            
  publicly_accessible    = true            
  vpc_security_group_ids = [aws_security_group.rds_sg.id]

  tags = {
    Name = "ASO-RDS-Production"
  }
}

output "db_endpoint" {
  value = aws_db_instance.postgres_db.endpoint
  description = "La URL de conexion a la base de datos RDS"
}