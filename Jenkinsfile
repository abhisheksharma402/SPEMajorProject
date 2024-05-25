pipeline {
    agent any

    environment {
        DOCKERHUB_USERNAME = "abhisheksharma402"
        GITHUB_REPO_URL = 'https://github.com/abhisheksharma402/SPEMajorProject'
        
     //    KUBECONFIG = credentials('kube-cred-main')
    }

    stages {
          stage('Checkout') {
               steps {
				script{
                         cleanWs()
					git branch: 'main', url: "${GITHUB_REPO_URL}"
				}
			}
          }

          stage('Making Port Avaiable') {
               steps {
                    script {
                         // Stop all containers
                         sh 'docker stop $(docker ps -aq)'
                         sh 'docker rm $(docker ps -aq)'
                         sh 'docker rmi -f $(docker images -q)'
                         
                         sh 'docker images'
                    }
               }
          }

          stage('Maven Build') {
               steps {
                    dir('SPE-Project-Backend/main') {
                         script{
                              sh 'mvn clean install -DskipTests'
                         }
                    }
               }
          }

        stage('Build Docker Images') {
            steps {
                echo 'Building Docker Images'
                sh "docker build -t ${DOCKERHUB_USERNAME}/backendservice -f Dockerfiles/BackendDockerfile ."
                sh "docker build -t ${DOCKERHUB_USERNAME}/frontendservice -f Dockerfiles/FrontendDockerfile ."
            }
        }

          stage('List Docker Images') {
               steps {
                    script {
                         // Use Docker CLI to list images
                         sh 'docker images'
                    }
               }
          }
          
          stage('Login to Docker Hub') {
            steps {
                echo 'Login to Docker Hub'
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'abhisheksharma402', passwordVariable: 'Murli@9131')]) {
                    sh "docker login -u ${DOCKERHUB_USERNAME} -p 'Murli@9131'"
                }
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                echo 'Pushing Images to Docker Hub'
                sh "docker push ${DOCKERHUB_USERNAME}/backendservice"
                sh "docker push ${DOCKERHUB_USERNAME}/frontendservice"
            }
        }
        

          stage('Run Ansible Playbook') {
            steps {
                script {
                    ansiblePlaybook(
                        playbook: 'playbook.yml',
                        inventory: 'inventory.txt'
                    )
                }
            }
        }

          stage("Testing Frontend"){
               steps {
                    dir('SPE-Project-Frontend/SPE-Major-Project/SPEMajorProject'){
                         script{
                              sh 'npm install --save-dev jest-environment-jsdom --force'
                              sh 'npm install --save-dev jest@latest ts-jest@latest --force'
                              // sh 'npm install -g ts-jest --force'
                              sh 'npm run test:login'
                         }
                    }
               }
          }
    }

}
