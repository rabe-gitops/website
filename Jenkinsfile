pipeline {
  agent none

  /*** PIPELINE ENVIRONMENT ***/
  environment {
    BUCKET_NAME = 'www.rabegitops.it'
  }

  /*** STAGES ***/
  stages {

    /** BUILD **/
    stage('build') {

      when {
        // only for the master branch
        beforeAgent true
        branch 'master'
      }

      agent {
        // execute on the 'kubectl slave' pod
        label 'nodejs-slave' // image: node:alpine
      }

      steps {
        // select the 'kubectl' container
        container('nodejs') {
          sh """
            yarn install --frozen-lockfile
            yarn run build
          """
          stash(name: 'dist-stash', includes: 'dist/')
        }
      }
    }

    /** PUSH TO S3 **/
    stage('push-to-s3') {

      when {
        // only for the master branch
        beforeAgent true
        branch 'master'
      }

      agent {
        // execute on the 'amazon slave' pod
        label 'amazon-slave' // image: mesosphere/aws-cli
      }

      steps {
        // select the 'kubectl' container
        container('awscli') {
          unstash('dist-stash')
          sh """
            aws s3 sync ./dist/ s3://${BUCKET_NAME}/
          """
        }
      }
    }
  }
}
