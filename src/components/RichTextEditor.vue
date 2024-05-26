<template>
  <div>
    <div :id="id+'editor'">
     
    </div>
  </div>
</template>
<script>
import Quill from "quill";
import "quill/dist/quill.snow.css";
export default {
  name: "RichTextEditor",

  props: {
    text: {
      type: String,
      default: ""
    },
    id: {
      type:String,
      default: ""
    }
  },
  watch:{
    text: function(new_v){
      document.getElementById(this.id+'editor').getElementsByTagName("div")[0].innerHTML = new_v
    }
  },
  data() {
    return {
      content: ''
      // randomId: "uuid-1"
    };
  },
  mounted() {
    var tus = this;
    this.quill = new Quill(`#${tus.id+'editor'}`, {
      theme: "snow"
    });
    tus.quill.on("text-change", function() {
      tus.content = document
        .getElementById(tus.id+'editor')
        .getElementsByTagName("div")[0].innerHTML;
      tus.$emit("change", tus.content);
    });
    document.getElementById(this.id+'editor').getElementsByTagName("div")[0].innerHTML = this.text
  }
};
</script>
