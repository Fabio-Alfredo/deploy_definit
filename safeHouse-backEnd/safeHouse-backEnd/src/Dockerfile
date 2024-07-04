FROM tomcat
COPY ./build/libs/safeHouse-0.0.1-SNAPSHOT.war /usr/local/tomcat/webapps/safeHouse.war
EXPOSE 8080
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh
CMD ["catalina.sh", "run"]