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

				script {
                         sh 'docker compose build'
				}

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

                         sh "docker tag mysql ${DOCKER_HUB_USERNAME}/mysql"
                         docker.withRegistry('', 'dockerhub-credentials') {

						sh "docker push ${DOCKERHUB_USERNAME}/mysql"

					}


                    }
               }
          }

          stage('Run Ansible Inventory and Playbook'){
		     steps {

                    script {

                         ansiblePlaybook (

                              playbook: 'playbook.yml',
                              inventory: 'inventory'
                         )
                    }
               }
		}
    }

}
