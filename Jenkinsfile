pipeline {
    agent any

    stages {
        stage('Clone repository') {
            steps {
                checkout scm
            }
        }

        stage('Configure environment') {
            steps {
                withCredentials([
                    file(credentialsId: 'balancia-server-env', variable: 'SERVER_ENV_FILE'),
                    file(credentialsId: 'balancia-client-env', variable: 'CLIENT_ENV_FILE')
                ]) {
                    sh 'cp "$SERVER_ENV_FILE" apps/server/.env'
                    sh 'cp "$CLIENT_ENV_FILE" apps/client/.env'
                }
            }
        }
        
        stage('Stop existing containers') {
            steps {
                echo "Stopping and removing existing server container..."
                sh 'docker compose -f prod.docker-compose.yml stop balancia-server || true'
                sh 'docker compose -f prod.docker-compose.yml rm -f balancia-server || true'
            }
        }

        stage('Start Production') {
            steps {
                echo "Starting production environment..."
                sh 'docker compose -f prod.docker-compose.yml up -d --build --force-recreate'
            }
        }
    }
}
