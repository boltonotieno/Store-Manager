  // login backend *******************************************************************************************
  var login_form = document.getElementById('login');
  if(login_form){
    login_form.addEventListener('submit', Login);
  }
  
  function Login(e){
    e.preventDefault();
  
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
  
    fetch('https://my-store-manager-api.herokuapp.com/api/v2/auth/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, test/plain, */*',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({username:username, password:password})
    })
    .then((res) => res.json())
    // .then((data) => console.log(data))
    .then((data) => {
      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('current_user', username)
      if(data.access_token){
          if(data.role == "admin"){
            redirect: window.location.replace("./admin.html")
          }else{
            redirect: window.location.replace("./attendant.html")
          }
        
      } else{
        let error_message = document.getElementById('error-message')
        if (error_message){
          error_message.innerHTML = data.message
        }
      }
    })
    .catch((err) => console.log(err))
  }
  
  // END login backend ************************************************************************************
  
