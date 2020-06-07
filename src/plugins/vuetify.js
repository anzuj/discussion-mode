import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'md',
    },
    theme: {
        themes: {
            light: {
                // From teambaromerter
                primary: '#842353',
                lightpink: '#F7F3F5',
                secondary: '#757575',
                accent: '#2196F3',
                error: '#F44336',
                info: '#FF9800',
                success: '#8BC34A'        
              }
        },
    },
});
