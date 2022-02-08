<template>
    <div id="about">
        <h1>{{env.title}} (timetable-vue)</h1>
        <a href="https://github.com/MaticBabnik/timetable-vue">Github</a> | 
        <a href="https://github.com/MaticBabnik/easistent-tt">Backend Github</a>
        <p>
          A frontend for easistent-tt. 
          This instance's API is located at <span class="code">{{env.api}}</span>
        </p>
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
};
</script>

<style lang="less">
#about {
  padding: 1rem;
}
</style>
