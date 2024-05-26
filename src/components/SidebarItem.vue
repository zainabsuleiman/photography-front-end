<template>
  <li class="nav-item active">
    <a
      @click="makeActive"
      v-if="isParent"
      :class="nav_class"
      :href="`#${id}`"
      data-toggle="collapse"
      role="button"
      aria-expanded="false"
      :aria-controls="id"
      :id="id"
    >
      <em :class="iconClass"></em>
      <span class="sidenav-mini-icon"> {{ text[0].toUpperCase() }} </span>
      <span class="sidenav-normal"> {{ text }} </span>
    </a>
    <a :id="id"  @click="makeActive" v-else :class="nav_class" href="#">
      <em :class="iconClass"></em>
      <span class="sidenav-mini-icon"> {{ text[0].toUpperCase() }} </span>
      <span class="sidenav-normal"> {{ text }} </span>
    </a>
    <div v-if="isParent" class="collapse" :id="id">
      <ul class="nav nav-sm flex-column">
        <SidebarItem
          v-for="child in children"
          :key="child.id"
          :id="child.id"
          :icon_class="child.icon_class"
          :text="child.text"
          :link="child.link"
          :children="child.children"
          :isParent="child.isParent"
        />
      </ul>
    </div>
  </li>
</template>

<script>
import $ from "jquery"
export default {
  name: "SidebarItem",
  props: ["id", "iconClass", "text", "link", "children", "isParent"],
  data(){
      return{
          nav_class:'nav-link'
      }
  },
  methods:{
      makeActive: function(e){
          e.preventDefault()
          // document.getElementsByClassName('nav-link').forEach(el => {
          //     if(el.getAttribute('id') != this.id)
          //           el.classList.remove('active')
          // })
          $(".nav-link").removeClass("active")

          document.getElementById(this.id).classList.add('active')
          if(!this.isParent)
            this.$router.push(this.link)
      }
  }
};
</script>

<style>
</style>