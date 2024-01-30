// register service worker
if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
    console.log("service ajouté");
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