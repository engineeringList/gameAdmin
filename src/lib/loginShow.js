import axios from 'axios';

export default () => {
    return new Promise((resolve, reject) => {
        axios.get('/back/login/verify').then(d => {
            if(d.data.code == 1){
                return resolve("1");
            }else{
                return reject("-1");
            }
        }).catch(error => {
            console.error('权限错误');
            return reject("-1");
        })
    });
};