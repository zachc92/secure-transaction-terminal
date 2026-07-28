import pool from '../db/db.js';

export async function addUser(username, password, role){
    return await pool.query('INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING id;', [username, password, role]);
};

export async function getUser(username){
    return await pool.query('SELECT * FROM users WHERE username = $1', [username])
}

export async function getUsers(){
    const results = await pool.query('SELECT * FROM users;');
    return results.rows;
}

export async function getUserById(id){
    return await pool.query('SELECT id, username, role FROM users WHERE id = $1', [id]);
}