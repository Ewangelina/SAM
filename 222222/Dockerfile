FROM node:18

WORKDIR /usr/src/app

COPY ./source/ ./

EXPOSE 4080

RUN npm install

CMD ["/bin/bash", "start.sh"]