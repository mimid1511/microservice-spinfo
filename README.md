# booking-4WEBD
The is an academic project realized by Mohamed Daadaa and Mohamed Amine Benfrid.

Due to lack of time, some functionalities were implemented and then commented because they crash all of our services.
We kept the solution commented so that it traces our work.

## architecture model
We have implemented a simple microservice solution for a event managing app.
![image](https://github.com/mimid1511/microservice-spinfo/assets/77280622/d6c96f5c-42c5-44bb-b8ae-1bc83d6ce27a)


## DB models
We have 3 db tables, they run all in the same mongoDB project ( each DB is connected separately through its microservice). So each of the DB has its own different connection string even tho they share the same cluster.
![image](https://github.com/mimid1511/microservice-spinfo/assets/77280622/cd764bbd-d783-4465-8c9b-12ce5f702ef1)


## Documentation
We used swagger for documentation, it's provided by visiting <url-microservice>/api

## launch project
