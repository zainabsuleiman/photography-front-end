<template>
  <div class="container">
    <h2>Product Detail</h2>
    <div class="row">
      <div class="col-md-6 mb-3">
        <div class="row">
          <div class="col-md-12 text-center img-hover-zoom">
            <img
              src="https://cdn.shopify.com/s/files/1/0104/5757/9583/products/OSCO-Men-Dress-Shoes-Men-Formal-Shoes-Leather-Luxury-Fashion-Wedding-Shoes-Men-Business-Casual-Oxford_grande.jpg?v=1575045878"
              alt="image 1"
              srcset
              width="100%"
              id="ProductImg"
            />
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-md-2 col-sm-2 col-2 border-dark">
            <img
              src="https://cdn.shopify.com/s/files/1/0104/5757/9583/products/OSCO-Men-Dress-Shoes-Men-Formal-Shoes-Leather-Luxury-Fashion-Wedding-Shoes-Men-Business-Casual-Oxford_grande.jpg?v=1575045878"
              alt="image 0"
              srcset
              width="100%"
              class="small-img"
            />
          </div>
          <div class="col-md-2 col-sm-2 col-2">
            <img
              src="https://billaberry.com/wp-content/uploads/2018/06/IMG_0711-min.jpg"
              alt="image 1"
              srcset
              width="100%"
              class="small-img"
            />
          </div>
          <div class="col-md-2 col-sm-2 col-2">
            <img
              src="https://assetscdn1.paytm.com/images/catalog/product/F/FO/FOOCLYMB-MEN-S-ONUS4805447C77323/1579158589082_0..jpg?imwidth=282&impolicy=hq"
              alt="image 2"
              srcset
              width="100%"
              class="small-img"
            />
          </div>
        </div>
      </div>

      <!-- take this to another component alone -->

      <div class="col-md-6 p-2 single-product">
        <h1>Home Sport Shoe By Hexakomb</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi exercitationem, quisquam
          consequuntur asperiores error debitis, inventore explicabo optio voluptatem autem nobis eum
          obcaecati aut facilis cum minus aliquam quas aliquid.
        </p>

        <h3>15500 rwf</h3>

        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
        <i class="fa fa-star-half"></i>
        <span class="text-muted">13 reviews</span>

        <select name="size" id>
          <option value disabled selected>select size</option>
          <option value>XL</option>
          <option value>Large</option>
          <option value>Medium</option>
          <option value>Small</option>
        </select>
        <div class="quantity-field">
          <label for="quantity">Quantity:</label>
          <div class="d-flex">
            <button id="minus" @click="decrement()">-</button>
            <input type="number" id="quantity" :value="count" min="1" />
            <button id="plus" @click="increment()">+</button>
          </div>
        </div>
        <br />
        <button class="btn btn-default">
          Add To Cart
          <i class="fas fa-shopping-cart"></i>
        </button>
        <button class="btn btn-default">
          Buy Now
          <i class="fas fa-money-bill-wave-alt"></i>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailCard",
  data() {
    return {
      count: 1
    };
  },
  mounted() {
    // var ProductImg = document.getElementById("ProductImg");
    // var smallImg = document.getElementsByClassName("small-img");
    // smallImg[0].onclick = function() {
    //     ProductImg.src = smallImg[0].src;
    // };
    // smallImg[1].onclick = function() {
    //     ProductImg.src = smallImg[1].src;
    // };
    // smallImg[2].onclick = function() {
    //     ProductImg.src = smallImg[2].src;
    // };
    // smallImg[3].onclick = function() {
    //     ProductImg.src = smallImg[3].src;
    // };
  },
  methods: {
    increment: function() {
      this.count++;
    },
    decrement: function() {
      if (this.count === 1) {
        return;
      }
      this.count--;
    }
  },
  computed: {},
  watch: {}
};
</script>
<style lang="css" scoped>
.img-hover-zoom {
  overflow: hidden;
}

.img-hover-zoom img {
  transition: transform 0.5s ease;
}

.img-hover-zoom:hover img {
  transform: scale(1.5);
}

.small-img {
  height: auto;
  width: 100%;
}

#ProductImg {
  height: auto;
  width: 100%;
}
/* product details information */

.single-product h3 {
  margin: 10px 0;
  font-size: 20px;
  font-family: bold;
}

.single-product select {
  display: block;
  padding: 8px;
  margin: 20px 0px;
  padding-right: 40px;
}

.single-product input {
  width: 3rem;
  height: 2rem;
  padding-left: 1.1rem;
  font-size: 1rem;
  margin: 0px 1px;
  /* border-radius: 50%; */
}

.quantity-field {
  display: flex;
  flex-direction: column;
}

.single-product .fa {
  color: gold;
}
/* Chrome, Safari, Edge, Opera */

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */

input[type="number"] {
  -moz-appearance: textfield;
}

#minus {
  width: 30px;
  background-color: white;
  border: 0.1px solid grey;
}

#plus {
  width: 30px;
  background-color: white;
  border: 0.1px solid grey;
}
</style>