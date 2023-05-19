// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    modules: [
        "@nuxtjs/tailwindcss",
        "@pinia/nuxt",
        "@pinia-plugin-persistedstate/nuxt",
    ],
    components: ["~/components", "~/components/auth"],
    runtimeConfig: {
        public: {
            GITHUB_TOKEN: process.env.GITHUB_TOKEN,
            GITHUB_USERNAME: process.env.GITHUB_USERNAME,
            GITHUB_REPOSITORY: process.env.GITHUB_REPOSITORY,
        },
    },
});
