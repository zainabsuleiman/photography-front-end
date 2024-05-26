<template>
  <footer>
    <div class="footer">
      <div class="container footer__top">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-12 mb-3 mb-lg-0">
            <h2 class="footer__title">Section 1</h2>
            <ul class="footer__list-items">
              <footer-link name="Link 1" link="/link-1"></footer-link>
              <footer-link name="Link 2" link="/link-2"></footer-link>
              <footer-link name="Link 3" link="/link-3"></footer-link>
            </ul>
          </div>

          <div class="col-lg-3 col-md-6 col-12 mb-3 mb-lg-0">
            <h2 class="footer__title">Section 2</h2>
            <ul class="footer__list-items">
              <footer-link name="Link 1" link="/link-1"></footer-link>
              <footer-link name="Link 2" link="/link-2"></footer-link>
              <footer-link name="Link 3" link="/link-3"></footer-link>
            </ul>
          </div>

          <div class="col-lg-3 col-md-6 col-12 mb-3 mb-lg-0">
            <h2 class="footer__title">Section 3</h2>
            <ul class="footer__list-items">
              <footer-link name="Link 1" link="/link-1"></footer-link>
              <footer-link name="Link 2" link="/link-2"></footer-link>
              <footer-link name="Link 3" link="/link-3"></footer-link>
            </ul>
          </div>

          <div class="col-lg-3 col-md-6 col-12">
            <h2 class="footer__title">Follow us</h2>
            <p class="text-white mb-3">
              Please Follow us on our social Media, and do not forget to share
              your feedback. Public's ideas is what we put forward.
            </p>
            <social-icon
              link="https://facebook.com"
              btnClass="btn btn-facebook"
              iconClass="fab fa-facebook-f"
            ></social-icon>
            <social-icon
              link="https://google.com"
              btnClass="btn btn-google-plus"
              iconClass="fab fa-google-plus-g"
            ></social-icon>
            <social-icon
              link="https://twitter.com"
              btnClass="btn btn-twitter"
              iconClass="fab fa-twitter"
            ></social-icon>
            <social-icon
              link="https://instagram.com"
              btnClass="btn btn-instagram"
              iconClass="fab fa-instagram"
            ></social-icon>
          </div>
        </div>
      </div>

      <p class="footer__copyright">
        All right reserved by &copy; <i>Accounting master</i>
      </p>
    </div>
  </footer>
</template>

<script>
// @ is an alias to /src
import FooterLink from "@/components/Footer/partials/FooterLink";
import SocialIcon from "@/components/Footer/partials/SocialIcon";

export default {
  components: {
    FooterLink,
    SocialIcon
  },
  data() {
    return {};
  }
};
</script>
<style lang="css" scoped>
.footer {
  padding: 0; /* remove argon css padding */
  background: #192b3e;
}

.footer__top {
  padding-top: 60px;
  padding-bottom: 60px;
}

.footer p {
  font-size: 14px;
  margin: 0;
  line-height: 1.5;
}

.footer__title {
  color: #fff;
  font-size: 20px;
  margin-bottom: 25px;
}

.footer__title::before {
  content: "|";
  color: #e95123;
  padding-right: 5px;
}

.footer__list-items {
  margin: 0;
  padding: 0;
  list-style: none;
}

.footer__copyright {
  text-align: center;
  color: #fff;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  padding-top: 10px;
  padding-bottom: 10px;
}

.footer__copyright i {
  font-family: "Dancing Script", cursive;
  font-size: 18px;
}
</style>
