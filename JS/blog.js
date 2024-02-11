//Button Details
let pop_up = document.querySelector(".registration-form");
let createBtn = document.querySelector(".create");
let cancelBtn = document.querySelector(".reset");
let saveBtn = document.querySelector(".save");

// Registration Details
let fullname = document.querySelector(".fullname");
let email = document.querySelector(".email");
let password = document.querySelector(".password1");
let cnf_password = document.querySelector(".cnf-password");

// Login details
let lusername = document.querySelector(".username");
let lpassword = document.querySelector(".password");
let loginBtn = document.querySelector(".login");

// registration form save logic
saveBtn.addEventListener("click", function () {
  let newUser = {
    fullname: fullname.value,
    email: email.value,
    password: password.value,
    cnf_password: cnf_password.value,
  };

  let userList = localStorage.getItem("users"); //null

  // convert the array string to an array bject
  userList = userList === null ? [] : JSON.parse(userList);

  // is found returns true or else it returns undefined
  let isUserExist = userList.find((value) => {
    return value.email === newUser.email;
  });

  if (
    fullname.value === "" ||
    email.value === "" ||
    password.value === "" ||
    cnf_password.value === ""
  ) {
    toasterdanger("Fill all fields!!");
    return false;
  } else {
    if (isUserExist === undefined) {
      if(password.value != cnf_password.value)
      {
        toasterdanger("Passwords Doesn't Match")
      }
      else{
        userList.push(newUser);
        localStorage.setItem("users", JSON.stringify(userList));
        pop_up.classList.add("d-none");
        Swal.fire({
          title: "Regsitration Successful",
          icon: "success"
      });
      }
      
      
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email Already Exists!",
      });
    }
  }  
});

// login form --> login button logic
loginBtn.addEventListener("click", () => {
  let username = lusername.value;
  let password = lpassword.value;

  let userList = localStorage.getItem("users"); //null

  userList = userList === null ? [] : JSON.parse(userList);

  // is found returns true or else it returns undefined
  let isUserExist = userList.findIndex((value) => {
    return value.email === username && value.password === password;
  });

  if (username == "" || password === "") {
    toasterdanger("Fill all fields!!");
    return false;
  } else {
    if (isUserExist === -1) {
      Swal.fire({
        title: "<strong>Invalid Credentials</strong>",
        icon: "info",
        showCloseButton: false,
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText: `
          <i class="fa fa-thumbs-up"></i> Okay!
        `,
        confirmButtonAriaLabel: "Thumbs up, great!",
      });
    } else {
      Swal.fire({
        title: "Login Successful",
        icon: "success"
        
      }); 
      setInterval(() =>
      {
        localStorage.setItem("login", isUserExist);
        window.location.replace("./myFeed.html");
      },1000)
    }
  }
});

// showing the pop-up logic
createBtn.addEventListener("click", function () {
  pop_up.classList.remove("d-none");
});

// hiding the pop-up logic
cancelBtn.addEventListener("click", function () {
  pop_up.classList.add("d-none");
});
