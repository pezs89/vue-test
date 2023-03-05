import type { App } from "vue";
import HomePlusOutline from 'vue-material-design-icons/HomePlusOutline.vue';
import CartOutline from 'vue-material-design-icons/CartOutline.vue';
import Close from 'vue-material-design-icons/Close.vue';

export default {
    install(app: App<Element>) {
        app.component('HomePlusOutline', HomePlusOutline);
        app.component('CartOutline', CartOutline);
        app.component('Close', Close);
    }
}