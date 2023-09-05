let userform = document.querySelector(".user_form");

const sendForm = async (e) => {
  e.preventDefault();
  let userinfo = Object.fromEntries(new FormData(userform));
  console.log('userinfo',userinfo)
  let response = await fetch("/users/login", {
    method: "POST",
    body: JSON.stringify(userinfo),
    headers: { "Content-type": "application/json; charset=UTF-8" },
    credentials: "include",
  })
  console.log('response',response)
  let message = await response.json();
  console.log('message',message)
  if (message?.data) {
    userform.reset();
    alert("Redireccionando");
    setTimeout(() => window.location.href = "/productos", 500);
  } else {
    alert(message.error);
  }
};

userform.addEventListener("submit", sendForm);