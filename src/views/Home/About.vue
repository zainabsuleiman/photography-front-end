<template>
  <div id="about" class="about spacing-lg">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="about__image  wow fadeInLeft">
            <img
              class="img-responsive"
              src="../../assets/images/placeholder-800x600.jpg"
              alt="about-img"
            />
          </div>
        </div>

        <div class="col-md-6">
          <div class="about__text  wow fadeInRight">
            <h2 class="section-title">About this application</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
              beatae sapiente maiores optio. Repellendus assumenda tempore
              dolore eveniet libero modi quo! Repellat officiis quia ab vel
              laborum perferendis cumque in.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about__text {
  padding-top: 0px;
  max-width: 500px;
}

@media only screen and (min-width: 1024px) {
  .about__text {
    padding-top: 100px;
  }
}
</style>
