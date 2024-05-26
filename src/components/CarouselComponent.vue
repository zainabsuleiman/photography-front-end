<template>
    <div>
        <!-- start of carousel -->
<div id="carouselExampleIndicators" class="carousel slide mb-5" data-ride="carousel" data-interval="12000" data-pause="hover">
    <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
    </ol>
    <div class="carousel-inner">
        <!-- <div class="carousel-item active">
            <img class="d-block w-100 img-fluid" id="carousel-img" src="https://wallpaperaccess.com/full/2254431.jpg" alt="First slide">
            <div class="carousel-caption d-none d-md-block">
                <h1 class="text-white text-uppercase mb-1" id="carousel-caption-header">BFW</h1>
                <span id="line"></span>
                <p id="carousel-caption-subtitle" class="mb-3">
                    BFW is proud to sell jewelry and it has very beautiful jewelry with a lifetime warranty
                </p>
                <a href="">
                    <button id="carousel-caption-button" class="pr-3 pl-3 text-uppercase">View Our Products</button>
                </a>
            </div>
        </div> -->
        <div class="carousel-item active">
            <img class="d-block w-100 img-fluid" id="carousel-img" src="https://blackmamasmatter.org/wp-content/uploads/2021/02/BMH_Conf_Webpage_Banner_BMHW-scaled.jpg" alt="Second slide">
            <!-- <div class="carousel-caption d-none d-md-block">
                <h1 class="text-white text-uppercase" id="carousel-caption-header">get icyeza jewelry </h1>
                <span id="line"></span>
                <p id="carousel-caption-subtitle" class="mb-3">
                    BFW is proud to sell jewelry and it has very beautiful jewelry with a lifetime warranty.
                </p>
                <a href="">
                    <button id="carousel-caption-button" class="pr-3 pl-3 text-uppercase">View Some</button>
                </a>
            </div> -->
        </div>
        <div class="carousel-item">
            <img class="d-block w-100 img-fluid" id="carousel-img" src="https://bfwbackend.hexakomb.com/media/Ressource_Icon/2021-03-11_082402_07ab8e83__bfw2.png" alt="Third slide">
            <!-- <div class="carousel-caption d-none d-md-block">
                <h1 class="text-white text-uppercase" id="carousel-caption-header">best headwraps </h1>
                <span id="line"></span>
                <p id="carousel-caption-subtitle" class="mb-3">
                    BFW has the best head wraps for all the generations from kids to adult ones not it's time to get yours.
                </p>
                <a href="">
                    <button id="carousel-caption-button" class="pr-3 pl-3 text-uppercase">Get yours</button>
                </a>
            </div> -->
        </div>
    </div>
    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
    </a>
</div>
<!-- end of carousel -->
    </div>
</template>

<script>
export default {

}
</script>
<style lang="css" scoped>
    /* CAROUSEL SYTLES */
 
 #carousel-caption-header {
     font-size: 35px;
     max-width: 480px;
     font-weight: 800;
     letter-spacing: 1px;
 }
 
 #line {
     width: 100px;
     height: 3px;
     background-color: white;
     display: inline-block;
 }
 
 #carousel-caption-subtitle {
     max-width: 460px;
     font-size: 17px;
 }
 
 #carousel-caption-button {
     height: 40px;
     display: inline-block;
     border: 2px solid white;
     background-color: rgba(255, 255, 255, 0.0);
     color: white;
     letter-spacing: 2px;
     font-weight: 400;
 }
 
 #carousel-caption-button:hover {
     background-color: rgba(255, 255, 255, 0.5);
     transition: 0.8s;
     color: white;
 }
 
 .carousel-caption {
     left: 10%!important;
     top: 160px!important;
     text-align: left!important;
 }
 
 .carousel-inner {
     height: 85vh;
 }
 
 @media(max-width:758px) {
     .carousel-inner {
         height: 40vh;
     }
 }
 
 .carousel-item {
     height: 100%;
 }
 
 #carousel-img {
     filter: brightness(0.7);
     height: 100%;
 }
 /* END OF CAROUSEL STYLES */
</style>