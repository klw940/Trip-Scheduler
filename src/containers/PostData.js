import axios from "axios";
//노드와 연결을 위한 컴포넌트
function PostData(type, userData) {
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
export default PostData;
