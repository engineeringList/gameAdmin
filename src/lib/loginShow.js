import axios from 'axios';

export default () => {
    return new Promise((resolve, reject) => {
        const now = new Date().getTime();
        if (localStorage.expire && now < localStorage.expire) {
            return resolve("1");
        } else {
            return reject("-1");
        }
    });
};