import { Router } from "express";
import passport from "passport";
import ProductManager from "../persistence/daos/mongodb/managers/product.manager.js";
import CartDao from "../persistence/daos/mongodb/managers/cart.manager.js";
import UserManager from "../persistence/daos/mongodb/managers/user.manager.js";
import { passportCallRedirect, passportCall } from "../middlewares/sessions.js";

const router = Router ();
const productManager = new ProductManager ();
const userManager = new UserManager ();

router.get("/", async (req, res) => {
  res.render("login");
})

router.get("/login",  async (req, res) => {
  res.render("login");
});

router.get("/register", async (req, res) => {
  res.render("register");
});

router.get("/perfil", passport.authenticate ("jwtCookies"), async (req, res) => {
  const userData = await userManager.getById (req.session.passport);
  console.log('userDataperfil', userData)
  res.render ("perfil", {
    userData: userData
  });
});

router.get("/productos", passportCall("jwtCookies"), async (req, res) => { 
  const {user} = req.user;
  const userData = await userManager.getById (user);
  const productos = await productManager.getAll();
  console.log('req', req.user)
  console.log('userData', userData)
  res.render ("productos", {
    userData: userData,
    productos: productos.docs.map(product=>product.toJSON()),
  })
});

router.get("/logout", async (req, res) => {
  res.clearCookie("token").redirect("/login");
});

router.get('/error-registro',(req,res)=>{
  res.render('errorRegistro')
})

router.get('/error-login',(req,res)=>{
  res.render('errorLogin')
})


export default router;
