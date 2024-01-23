# BookRecord_Build

Server  >> Storing certain book data
        >> User Register
        >> Subcriber

This is a book record management Api Server/ Backened for the library system or management of records or manuals or books

Fine System 
User: 06/03/2024 - 06/06/2024    <!-- exapmle -->
<!-- like he came on 09/06/2023 then fine is 50*3=150/-    -->
subscriptions can be of : 
3 months (Basic)
6 months (Standard)
12 months (Premium)

If the subsciprion type is standard && if the subscription date is 06/03/2023
=> then valid subscription is till 06/09/2023

within subsciption date >> if we miss the renewal>> 50/- day
subscription date is also been missed >> and also missed the renewal>> 100   + 50/- day

<!-- example  -->

>> book1
>> basic
>> 06/03/2024--> subscription date
>> 07/03/2024 --> borrowed a book from library
>> book1 renewal date is on 21/03/2024
>> 23/03/2024 => we need to pay a fine of 50*2/-
>> if go back and give my book on 23/06/2023  => we need to pay 100+(no of days *50/-)


# Routes and Endpoints 

## /users
POST : Create a new user 
GET : Get all the user info here
 

## /users/{id}
GET: Get a user by id
PUT: Update a user by their ID
DELETE: Delete a user by id (chk if he/ she still have an issued boook)&& (is there any fine to paid)

## /users/subscription-details/{id}
GET: get user subscription details
       >> Data of Subscription
       >> Valid till
       >> Is there any fine


## /books
GET : Get all the books
POST: Create/Add a new book 

## /books/{id}
GET: Get a book by id 
PUT: Update a book by id 

## /books/issued
GET : Get all the issued books

## /books/issued/withFine
GET: Get all issued books with their fine 








for terminal
## npm init
## npm i nodemon --save dev 
## npm i nodemon --save dev 
## npm run dev