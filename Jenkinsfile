pipeline {
  agent none

  /*** PIPELINE ENVIRONMENT ***/
  environment {
    BUCKET_NAME = 'www.rabegitops.it'
    SLAVES_TEMPLATES_PATH = 'slaves'
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
        // execute on the 'nodejs slave' pod
        kubernetes {
          yamlFile "${SLAVES_TEMPLATES_PATH}/nodejs-slave.yaml"
        }
      }

      steps {
        // select the 'nodejs' container
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
        // execute on the 'awscli slave' pod
        kubernetes {
          yamlFile "${SLAVES_TEMPLATES_PATH}/awscli-slave.yaml"
        }
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
