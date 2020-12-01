'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllCats = async () => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner name too.
    const [rows] = await promisePool.query('SELECT cat_id, wop_cat.name, age, weight, owner, filename, user_id, coords, wop_user.name AS ownername FROM wop_cat LEFT JOIN wop_user ON owner = user_id');
    console.log('rows', rows);
    return rows;
  } catch (e) {
    console.log('catModel getAllCats', e.message);
    throw new Error(e.message);
  }
};

const getCat = async (id) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT * FROM wop_cat WHERE cat_id = ?',
        [id]);
    console.log('rows', rows);
    return rows;
  } catch (e) {
    console.log('catModel getCat', e.message);
    throw new Error(e.message);
  }
};

const addCat = async (params) => {
  try {
    console.log('params', params.length);
    const [rows] = await promisePool.execute(
        'INSERT INTO wop_cat (name, age, weight, owner, filename, coords) VALUES (?,?,?,?,?,?)',
        params,
    );
    console.log('rows', rows);
    return rows;
  } catch (e) {
    console.log('catModel addCat', e.message);
    throw new Error(e.message);
  }
};

const updateCat = async (params) => {
  try {
    const [rows] = await promisePool.execute(
        'UPDATE wop_cat SET name = ?, age = ?, weight = ?, owner = ? WHERE cat_id = ?',
        params,
    );
    console.log('rows', rows);
    return rows;
  } catch (e) {
    console.log('catModel updateCat', e.message);
    throw new Error(e.message);
  }
};

const deleteCat = async (id) => {
  try {
    const [rows] = await promisePool.execute(
        'DELETE FROM wop_cat WHERE cat_id = ?',
        [id]);
    console.log('rows', rows);
    return rows;
  } catch (e) {
    console.log('catModel deleteCat', e.message);
    throw new Error(e.message);
  }
};

module.exports = {
  getAllCats,
  getCat,
  addCat,
  updateCat,
  deleteCat,
};
