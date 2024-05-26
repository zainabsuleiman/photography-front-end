<template>
  <div
    :id="options.id"
    class="rounded bg-secondary p-5 text-center"
    style="border: 0.6px dashed #172b4d"
  >
    <span class="text-center text-default"
      ><button :id="options.id + 'clickable'" class="btn btn-secondary rounded">
        <em class="fas fa-cloud-upload-alt mr-2"></em>upload
      </button>
      <br /><br />
      <span class=""> You can also drag & drop file(s) here </span></span
    >
    <div
      :id="options.id + 'preview'"
      class="row dropzone-previews p-2 pt-4"
    ></div>
  </div>
  <div id="preview_template" v-show="false">
    <div class="col-md-12">
      <div class="card shadow-lg">
        <img
          class="card-img-top img-fluid m-0"
          src=""
          data-dz-thumbnail
          alt=""
        />
        <div class="card-body px-1 py-0">
          <h5 class="card-title" data-dz-status></h5>
          <p class="card-text m-0">
            <small class="text-muted" data-dz-size></small>
          </p>
          <div class="progress">
            <div
              class="progress-bar bg-gradient-cyan"
              role="progressbar"
              aria-valuenow="60"
              aria-valuemin="0"
              aria-valuemax="100"
              style="width: 0%"
              data-dz-uploadprogress
            ></div>
          </div>
          <button class="btn btn-block btn-danger" data-dz-remove>
            remove
          </button>
          <div
            class="text-danger mt-2 dz-error-message"
            data-dz-errormessage
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Dropzone from "dropzone";
export default {
  name: "Dropzone",
  props: ["options"],
  data() {
    return {
      headers: this.options.headers,
      upload_url: this.options.upload_url,
      maxFilesize: this.options.maxFilesize,
      maxFiles: this.options.maxFiles,
    };
  },
  methods:{
      submit_image:function(){
          if(this.option.submit){
            const th = this;
              new Dropzone(`#${th.options.id}`, {
                url: th.upload_url,
                method: th.options.method ? th.options.method : "post",
                maxFilesize: th.maxFilesize,
                headers: th.headers,
                maxFiles: th.maxFiles,
                previewsContainer: "#" + th.options.id + "preview",
                previewTemplate: document.getElementById("preview_template").innerHTML,
                clickable: document.getElementById(th.options.id + "clickable"),
                the: th,
                init: function () {
                    this.on("sending", th.options.on_sending || function () {});
                    this.on("complete", th.options.on_complete || function () {});
                    this.on("removedfile", th.options.on_remove || function () {});
                },
               });
          }
      }
  },
  mounted() {
   
  },
};
</script>

<style>
</style>