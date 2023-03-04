import type { App } from "vue";
import HomePlusOutline from 'vue-material-design-icons/HomePlusOutline.vue';
import CartOutline from 'vue-material-design-icons/CartOutline.vue';

export default {
    install(app: App<Element>) {
        app.component('HomePlusOutline', HomePlusOutline);
        app.component('CartOutline', CartOutline);
    }
}