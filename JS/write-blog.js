let login =  localStorage.getItem("login");
let userList = null;

let title = document.querySelector(".title");
let description = document.querySelector(".description");
let url = document.querySelector(".URL");
let saveBtn = document.querySelector("#save-blog");

let logout = document.querySelector("#logout");

// getting the name of user who is logges in the site to welcome him
if(login === null)
{
    toasterdanger("You have to Login First");
    setTimeout(() => {
        window.location.replace("./blog.html");
    }, 1000);
      
}
else{   
    userList = localStorage.getItem("users"); // refered to the users section in localStorage
    userList = JSON.parse(userList); // Converted it to array
    userList = userList[login];
    document.querySelector("#welcome-text").innerHTML = `Welcome, <b>${userList.fullname.split(" ")[0]}</b> `; 
    // welcome logic to get the full name from the login --> fullname
}

let img = document.querySelector(".image-sec");
url.addEventListener('blur',()=>{
    img.innerHTML =  `<img
    src="${url.value}"
    alt="" id="write-img"
  />`
});

saveBtn.addEventListener('click', ()=>{
    let newBlog = {
        id: Date.now(), // this saves the timestamp at which the blog has been created
        title: title.value,
        description: description.value,
        url: url.value,
        user_id : login,
        author : userList.fullname
    }

    let blogs = localStorage.getItem("blogs"); // will return null cz no blog exists.
    blogs = blogs === null? [] : JSON.parse(blogs) // this will initialize a empty array to add blog to it

   if(title.value === "" || description.value === "" || url.value === "")
   {
    toasterdanger("Fill all fields!!")
    return false;
   }else{
    blogs.unshift(newBlog); // this will add the new blog in the blogs array at first position
    localStorage.setItem("blogs",JSON.stringify(blogs)); // this will return the data to local storage after addig the new blog
    Swal.fire({
        title: "Success!",
        text: "Blog Added",
        icon: "success"
      }); 
   }

    title.value = "";
    description.value = "";
    url.value = "";
});

logout.addEventListener('click', ()=>{
    Swal.fire({
        title: "Are you sure ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Log Out",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("login");
          window.location.replace("./blog.html");
        }
      });
});