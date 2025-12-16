pipeline {
    agent any

    stages {
        stage('Clone repository') {
            steps {
                dir('__services/balancia') {
                    // If this Jenkins job is already linked to a repo,
                    // this will clone it. Otherwise replace with `git url: '...'
                    checkout scm
                }
            }
        }
        
        stage('Start Production') {
            steps {
                dir('__services/balancia') {
                    echo "Starting production environment..."
                    sh 'docker-compose -f prod.docker-compose.yml up -d'
                }
            }
        }
    }
}
