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
					git branch: 'main', url: "${GITHUB_REPO_URL}"
				}
			}
          }

          stage('Making Port Avaiable') {
               steps {
                    script {
                         // Stop all containers
                         sh 'docker stop $(docker ps -aq)'
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
                              sh 'npm test login'
                         }
                    }
               }
          }

          stage('Docker Build Using Docker Compose')
		{
			steps {
                    sh "docker build -t abhisheksharma402/travelguide-frontend -f Dockerfiles/FrontendDockerfile ."
                    sh "docker build -t abhisheksharma402/travelguide-backend -f Dockerfiles/BackendDockerfile ."

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
					sh "docker image tag travelguide-backend ${DOCKERHUB_USERNAME}/travelguide-backend:version1.0"
                         docker.withRegistry('', 'dockerhub-credentials') {

						sh "docker push ${DOCKERHUB_USERNAME}/travelguide-backend:version1.0"

					}
                         
                         sh "docker image tag travelguide-frontend ${DOCKERHUB_USERNAME}/travelguide-frontend:version1.0"
                         docker.withRegistry('', 'dockerhub-credentials') {
                              
						sh "docker push ${DOCKERHUB_USERNAME}/travelguide-frontend:version1.0"
					}

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

                         ansiblePlaybook (

                              playbook: 'playbook.yml',
                              inventory: 'inventory.txt',
                              extras: '-K',
                         )
                    }
               }
		}
    }

}
