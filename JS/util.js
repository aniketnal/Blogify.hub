function toasterdanger(txt) {
    Toastify({
      text: txt+" ",
      duration: 1500,
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: false, // Prevents dismissing of toast on hover
      style: {
        background: "rgb(249, 84, 109)",
        color: "white",
      //   fontWeight: "bold",
        fontSize: "1.2rem",
      },
    }).showToast();
  }
  
  function toastersuccess(txt) {
    Toastify({
      text: txt+" ",
      duration: 1500,
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      stopOnFocus: false, // Prevents dismissing of toast on hover
      style: {
        background: "rgb(59, 122, 87)",
        color: "azure",
      //   fontWeight: "bold",
        fontSize: "1.2rem",
      },
    }).showToast();
  }