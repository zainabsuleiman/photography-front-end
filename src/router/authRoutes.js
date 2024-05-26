const authRoutes = [
  {
    path: "login",
    name: "Login",
    component: () => import("../views/auth/Login.vue")
  },
  {
    path: "register",
    name: "Register",
    component: () => import("../views/auth/Register.vue")
  },
  {
    path: "registers",
    name: "ClientRegister",
    component: () => import("../views/auth/ClientRegister.vue")
  },
  {
    path: "forgot_password",
    name: "Forgot Password",
    component: () => import("../views/auth/ForgotPassword.vue")
  },
  {
    path: "verify_email",
    name: "Verify Email",
    component: () => import("../views/auth/VerifyEmail.vue")
  },
  {
    path: "set_password",
    name: "Set Password",
    component: () => import("../views/auth/SetPassword.vue")
  },
  {
    path: "account_setup/:tkn?",
    name: "Admin Setup Account",
    component: () => import("../views/auth/AdminSetupAccount.vue")
  }
];

export { authRoutes };
