import type { App } from "vue";
import { Field, Form, ErrorMessage } from 'vee-validate';

export default {
    install(app: App<Element>) {
        app.component('Field', Field);
        app.component('Form', Form);
        app.component('ErrorMessage', ErrorMessage);
    }
}