# GGS-backend

## Prerequisites
Install [.NET](https://dotnet.microsoft.com/download)

*SDK for Developers*

*Runtime to run the app*

## Starting backend 
cd to the app location using your favorite terminal and run

`dotnet run`

## RESTful Routes

Base Url: http://localhost:5000/api

|     URL       | HTTP Verb |       Description     |
| ------------- |:---------:| :--------------------:|
|  /locations   |   GET     | Show all Locations    |
|/locations/:id |   GET     | Show Location with :id|

### Authorized Routes 
|     URL       | HTTP Verb |       Description      |
| ------------- |:---------:| :---------------------:|
|  /locations   |    GET    | Includes collected locations |
| /unit/login   |   POST    | Login to your unit     |
| /unit/collect |   POST    | Login to your unit     |