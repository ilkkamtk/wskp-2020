// functions that communicate with the backend are in this file
// Self invoking function "exported" as 'communication'. This is an older alternative to export.default.
// See returns at the end of the file.
const communication = (() => {
  'use strict';
  const urlToServer = '.'; // change url when uploading to server if necessary

// general function for fetching (fetchOptions default value is empty object)
  const doFetch = async (url, fetchOptions = {}) => {
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
      throw  new Error('request failed');
    }
    return await response.json();
  };

// get all cats
  const getCats = async () => {
    try {
      const options = {
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        },
      };
      return await doFetch(urlToServer + '/cat', options);
    } catch (e) {
      throw new Error(e.message);
    }
  };

// get all users
  const getUsers = async () => {
    try {
      const options = {
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        },
      };
      return await doFetch(urlToServer + '/user', options);
    } catch (e) {
      throw new Error(e.message);
    }
  };

// add cat
  const addCat = async (formData) => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        },
        body: formData,
      };
      return await doFetch(urlToServer + '/cat', options);
    } catch (e) {
      throw new Error(e.message);
    }
  };

// modify cat
  const modifyCat = async (data) => {
    try {
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        },
        body: JSON.stringify(data),
      };
      return await doFetch(urlToServer + '/cat', options);
    } catch (e) {
      throw new Error(e.message);
    }
  };

// delete cat
  const deleteCat = async (id) => {
    const options = {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    try {
      return await doFetch(urlToServer + '/cat/' + id, options);
    } catch (e) {
      // console.log(e.message());
      throw new Error(e.message);
    }
  };

// login
  const login = async (data) => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };

      return await doFetch(urlToServer + '/auth/login', options);
    } catch (e) {
      throw new Error(e.message);
    }
  };

// logout
  const logout = async () => {
    try {
      return await doFetch(urlToServer + '/auth/logout');
    } catch (e) {
      throw new Error(e.message);
    }
  };

//  register
  const register = async (data) => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      return await doFetch(urlToServer + '/auth/register', options);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  return {
    getCats,
    modifyCat,
    addCat,
    deleteCat,
    getUsers,
    login,
    register,
    logout,
  };
})();
