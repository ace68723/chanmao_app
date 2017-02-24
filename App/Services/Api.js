'use strict';
import AppConstants from '../Constants/AppConstants';
let postOptiopns = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}
let getOptiopns = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    credentials:'omit',
    cors:'no-cors'
}
const api = {
    getBio(username){
        username = username.toLowerCase().trim();
        const url = `https://api.github.com/users/${username}`;
        return fetch(url).then((res) => res.json()).catch(err=> err.json());
    },


    getRepos(username){
        username = username.toLowerCase().trim();
        const url = `https://api.github.com/users/${username}/repos`;
        return fetch(url).then((res) => res.json()).catch(err=> err.json());
    },

    addNote(username, note){
        username = user.toLowerCase().trim();
        const url = ``;
        return fetch(url,options).then((res) => res.json())
    },
    login(username, password){
        const url = AppConstants.API_LOGIN
        let options = postOptiopns;
        options.body = JSON.stringify({
                            username: username,
                            password: password,
                        })
        return fetch(url,options).then((res) => res.json())
        // return fetch(url,options).then((res) => res.json())
    },
    auth(token){
      const url = AppConstants.API_AUTH
      let options = getOptiopns;
      options.headers.Authortoken = token
      // options.headers.Authortoken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxMDAwMDAwMDA0IiwiZXhwaXJlZCI6MTQ2MjIyNTkyNX0.woIiyDnLdC1tW3FCj5Q5O5_GphbFlGsdUYC_8thcsMw';
      // options.Rescode = 'token';
      options.headers.Cmversion = '1.1.14'
      options.headers.Cmuuid = '0D76C25C-D915-4E00-B018-86C80080B730'
      options.headers.Cmos = 'iPhone7,2 | iOS | 9.2.1'

      // return fetch(url,options).then((res) => res.json())
      return fetch(url,options).then((res) => {
        res.json()
      })
    }
}

module.exports = api;
