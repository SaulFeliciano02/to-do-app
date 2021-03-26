require('./bootstrap');

import Vue from 'vue'
import App from './vue/app.vue'
import VueConfirmDialog from "vue-confirm-dialog";
Vue.use(VueConfirmDialog);
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlusCircle, faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPlusCircle, faTrash, faPen);

Vue.component('font-awesome-icon', FontAwesomeIcon);

const app = new Vue({
    el: '#app',
    components: { App }
});
