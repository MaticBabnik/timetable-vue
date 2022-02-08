<template>
    <div id="nav">
        <h1 id="title">
            {{ env.title }}<span id="version">{{ env.ver }}</span>
        </h1>

        <combo-box
            placeholder="Mode"
            :options="modes"
            v-model:selectedKey="viewType"
        />
        <combo-box
            placeholder=" "
            :options="opts"
            v-model:selectedKey="viewParam"
            @change="onchange"
        />

        <div style="flex: 1"></div>

        <router-link to="/about">About</router-link>
    </div>
    <router-view :key="$route.fullPath" />
</template>

<script>
import gql from "graphql-tag";
import ComboBox from "./components/ComboBox.vue";

export default {
    components: {
        ComboBox,
    },
    data() {
        return {
            viewType: "",
            viewParam: "",
            env: {
                title: process.env.VUE_APP_TITLE,
                ver: process.env.VUE_APP_VERSION,
            },
            modes: [
                { key: "classes", display: "Class" },
                { key: "teachers", display: "Teacher" },
                { key: "classrooms", display: "Classroom" },
            ],
        };
    },
    computed: {
        opts() {
            const opts = this.options?.[this.viewType]?.map((x) => ({
                key: x,
                display: x,
            }));
            return opts ?? [];
        },
    },
    apollo: {
        options: {
            query: gql`
                query {
                    classes
                    teachers
                    classrooms
                }
            `,
            update(data) {
                return data;
            },
        },
    },
    methods: {
        onchange(k) {
            if (this.opts?.map((x) => x.key)?.includes(this.viewParam)) {
                this.$router.replace({
                    name: "Timetable",
                    params: { type: this.viewType, key: this.viewParam },
                });
            }
        },
    },
};
</script>

<style lang="less">
#nav {
    width: 100%;
    display: flex;
    align-items: center;
    background-color: @dark1;
}

#title {
    color: @red;
    font-size: 3rem;
    padding: 0.25rem;
    margin: 0;
}

#version {
    font-size: 1rem;
    vertical-align: bottom;
}

a.router-link-active {
    padding: 1rem;
    text-decoration: none;
    display: block;
    &:hover {
        background-color: #fff2;
    }
    height: 100%;
}
</style>
