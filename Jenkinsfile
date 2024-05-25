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
                         sh 'docker rmi -f $(docker images -q)'
                         sh 'docker system prune -a'
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

          stage('Docker Build Using Docker Compose')
		{
			steps {
                    sh "docker build --no-cache -t abhisheksharma402/travelguide-frontend -f Dockerfiles/FrontendDockerfile ."
                    sh "docker build --no-cache -t abhisheksharma402/travelguide-backend -f Dockerfiles/BackendDockerfile ."

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

          stage('Push Docker Images to Registry') {
               steps {
                    script {
					// sh "docker image tag ${DOCKERHUB_USERNAME}/travelguide-backend ${DOCKERHUB_USERNAME}/travelguide-backend:version1.0"
                         docker.withRegistry('', 'dockerhub-credentials') {

						sh "docker push ${DOCKERHUB_USERNAME}/travelguide-backend"

						sh "docker push ${DOCKERHUB_USERNAME}/travelguide-frontend"
					}
                         
                         // sh "docker image tag ${DOCKERHUB_USERNAME}/travelguide-frontend ${DOCKERHUB_USERNAME}/travelguide-frontend:version1.0"
                         // docker.withRegistry('', 'dockerhub-credentials') {
					// }

                         // sh "docker tag mysql ${DOCKERHUB_USERNAME}/mysql"
                         // docker.withRegistry('', 'dockerhub-credentials') {

					// 	sh "docker push ${DOCKERHUB_USERNAME}/mysql"

					// }


                    }
               }
          }

          stage('Run Ansible Inventory and Playbook'){
		     steps {

                    script {
                         sh 'docker images'

                         ansiblePlaybook (

                              playbook: 'playbook.yml',
                              inventory: 'inventory.txt',
                              extras: '-K',
                         )
                    }
               }
		}

          stage("Testing Backend"){
               steps {
                    dir('SPE-Project-Backend/main') {
                         script{
                              sh 'mvn test'
                         }
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
