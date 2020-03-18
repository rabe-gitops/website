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
          defaultContainer 'nodejs'
          yamlFile "${SLAVES_TEMPLATES_PATH}/nodejs-slave.yaml"
        }
      }

      steps {
        sh """
          yarn install --frozen-lockfile --no-cache --production
          yarn run build
        """
        stash(name: 'distribution-files', includes: 'dist/')
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
          defaultContainer 'awscli'
          yamlFile "${SLAVES_TEMPLATES_PATH}/awscli-slave.yaml"
        }
      }

      steps {
        unstash('distribution-files')
        sh """
          aws s3 sync ./dist/ s3://${BUCKET_NAME}/
        """
      }
    }
  }
}
