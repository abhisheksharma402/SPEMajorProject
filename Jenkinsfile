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
                         sh 'docker-compose build'
				}

			}
		}

          stage('Push Docker Images to Registry') {
               steps {
                    script {
                         docker.withRegistry('', 'dockerhub-credentials') {

						sh "docker image tag spe-frontend abhisheksharma402/spe-frontend:version1.0"
						sh "docker push abhisheksharma402/spe-frontend:version1.0"

                              sh "docker image tag spe-backend abhisheksharma402/spe-backend:version1.0"
						sh "docker push abhisheksharma402/spe-backend:version1.0"

						sh "docker push abhisheksharma402/mysql"

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
