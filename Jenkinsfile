pipeline {
    agent {
        label 'any'
        customWorkspace '/__services/balancia'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Start Production') {
            steps {
                echo "Starting production environment..."
                sh 'docker-compose -f prod.docker-compose.yml up -d'
            }
        }
    }
}
