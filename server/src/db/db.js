import pkg from 'pg';
const { Pool } = pkg;

export default new Pool({
    connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost:5432/transaction_terminal`
});