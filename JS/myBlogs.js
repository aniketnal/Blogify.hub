

// logout logic

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


// showing logged user blogs

function displayBlogs() {
    let myblog = localStorage.getItem("blogs");
    myblog = JSON.parse(myblog);

    let map_blog = myblog.filter((value) => {
        return value.user_id == localStorage.getItem("login");
    });

    let card = document.querySelector(".sec-2");

    let blog = map_blog.map((value) => {
        return `<article class="Card">
        
            <section class="left-side">
                <h2 id="titleh2">${value.title}</h2>
                <p id="descp">${value.description}</p>
                <p id="authorp"><button id="blog-delete" data-id="${value.id}">Delete</button></p>
            </section>
            
            <section class="right-side">
                <img class="image-preview-view" src="${value.url}" alt="" >
            </section>
        
        </article>`;
    
    });

    card.innerHTML = blog.join("");
    delBlog();
}

displayBlogs();

function delBlog()
{
    let delbtns = document.querySelectorAll("#blog-delete"); 

    delbtns.forEach((value) => {
        console.log(value); // will return individual buttons, so har value ko event listner add krdo.
    
        value.addEventListener("click", () => {
          //jo bhi button clicked hai, uski id must be returned
          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-success",
              cancelButton: "btn btn-danger"
            },
            buttonsStyling: true
          });
          swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire({
                  title: "Deleted!",
                  text: "Your Blog has been deleted.",
                  icon: "success"
                });
                let id = value.dataset.id;
                console.log(id); //returns id as number.
          
                //now, blogs lo and remove blog with certain id
                let newblogs = JSON.parse(localStorage.getItem("blogs"));
                newblogs = newblogs.filter((temp) => {
                  return temp.id != id;
                });
                localStorage.setItem("blogs", JSON.stringify(newblogs));
                displayBlogs();
            } 
            else if (result.dismiss === Swal.DismissReason.cancel) {
              swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your Blog is safe :)",
                icon: "error"
              });
            }
          });
        });
      });


}
