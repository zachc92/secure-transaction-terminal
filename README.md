# secure-transaction-terminal

You will need to create a database through your terminal named transaction_terminal

Once you've done that, run the following command in your terminal (you will need to set your DB_USER & DB_PASSWORD values in a .env file in the root directory of the repository):

```bash
node --env-file=.env db/populatedb.js
```