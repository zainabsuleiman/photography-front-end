<template>
    <div>
        <div class="star-rating">
            <span v-for="(n, index) in 5" :key="index">&star;</span>
            <div class="star-rating__current" :style="{'width':getRating + '%'}">
                <span v-for="(n,index) in 5" :key="index">&starf;</span>
            </div>
        </div>
            <span class="ml-3 text-muted text-sm">{{getRating * 5 /100}}</span>
    </div>
</template>
<script>
export default {
    name:'rating',
    props:[ 'rating'],
    data(){
        return{
            
        }
    },
    computed: {
        getRating: function(){
            return (this.rating / 5) * 100
        }
    },
    
}
</script>
<style lang="css" scoped>
    .star-rating{
        display: inline-block;
        font-size: 1.4vmax;
        color: gold;
        position: relative;
    }
    .star-rating .star-rating__current{
        position: absolute;
        top: 0;
        overflow: hidden;
        white-space: nowrap;

    }
</style>