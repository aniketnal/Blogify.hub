

let log = document.querySelector("#logoutbtn");

if (localStorage.getItem("login") === null) {
  log.innerHTML = "Log In";
  log.addEventListener("click", () => {
    window.location.replace("./blog.html");
  });
} else {
  log.innerHTML = "Log Out";
  log.addEventListener("click", () => {
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
}


let blogs = localStorage.getItem("blogs");
blogs= JSON.parse(blogs);

let card = document.querySelector(".sec-2");


let blog_map = blogs.map((value) => {
    return `<article class="Card">
    
    <section class="left-side">
    <h2 id="titleh2">${value.title}</h2>
    <p id="descp">${value.description}</p>
    <p id="authorp">${"-"} ${value.author}</p>
    </section>
    
    <section class="right-side">
    <img class="image-preview-view" src="${value.url}" alt="" >
 </section>
 
 </article>`;


});

card.innerHTML = blog_map.join("");


let writebtn = document.querySelector("#write-btn");

writebtn.addEventListener("click", () =>
{
  if (localStorage.getItem("login") === null) {
    toasterdanger("Login First");
    setTimeout(() => {
      window.location.replace("./blog.html");
    }, 300);
  }
});




