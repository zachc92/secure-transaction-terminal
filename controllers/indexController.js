import express from 'express';

export async function showHomePage(req, res){
    res.render('index');
}