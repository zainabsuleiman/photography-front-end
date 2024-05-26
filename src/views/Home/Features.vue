<template>
  <div id="features" class="features spacing-lg">
    <div class="container">
      <div class="text-center">
        <h1 class="section-title">Our software features</h1>
      </div>

      <div class="row text-center">
        <div
          class="col-sm-4 feature wow fadeInDown"
          v-for="(feature, index) in features"
          :key="index"
          :data-wow-delay="index * 0.1 + 's'"
        >
          <div class="feature__icon">
            <img :src="feature.icon" width="45" alt="Feature" />
          </div>
          <div class="feature__description">
            <h1>{{ feature.title }}</h1>
            <p>
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import icon from "@/assets/icons/feature-icon.png";

export default {
  data() {
    return {
      features: [
        {
          icon,
          title: "Lorem Ipsum",
          description:
            "Lorem Ipsum and something that can look good here. Lorem Ipsum and something that can look good here."
        },
        {
          icon,
          title: "Lorem Ipsum",
          description:
            "Lorem Ipsum and something that can look good here. Lorem Ipsum and something that can look good here."
        },
        {
          icon,
          title: "Lorem Ipsum",
          description:
            "Lorem Ipsum and something that can look good here. Lorem Ipsum and something that can look good here."
        },
        {
          icon,
          title: "Lorem Ipsum",
          description:
            "Lorem Ipsum and something that can look good here. Lorem Ipsum and something that can look good here."
        },
        {
          icon,
          title: "Lorem Ipsum",
          description:
            "Lorem Ipsum and something that can look good here. Lorem Ipsum and something that can look good here."
        },
        {
          icon,
          title: "Lorem Ipsum",
          description:
            "Lorem Ipsum and something that can look good here. Lorem Ipsum and something that can look good here."
        }
      ]
    };
  }
};
</script>

<style scoped>
.features {
  background: #fff;
}
.feature {
  padding-top: 50px;
}

.feature__icon {
  margin-bottom: 5px;
}

.feaature__description {
  padding: 15px;
}

.feature__description h1 {
  font-size: 20px;
  font-weight: 400;
  color: #222;
}

.feature__description p {
  font-size: 14px;
}
</style>
