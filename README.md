# graphql-node-app

# steps to run the application

1. Make Sure that you have Latest stable version of Docker to run the application
2. Make Sure that you have mongoDB in your system
3. Clone the Repository from `master` branch to your local
4. Copy the `.env.example` file to `.env` file and add the data to that
5. Then hit the command `sudo docker compose up`
6. This will take few minutes to download and start the container
7. Once it builds and starts the containers, you can check the `http://localhost:3001` in your local machine and it should work
8. If it's working, you can hit thr `graphQL` endpoint `http://localhost:3001/graphql` to open the Apollo GraphQL playground
9. Once the page loads, you can play with it
10. There is a chance that you will get empty results, thats only because the data is not present in MongoDB
11. We have a Cron Job that runs every day, that is a scheduled job, but if you want the data immediately and run it, you can hit the endpoint `http://localhost:3001/dataseed`, this will trigger the dataseeding, keep in mind that it may take several minutes to completely get the data
12. In the Playground, there is a field to limit the number of records  you receive, it is `limit`, you can pass it as an argument to `getAllVehicles`, this will limit the number of records you can see 