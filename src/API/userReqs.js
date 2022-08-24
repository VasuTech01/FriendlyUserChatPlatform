export function UserCreate(username, email, password) {

  var data = {
    username: username,
    email: email,
    password: password,
  }
  console.log("data", data);
  return new Promise((resolve, reject) => {
    
    fetch("https://comwooauthsystem.herokuapp.com/create_user", {
    method: "POST",
    body:JSON.stringify(data),
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
    },
   
  })
    .then((res) => res.json())
    .then((res) => {
      console.log("inside UserCreate");
      console.log(res);
      resolve(res);
    })
    .catch((err) => {
      console.log("inside userCreate err");
      reject(err);
    });
  })
}
export function UserLogin(email, password) {
  var user;
  var data = {
    email: email,
    password: password,
  }
  console.log(data);
  return new Promise((resolve, reject) => {
    fetch("https://comwooauthsystem.herokuapp.com/login_user", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
    },
    
  })
    .then((res) => res.json())
    .then((res) => {
      console.log("inside user Login",res);
      resolve(res);
    })
    .catch((err) => {
      console.log("inside userLogin err",err);
      user = err;
      reject(err);
    });
  })
  
}
