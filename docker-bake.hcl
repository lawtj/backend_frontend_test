group "default" {
  targets = ["frontend", "backend"]
}

target "frontend" {
  context = "."
  dockerfile = "Dockerfile.frontend"
  tags = ["lawtj/test-frontend:latest"]
  platforms = ["linux/amd64"]
}

target "backend" {
  context = "."
  dockerfile = "Dockerfile.backend"
  tags = ["lawtj/test-backend:latest"]
  platforms = ["linux/amd64"]
}