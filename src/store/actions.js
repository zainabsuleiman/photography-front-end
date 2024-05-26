import axios from "axios";
import qs from "querystring";
import { alert } from "../utils/alertUtils";
import { router } from "../router";

const actions = {
  login: async (context, payload) => {
    try {
      const data = {
        grant_type: "password",
        username: payload.username,
        password: payload.password
      };
      // console.log(process.env.VUE_APP_CLIENT_ID);
      const str = `${process.env.VUE_APP_CLIENT_ID}:${process.env.VUE_APP_CLIENT_SECRET}`;
      const enc = window.btoa(str);
      const cred = qs.stringify(data);
      const url = `${process.env.VUE_APP_BACKEND_URL}o/token/`;
      const response = await axios.post(url, cred, {
        headers: {
          Authorization: `Basic ${enc}`,
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
      // router.push({ name: 'Loading', params: { message: 'Signing you in ...' } })
      context.commit("mutateCredentials", response.data);
      context.dispatch("get_user_profile", {
        token: response.data.access_token
      });
      // router.push({ name: "DashboardLayout" });
    } catch (err) {
      console.error(err.response);
      alert.error('your account is not approved? contact administrator');
    }
  },
  social_login: (context, payload) => {
    router.push({ name: "Loading", params: { message: "Signing you in ..." } });
    const data = {
      grant_type: "convert_token",
      client_id: process.env.VUE_APP_CLIENT_ID,
      client_secret: process.env.VUE_APP_CLIENT_SECRET,
      backend: payload.type,
      token: payload.accessToken
    };

    const cred = qs.stringify(data);
    const url = `${process.env.VUE_APP_BACKEND_URL}/socialauth/convert-token/`;
    axios({
      method: "POST",
      url: url,
      data: cred,
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8"
      }
    })
      .then(res => {
        context.commit("mutateCredentials", res.data);
        context.dispatch("get_user_profile", res.data.access_token);
      })
      .catch(err => {
        console.error(
          err.response.data.error_description || err.response || err
        );
        alert.error(err.response.data.error_description || err.response || err);
      });
  },
  logout: (context, payload) => {
    context.commit("mutateCredentials", {});
    context.commit("mutateUserProfile", {});
    router.push("/login");
    return payload;

    // #TODO: implement later
    // if (window.gapi) {
    //   let auth2 = window.gapi.auth2.getAuthInstance();
    //   auth2.signOut();
    // }
    // if (window.FB) {
    //   window.FB.logout();
    // }
  },
  get_user_profile: (context, payload) => {
    axios
      .get(`${process.env.VUE_APP_BACKEND_URL}api/client/profile/`, {
        headers: {
          authorization: `Bearer ${payload.token}`
        }
      })
      .then(res => {
        if (res.data.is_active) {
          context.commit("mutateUserProfile", res.data);
          if (res.data.role === 1) {
            router.push("/dashboard");
          } else if(res.data.role === 2){
            router.push("/photographer");
          } else if(res.data.role === 3){
            router.push("/client");
          } 
        } else context.dispatch("logout");
      })
      .catch(err => {
        console.error(err.response);
        alert.error(err.response.data.error_description || err.response || err);
      });
  },
  update_user_profile: async (context, payload) => {
    var url = `${process.env.VUE_APP_BACKEND_URL}/api/users/${context.rootGetters.getUserProfile.uuid}/update/profile`;

    try {
      const response = await axios.put(url, payload, {
        headers: {
          Authorization: "Bearer " + context.rootGetters.getToken
        }
      });
      console.log(response);
      alert.success_center("You have successfully updated User information");
    } catch (err) {
      console.log(err.response);
      alert.error(
        "An error occured please try again,if the error persist kindly contact the owner of this site!"
      );
    }
  },
  register: async (context, payload) => {
    try {
      const response = await axios.post(
        `${process.env.VUE_APP_BACKEND_URL}photographer/account/`,
       payload
        // headers: {
        //   "Content-Type": "application/x-www-form-urlencoded"
        // }
        );
      alert.success(
        "Signed Up Successfully, Check your phone  anytime for  account Approval!"
      );
      console.log(response);
      router.push({ name: "Login" });
    } catch (err) {
      alert.error("Something went wrong try again later!");
      console.error(err.response || err);
    }
  },
  registers: async (context, payload) => {
    try {
      const response = await axios.post(
        `${process.env.VUE_APP_BACKEND_URL}api/client/account/`,
       payload
        // headers: {
        //   "Content-Type": "application/x-www-form-urlencoded"
        // }
        );
      alert.success(
             "Signed Up Successfully!!"
      );
      console.log(response);
      router.push({ name: "Login" });
    } catch (err) {
      alert.error("Something went wrong try again later!");
      console.error(err.response || err);
    }
  },
  set_password: async (context, payload) => {
    try {
      const response = await axios.put(
        `${process.env.VUE_APP_BACKEND_URL}/api/set_password/${payload.token}`,
        {
          password: payload.password,
          confirm_password: payload.password
        }
      );
      alert.success("Password Set Successfully!");
      router.push({ name: "Login" });
      return response;
    } catch (err) {
      alert.error("Something went wrong try again later!");
      console.error(err.response || err);
    }
  },
  forgot_password: async (context, payload) => {
    try {
      const response = await axios.post(
        `${process.env.VUE_APP_BACKEND_URL}/api/forgot_password/`,
        payload
      );
      alert.success("Password Reset Link Sent Successfully!");
      router.push({ name: "Login" });
      return response;
    } catch (err) {
      alert.error("Something went wrong try again later!");
      console.error(err.response || err);
    }
  },
  change_password: async (context, payload) => {
    try {
      const url = `${process.env.VUE_APP_BACKEND_URL}/api/change_password/`;
      const response = await axios.put(url, payload, {
        headers: {
          Authorization: "Bearer " + context.rootGetters.getToken
        }
      });
      alert.success_center("You have successfully changed the password");
      return response;
    } catch (err) {
      if (err.response.status === 400) {
        alert.error(err.response.data);
        console.log(err);
      } else {
        alert.error(
          "An error occured please try again,if the error persist kindly contact the owner of this site!"
        );
      }
    }
  },
  update_cart_count: (context, payload) => {
    context.commit("update_cart", payload);
  }
};

export { actions };
