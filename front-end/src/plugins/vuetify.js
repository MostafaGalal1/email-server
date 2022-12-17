import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        options: {
            customProperties: true,
        },
        themes: {
            light: {
                background: '#F8F8F7',
            },
            dark: {
                background: '#212121',
            }
        },
    },
});
