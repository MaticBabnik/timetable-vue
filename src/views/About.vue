<template>
    <div id="about">
        <h1>{{ env.title }} (timetable-vue)</h1>
        <a href="https://github.com/MaticBabnik/timetable-vue">Github</a> |
        <a href="https://github.com/MaticBabnik/easistent-tt">Backend Github</a>
        <p>
            A frontend for easistent-tt. This instance's API is located at
            <span class="code">{{ env.api }}</span>
        </p>
        <h2>Enviroment</h2>

        <code class="code">
            <template v-for="v in enviroment" :key="v.key">
                <span>{{ v.key }}={{ v.value }}</span><br>
            </template>
        </code>
    </div>
</template>

<script>
export default {
    data() {
        return {
            env: {
                title: process.env.VUE_APP_TITLE,
                ver: process.env.VUE_APP_VERSION,
                api: process.env.VUE_APP_API_ENDPOINT,
            },
        };
    },
    computed: {
        enviroment() {
            return [...Object.entries(process.env)].map(([key, value]) => ({
                key,
                value
            }));
        },
    },
};
</script>

<style lang="less">
#about {
    padding: 1rem;
}
code {
    display: block;
    width: fit-content;
}
</style>
