import axios from 'axios';

export function LoadChat(id) {
    return axios.get('http://localhost:5000/posts/title/' + id);
}

export function PostData(type, userData) {
    let BaseURL = "http://localhost:3001/";
    return new Promise((resolve, reject) => {
        fetch(BaseURL + type, {
            method: "POST",
            body: JSON.stringify(userData)
        })
            .then(response => console.log(response))
            .then(res => {
                resolve(res);
            })
            .catch(error => {
                reject(error);
            });
    });
}