pipeline {
    agent none
    parameters {
        string(name: 'commit', defaultValue: 'unknown', description: 'Git commit hash')
    }

    stages {
        stage('Build') {
            agent {
                docker {
                    image 'node:12'
                    args '--add-host git.geek-8.com:172.17.58.217'
                    label 'master'
                }
            }
            environment {
                CI_PUBLIC_PATH = 'https://store.jikestar.com/salesactivity/2021Jan-1'
                VUE_APP_COMMIT = "${params.commit}"
            }
            steps {
                echo "COMMIT: ${params.commit}"
                sh 'rm -rf node_modules dist'
                sh 'git clean -fdx'
                sh 'npm install --registry=https://registry.npm.taobao.org'
                sh 'npm run build'
                stash includes: 'dist/**', name: 'dist'
            }
        }

        stage('Staging') {
            agent {
                label 'whistler'
            }
            options {
                skipDefaultCheckout()
            }
            steps {
                unstash 'dist'
                sh "ossutil64 cp -c /osscfg -rf dist/ oss://geek-8-pages/salesactivity/2021Jan-1/"
            }
        }

    }
}