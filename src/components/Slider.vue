<template>
    <div class="mb-5">
        <div class="slider__title d-flex mb-2">
            <h2 class="mr-4">{{slideTitle}}</h2>
            <!-- <h2 class="text-black-50"><a href="">See all &rarr;</a></h2> -->
        </div>
        <div class="wrapper">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    export default {
        name: "Slider",
        props: ['slideTitle'],
        data() {
            return {

            }
        },
    };
</script>
<style lang="css" scoped>
    .wrapper {
        max-height: max-content;
        display: flex;
        overflow-x: auto;
    }
    
    .wrapper .item {
        /* min-width: 135px; */
        height: max-content;
        /* line-height: 110px; */
        text-align: center;
        /* margin-right: 2px; */
    }
</style>