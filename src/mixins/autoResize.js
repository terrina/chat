export default {
    methods: {
        mixin_autoResize_resize(event) {
            event.target.style.height = "auto";
            event.target.style.height = `${event.target.scrollHeight}px`;
        },
        mixin_autoResize_reset(event) {
            event.target.style.height = "auto";
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.$el.setAttribute(
                "style",
                "height",
                `${this.$el.scrollHeight}px`
            );
        });
    }
};