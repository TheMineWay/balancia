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
                withCredentials([file(credentialsId: 'balancia-server-env', variable: 'SERVER_ENV_FILE')]) {
                    sh 'cp "$SERVER_ENV_FILE" apps/server/.env'
                }
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
