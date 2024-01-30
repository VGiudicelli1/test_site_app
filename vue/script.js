const size_max = 100;
const size_photo = 25;

let app = Vue.createApp({
    data() {
        return {
            message: "",
            photo: false,
            tweets: [],
        };
    },
    computed: {
        carRestants() {
            return size_max - this.message.length - size_photo * this.photo;
        }
    },
    methods: {
        addTweet() {
            this.tweets.push({
                message: this.message,
                photo: this.photo ? `https://picsum.photos/150/100?random=${Math.random()}` : null
            });
        }
    }
});

app.component("tweet", {
    template: `<div class="tweet">
        <p>{{ message }}</p>
        <img v-if="image" :src="image">
    </div>`,
    props: {
        message: {
            type: String,
            default: '...'
        },
        image: {
            type: String,
            default: null
        }
    }
});

app.component("compteur", {
    template: `<div><button @click="add">+</button><span>  {{ value }}  </span><button @click="rem">-</button><button @click="reset">Resset</button></div>`,
    data() {
        return {
            value: localStorage.getItem("compteur_value"),
        }
    },
    watch: {
        value() {
            localStorage.setItem("compteur_value", this.value);
        }
    },
    methods: {
        add() {
            this.value++;
        },
        rem() {
            this.value--;
        },
        reset() {
            this.value = 0;
        }
    }
});

app.mount("#app");