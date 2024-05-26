<template>
    <div v-if="selected">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'FormStep',
    props:{
        selected: {
            default: false,
        },
        title: {
            type: String,
            required: true
        }
    },
   
    data(){
        return{
            isActive: this.selected,
        }
    },
    created(){
        this.isActive = this.selected;
    }
}
</script>