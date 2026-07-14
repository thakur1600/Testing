pipeline {
    agent {
        label 'Slave'
    };

    stages {
        stage('Clone') {
            steps {
               git url:"https://github.com/thakur1600/Testing.git",branch:"main"
            }
        }

       stage('Build') {
            steps {
               sh '''
               set -e

                docker build --no-cache -f ./react-client/Dockerfile -t sumit1968/frontend:latest ./react-client

                docker build --no-cache -f ./node-express-server/Dockerfile -t sumit1968/backend:latest ./node-express-server
               '''
            }
        }

       stage('Test'){
           steps{
               echo "Done with Testing "
           }
       }

       stage('Push to Docker Hub'){
           steps{
               withCredentials([usernamePassword(
                credentialsId: 'dockerhub',
                usernameVariable: 'DOCKER_USER',
                passwordVariable: 'DOCKER_PASS'
            )]) {
                sh '''
                set -e

                echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
        
                docker push sumit1968/frontend:latest
                docker push sumit1968/backend:latest
        
                docker logout
                '''
               }
               
            }
       }

       stage('Code Deploy'){
    steps{
        sh '''
        set -e

        docker compose down --remove-orphans || true

        docker rm -f frontend || true
        docker rm -f backend || true
        docker rm -f mysqldb || true

        docker compose up -d --build
        '''
    }
}
    }
}
