import axios from "axios";
//노드와 연결을 위한 컴포넌트
function PostData(type, userData) {
  let BaseURL = "http://localhost:3001/";
  return new Promise((resolve, reject) => {
    axios({
      method: "POST",
      url: BaseURL + type,
      data: {user:JSON.stringify(userData)}
    })
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}
export default PostData;
