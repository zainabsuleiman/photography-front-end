import { createApp, } from 'vue';
import App from './App.vue';
import { store } from './store'
import { router } from './router'
import 'sweetalert2/dist/sweetalert2.min.css';

// Datatables
import 'datatables.net'
import 'datatables.net-dt'
import 'datatables.net-bs4'
import 'datatables.net-buttons-bs4'
import 'datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css'
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css'
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css'
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css'
import 'datatables.net-buttons/js/buttons.colVis.js'
import 'datatables.net-buttons/js/buttons.html5.js'
import 'datatables.net-buttons/js/buttons.flash.js'
import 'datatables.net-buttons/js/buttons.print.js'
import 'datatables.net-select'
import 'datatables.net-select-bs4'
import 'datatables.net-select-bs4/css/select.bootstrap4.min.css'

import { guards } from "./guards";
import { formatter } from "./utils/NumberFormatterUtil";
import DateFormatter from "./utils/DateFormatterUtil"
const app = createApp(App);

app.use(store);
app.use(router);
app.config.globalProperties.$guards = guards
app.config.globalProperties.$num_format = formatter.format
app.config.globalProperties.$date_format = DateFormatter
app.config.globalProperties.$img_placeholder = process.env.VUE_APP_DEFAULT_IMG_URL

app.mount('#app')
