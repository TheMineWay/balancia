pipeline {
    agent any

    stages {
        stage('Start Production') {
            steps {
                echo "Starting production environment..."
                sh 'docker-compose -f prod.docker-compose.yml up -d'
            }
        }
    }
}
