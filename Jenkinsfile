pipeline {
    agent {
        label "hornet-js"
    }

    environment {
        // Projet
        MODULE_GROUP="hornet-js"
        MODULE_ID="generator-hornet-js-lite"

        BUILD_TIMESTAMP=sh(script: 'date +%Y%m%d%H%M%S', returnStdout:true).trim()
        VERSION_PACKAGE=sh(script:"npm run version --silent", returnStdout:true).trim()

        VERSION_RELEASE="${VERSION_PACKAGE}"
        VERSION_SNAPSHOT="${VERSION_RELEASE}-${BUILD_TIMESTAMP}"

        // Construction
        HORNETJSBUILDER_VERSION="1.5.0"

        // Publication
        ARTIFACTORY_URL = "http://your.artifactory"
        REPOSITORY_GROUP="hornet"
        REPOSITORY_NPM_SNAPSHOT = "${REPOSITORY_GROUP}-npm-snapshot"
        REPOSITORY_NPM_RELEASE = "${REPOSITORY_GROUP}-npm-release"

        // Qualité
        SONAR_HOST = "http://your.sonar/sonar"
        SONAR_CREDENTIALS_KEY = "hornet_cq_at_sonar01"
        SONAR_SCANNER_CLI = "3.0.3.778"
    }

    options {
        buildDiscarder(logRotator(artifactDaysToKeepStr: "20", artifactNumToKeepStr: "1", daysToKeepStr: "90", numToKeepStr: "20"))
        disableConcurrentBuilds()
    }

    stages {
        stage("Environnement") {
            steps {
                echo sh(script: "env|sort", returnStdout: true)
            }
            post {
                success {
                    echo "[SUCCESS] Success to print Environnement"
                }
                failure {
                    echo "[FAILURE] Failed to print Environnement"
                }
            }
        }

        stage("Install Builder") {
            steps {
                withNPM(npmrcConfig: "npmrc_hornet") {
                    sh '''
						echo "Install hornet-js-builder@${HORNETJSBUILDER_VERSION}"
						echo "${HORNETJSBUILDER_VERSION}" > hb_version
						bash hbw.sh --version
                       '''
                }
            }
            post {
                success {
                    echo "[SUCCESS] Success to install builder"
                }
                failure {
                    echo "[FAILURE] Failed to install builder"
                }
            }
        }

        stage("Handle Snaphot version") {
            when {
				anyOf {
	                branch "develop"
				}
            }
            steps {
                    sh "bash hbw.sh versions:set --versionFix=${VERSION_SNAPSHOT}"
            }
            post {
                success {
                    echo "[SUCCESS] Success to handle Snapshot version"
                }
                failure {
                    echo "[FAILURE] Failed to handle Snapshot version"
                }
            }
        }

        stage("Publish NPM snapshot") {
            when {
                branch "develop"
            }
            steps {
                sh "bash hbw.sh publish --publish-registry ${ARTIFACTORY_URL}/api/npm/${REPOSITORY_NPM_SNAPSHOT}"
            }
            post {
                success {
                    echo "[SUCCESS] Success to Publish snapshot"
                }
                failure {
                    echo "[FAILURE] Failed to Publish snapshot"
                }
            }
        }

        stage("Publish NPM release") {
            when {
                branch "master"
            }
            steps {
                sh "bash hbw.sh publish --publish-registry ${ARTIFACTORY_URL}/api/npm/${REPOSITORY_NPM_RELEASE}"
            }
            post {
                success {
                    echo "[SUCCESS] Success to Publish release"
                }
                failure {
                    echo "[FAILURE] Failed to Publish release"
                }
            }
        }

        stage("Quality") {
            environment {
                SONAR_CREDENTIALS = credentials("${SONAR_CREDENTIALS_KEY}")
            }
            when {
                anyOf {
                    branch "develop"
                    branch "master"
                }
            }
            steps {
                script {
                  scannerHome = tool "SonarQube Scanner $SONAR_SCANNER_CLI"
                }

                sh '''
                    echo "
                    sonar.host.url=${SONAR_HOST}
                    sonar.login=${SONAR_CREDENTIALS_PSW}
                    sonar.projectKey=${MODULE_GROUP}:${MODULE_ID}
                    sonar.projectName=${MODULE_ID}
                    sonar.projectVersion=${VERSION_SNAPSHOT}
                    sonar.sourceEncoding=UTF-8

                    sonar.sources=./generators/app/templates/src
                    sonar.exclusions=**/node_modules/**,**/*.spec.ts
                    //sonar.tests=./test
                    //sonar.test.inclusions=**/*.spec.ts, **/*.test.karma.ts

                    //sonar.cobertura.reportPath=**/test_report/mocha/cobertura-coverage.xml

                    sonar.language=ts
                    sonar.baseDir=.
                    sonar.ts.tslint.projectPath=.
                    sonar.ts.tslint.path=/var/lib/jenkins/.hbw/${HORNETJSBUILDER_VERSION}/node_modules/tslint/bin/tslint
                    sonar.ts.tslint.configPath=/var/lib/jenkins/.hbw/${HORNETJSBUILDER_VERSION}/src/conf/tslint.json
                    sonar.ts.tslint.ruleConfigs=/var/lib/jenkins/.hbw/${HORNETJSBUILDER_VERSION}/node_modules/tslint-microsoft-contrib

                    //sonar.ts.coverage.lcovReportPath=**/istanbul/reports/lcov.info

                    " > sonar-project.properties
                '''
               sh "${scannerHome}/bin/sonar-scanner"
            }

            post {
                success {
                    echo "[SUCCESS] Success to run Quality"
                }
                failure {
                    echo "[FAILURE] Failed to run Quality"
                }
            }
        }
    }
}
