# 1  Typescript - File Update

### Setup
1. `yarn tsc` - to transpile to js lib/app
2. `yarn serve` - to start the server

## Problem Description:

Create A basic node application, that makes a CRUD operation (create, read, update, delete) into a file database.json.

## How will I complete this project?

- Use the folder ./server and work there.
- Your application should use basic bare bone node and typescript
- Your aplication should be able to perform.
  - `GET` Request which returns all the data in your database.json data
  - `POST` Request which adds data to your database.json file (Note: If there is no database.json on post, create one dynamically).
  - `PUT` Request which updates fields of a particular data using the id in database.json
  - `DELETE` Request which removes a particular data from your database.json using the id
- Data format example:

```
[
    {
      organization: "node ninja",
      createdAt: "2020-08-12T19:04:55.455Z",
      updatedAt: "2020-08-12T19:04:55.455Z",
      products: ["developers","pizza"],
      marketValue: "90%",
      address: "sangotedo",
      ceo: "cn",
      country: "Taiwan",
      id: 2,
      noOfEmployees:2,
      employees:["james bond","jackie chan"]
    }
]
```
