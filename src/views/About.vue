<template>
  <div class="mt-4 card shadow w-100 p-4">
    <div class="mt-4">
      <h1 class="text-center mb-4">Form Components</h1>
      <h4>Text Input</h4>
      <text-input
        :value="textfield.value"
        :errors="textfield.errors"
        :label="textfield.label"
        :placeholder="textfield.placeholder"
        @type="handle_input_text"
        :is_password="false"
      />
      <text-input
        value=""
        :errors="[]"
        label="password"
        placeholder="Enter your password"
        @type="handle_input_text_passwrod"
        :is_password="true"
      />
      <h4>Number Input</h4>
      <number-input
        :value="numberfield.value"
        :errors="numberfield.errors"
        :label="numberfield.label"
        :placeholder="numberfield.placeholder"
        @type="handle_input_number"
      />
      <h4>Phone Input</h4>
      <phone-input
        :value="phone"
        :errors="[]"
        label="Phone"
        placeholder="Enter your phone number"
        @type="handle_phone_text"
      />
      <h4>Rich Text</h4>
      <rich-text id="one" @change="getText" :text="text"></rich-text>

      <h4 class="mt-4">Dropzone</h4>
      <drop-zone :options="options"></drop-zone>
    </div>
    <div class="mt-6">
      <h1 class="text-center mb-4">Datatable Component</h1>
      <data-table
        id="employees"
        :options="dtb_options.extra_options"
        :actions="dtb_options.actions"
        :data="dtb_options.data"
        :columns="dtb_options.columns"
      />
    </div>
  </div>
</template>
<script>
import Dropzoned from "../components/DropzoneComp";
import TextInput from "../components/TextInput";
import NumberInput from "../components/NumberInput";
import RichText from "../components/RichTextEditor";
import PhoneInput from "../components/PhoneInput";
import axios from "axios";
import DataTable from "@/components/Datatable";

export default {
  name: "about",
  components: {
    "rich-text": RichText,
    "drop-zone": Dropzoned,
    "text-input": TextInput,
    "number-input": NumberInput,
    "data-table": DataTable,
    "phone-input": PhoneInput,
  },
  data() {
    return {
      text:
        '<h1><u>Title</u></h1><p><br></p><p>List of developers :</p><ul><li><strong>Tusifu Edison</strong></li><li><strong>Jesse Jean Lini </strong>- <a href="https://github.com/ndahigeze" rel="noopener noreferrer" target="_blank">link to Github</a></li></ul>',
      number: "",
      textfield: {
        value: "",
        errors: ["this field is required"],
        label: "Name:",
        placeholder: "Enter your name",
      },
      password: "",
      phone: {
        value: "",
        full_format: "+250789270784",
      },
      numberfield: {
        value: "",
        errors: ["this field is required"],
        label: "Age:",
        placeholder: "Enter your age",
      },
      options: {
        id: "dropzone_a",
        headers: {
          Authorization: `Bearer ${this.$store.getters.getToken}`,
        },
        upload_url: `${process.env.VUE_APP_BACKEND_URL}/api/products/2a271f8d-62a5-4c41-a919-0955d118ce36/gallery`,
        maxFilesize: 0.5,
        maxFiles: 5,
        on_sending: function (file, xhr, form_data) {
          form_data.append("is_primary", false);
          form_data.append("image", file);
          form_data.append(
            "product_id",
            "2a271f8d-62a5-4c41-a919-0955d118ce36"
          );
          console.log("sending called");
        },
        on_remove: function (file) {
          if (file.status === "success") {
            axios
              .delete(
                `${process.env.VUE_APP_BACKEND_URL}/api/galleries/${file.response.uuid}/image/removal`,
                {
                  headers: {
                    Authorization: `Bearer ${this.options.the.$store.getters.getToken}`,
                  },
                }
              )
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.error(err);
              });
          }
        },
        on_complete: function (file) {
          if (file.status === "success") {
            file.response = JSON.parse(file.xhr.response);
          }
        },
      },
      dtb_options: {
        data: [
          {
            name: "Martena Mccray",
            position: "Post-Sales support",
            status: true,
          },
          {
            name: "Unity Butler",
            position: "Marketing Designer",
            status: false,
          },
        ],
        actions: [
          {
            btnText: "",
            btnClass: "btn btn-danger btn-sm",
            iconClass: "fa fa-trash",
            btnFn: (uuid) => {
              console.log(uuid);
            },
            btnParamName: "name",
          },
        ],
        columns: [
          {
            title: "Name",
            data: "name",
          },
          { title: "Position", data: "position" },
          {
            title: "Active",
            data: "status",
            render: (data) => {
              return data["status"]
                ? '<span class="text-success">YES</span>'
                : '<span class="text-danger">NO</span>';
            },
          },
        ],
        extra_options: {},
      },
    };
  },
  methods: {
    handle_input_text: function (value) {
      this.textfield.value = value;
    },
    handle_input_text_passwrod: function (value) {
      this.password = value;
    },
    handle_phone_text: function (value) {
      this.phone = value;
    },
    handle_input_number: function (value) {
      this.numberfield.value = value;
    },
    getText: function (text) {
      this.text = text;
    },
  },
  created() {
    console.log(this.$store.getters.getUserProfile);
  },
};
</script>

<style>
</style>
