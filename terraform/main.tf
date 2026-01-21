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

# 2. SERVIDOR
resource "aws_instance" "app_server" {
  ami           = "ami-0c7217cdde317cfec" # Ubuntu 22.04
  instance_type = "t2.small"
  
  vpc_security_group_ids = [aws_security_group.microservices_sg_v3.id]

  # --- CAMBIO CRITICO: AUMENTAR DISCO A 20GB ---
  root_block_device {
    volume_size = 20    # Pedimos 20 Gigabytes (Suficiente para 12 contenedores)
    volume_type = "gp2" # Tipo de disco estándar
  }
  # ---------------------------------------------

  # 3. EL GRAN SCRIPT DE DESPLIEGUE (10 SERVICIOS)
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

              # C. Infraestructura (RabbitMQ + Postgres)
              echo "--- LEVANTANDO INFRAESTRUCTURA ---"
              sudo docker run -d --name rabbitmq --network app-network --restart always rabbitmq:3-management
              
              sudo docker run -d --name postgres --network app-network --restart always \
                -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=password123 -e POSTGRES_DB=aso_db \
                postgres:13

              sleep 15 # Esperar a que la BD despierte

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

              # --- LOS NUEVOS 5 ---

              # 6. Payment
              sudo docker run -d --name payment-service --network app-network --restart always \
                erickfabricioc/aso-ciencias-system:payment-service

              # 7. Invoice (Ex-Shipping)
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

              # E. EL CEREBRO (API Gateway)
              # Es el único expuesto al puerto 8080
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

# --- INICIO BLOQUE BASTION (Copiar al final del archivo) ---

# 4. SEGURIDAD BASTION
resource "aws_security_group" "bastion_sg" {
  name        = "bastion_sg_final"
  description = "Security Group solo para Bastion Host"

  # Solo permite SSH (22) desde cualquier lugar
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

# 5. SERVIDOR BASTION (Jump Box)
resource "aws_instance" "bastion_host" {
  ami           = "ami-0c7217cdde317cfec" # Usamos la misma AMI Ubuntu que tu server principal
  instance_type = "t2.micro"              # Instancia pequeña y barata
  key_name      = "vockey"                # Tu llave actual

  vpc_security_group_ids = [aws_security_group.bastion_sg.id]

  tags = {
    Name = "ASO-Bastion-Security"
  }
}
# --- FIN BLOQUE BASTION ---