// register service worker
if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}


let app = Vue.createApp({
    data() {
        return {
         };
    },
    computed: {
     },
    methods: {
    }
});
app.mount("#app");