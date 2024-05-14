pipeline {
  
  agent any

  stages {
    stage('Clean workspace') {
      steps{
        script { 
          sh "rm -rf *"
        }
      }
    }
   stage('Checkout'){
            steps{
                git branch: 'main' , url: 'https://github.com/Aar-if/Shikshak-dost.git'   
          }
    }
    
    stage('BuildingCode') {
      steps{
      dir('/var/lib/jenkins/workspace/teacherapp-shiksha'){
        sh "rm -rf node_modules"
        sh "rm -rf package-lock.json"
        sh "ls"
        //sh "yarn install"
        sh "npm i --legacy-peer-deps"
        sh "npm run build"
        }
      }
    }
    stage('Deployment') {
      steps{
      dir ('/var/lib/jenkins/workspace/teacherapp-shiksha/dist/') { 
         script {
                   
                    def awsCliCmd = 'aws'
                         
                    def bucketName = 'onestbucket'  
                    sh "aws s3 cp /var/lib/jenkins/workspace/teacherapp-shiksha/dist/index.html s3://${bucketName}/"
                     sh "aws s3 cp /var/lib/jenkins/workspace/teacherapp-shiksha/dist/vite.svg s3://${bucketName}/"
                     sh "aws s3 cp /var/lib/jenkins/workspace/teacherapp-shiksha/dist/assets/ s3://${bucketName}/assets/ --recursive"
        }
      }
    }
    }
    // New stage for executing ccs.sh script
    stage('Execute invalidation Script') {
      steps {
        dir('/var/lib/jenkins/workspace'){
        sh 'cd /var/lib/jenkins/workspace'
        sh 'sh teacherapp.sh'
      }
    }
  }
}
}

