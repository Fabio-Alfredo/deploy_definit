FROM tomcat
COPY ./build/libs/*.war /usr/local/tomcat/webapps/safehouse.war
EXPOSE 8080
ENTRYPOINT ["catalina.sh", "run"]

