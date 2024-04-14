# booking-4WEBD
The is an academic project realized by Mohamed Daadaa and Mohamed Amine Benfrid.

Due to lack of time, some functionalities were implemented and then commented because they crash all of our services.
For example, For the paiement, it is supposed to be an endpoint that manages paiement and it's verified when buying a ticket. To do that, we simulate a paiement variable instead of the endpoint.
Similarly for sending an email when a person buys a ticket.

## architecture model
We have implemented a simple microservice solution for an event managing app.
![image](https://github.com/mimid1511/microservice-spinfo/assets/77280622/d6c96f5c-42c5-44bb-b8ae-1bc83d6ce27a)


## DB models
We have 3 db tables, they run all in the same mongoDB project ( each DB is connected separately through its microservice). So each of the DB has its own different connection string even tho they share the same cluster.
![image](https://github.com/mimid1511/microservice-spinfo/assets/77280622/cd764bbd-d783-4465-8c9b-12ce5f702ef1)

## Demo app
https://github.com/mimid1511/microservice-spinfo/assets/77280622/75ce2d17-4f6b-45d8-bbc9-5af12379d696



## Documentation
We used swagger for documentation, it's provided by visiting  {base_url}/api

## Authentication and Authorization
#### Authentication:
Our system identifies users through a login process at the /auth/login endpoint. Here, users submit their email and password, which are checked against our database. If the credentials are correct, the system generates a token (JWT) that the user must use for accessing other secured areas of the app. This token, included in the request headers, helps the system recognize the user on subsequent requests.

#### Authorization:
Once a user is identified, our system then checks if the user has the necessary permissions to access specific resources. This is done using guards that check the user's roles against the requirements of the resource they are trying to access. For example, some parts of our application might only be accessible by admins or managers. ( simple RBAC)

Certain endpoints, like user registration, are public and do not require a token. These are marked with a @Public() decorator to bypass usual security checks, allowing anyone to access them without logging in.

## launch project
#### local
start each microservice separately. you need for terminals:

T1:
```bash
cd apps/events
npm start
```
T2:
```bash
cd apps/users
npm start
```
T3:
```bash
cd apps/tickets
npm start
```
T4:
```bash
cd appps/gateway
npm start
```
then access to localhost/3030/

for the front-end(still under construction, manages events and simulate a reservation for a ticket):
another terminal:
T5:
```bash
cd appps/front-booking-app
npm start
```

#### docker
The built of images works fine. However, we got this problem when we launch ``` docker-compose up``` 
![image](https://github.com/mimid1511/microservice-spinfo/assets/77280622/213db437-5cd8-450b-85d7-cee508b9c3cb)
