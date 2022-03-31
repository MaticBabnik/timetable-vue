<template>
    <div id="nav">
        <div id="title">
            <h1>
                {{ env.title }}<span id="version">{{ env.ver }}</span>
            </h1>
        </div>

        <div id="combo-container">
            <combo-box
                id="mode"
                placeholder="Mode"
                :options="modes"
                v-model:selectedKey="viewType"
            />
            <combo-box
                id="param"
                placeholder=" "
                :options="opts"
                v-model:selectedKey="viewParam"
                @change="onchange"
            />
        </div>

        <router-link to="/about"><span> About </span></router-link>
        <!-- <a href="">about</a> -->
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
        async updateCombo() {
            this.viewType = this.$route.params?.type ?? "";
            this.viewParam = this.$route.params?.key ?? "";
        },
    },
    async mounted() {
        await this.$router.isReady();

        this.updateCombo();
        this.$router.afterEach(this.updateCombo);
        
        if (this.viewType != "teachers") {
            this.viewParam = this.viewParam.toUpperCase();
        }
    },
};
</script>

<style lang="less">
#mode,
#param {
    margin: 0 0.2rem;
}

#nav {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-items: stretch;
    background-color: @dark1;
    position: relative;

    #combo-container {
        display: flex;
        align-items: center;

    }

    a {
        text-decoration: none;
        display: grid;
        place-items: center;
        margin: 0 .25rem;

        span {
            padding: 0 1rem;
        }

        &:hover {
            background-color: #fff2;
        }

        &.router-link-active {
            border-bottom: @red 2px solid;
        }
    }
}

#title > h1 {
    color: @red;
    font-size: 3rem;
    padding: 0.25rem;
    margin: 0;
}

#version {
    font-size: 1rem;
    vertical-align: bottom;
}
</style>
