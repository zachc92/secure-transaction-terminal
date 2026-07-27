import { Client } from 'pg';

const SQL = `
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR ( 255 ) UNIQUE NOT NULL,
    password VARCHAR ( 255 ) NOT NULL,
    role VARCHAR ( 50 ) NOT NULL
);

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    clerk_id INT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    transaction_amount DECIMAL(10, 2) NOT NULL,
    transaction_id VARCHAR(50) UNIQUE NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, password, role)
    VALUES
        ('zcray', 'password', 'admin');
`

async function main() {
    console.log('Provisioning database authorization ledger tables...');
    const client = new Client({
        connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost:5432/transaction_terminal`,
    });

    try {
        await client.connect();
        await client.query(SQL);
        console.log('Success: Test profiles successfully injected.');
    } catch (error) {
        console.error('Fatal Migration Failure:', error.message);
    } finally {
        await client.end();
    }
}

main();