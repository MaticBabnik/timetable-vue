<template>
    <div id="timetable">
        <timetable
            :timetabledata="timetable"
            v-if="timetableSelected && !isloading && !!timetable"
        />
        <h1 v-else-if="timetableSelected && !isloading">
            ⚠ Ne morem ti naloziti urnika 👷‍♂️👎
        </h1>
        <h1 v-else-if="timetableSelected && isloading">
            Nalagam ti urnik 🔧👷‍♂️
        </h1>
        <h1 v-else>Izberi urnik da ti ga nalozim... 👷‍♂️👍</h1>
    </div>
</template>

<script>
import Timetable from "@/components/Timetable.vue";
import gql from "graphql-tag";

const QUERRIES = {
    classes: gql`
        query ($arg: String!) {
            classTimetable(className: $arg) {
                scheduleDefinitions {
                    from
                    to
                }
                days {
                    lessons {
                        name
                        teacher
                        room
                        flags
                    }
                }
            }
        }
    `,
    classrooms: gql`
        query ($arg: String!) {
            classroomTimetable(classroomName: $arg) {
                scheduleDefinitions {
                    from
                    to
                }
                days {
                    lessons {
                        name
                        teacher
                        className
                        flags
                    }
                }
            }
        }
    `,
    teachers: gql`
        query ($arg: String!) {
            teacherTimetable(teacherName: $arg) {
                scheduleDefinitions {
                    from
                    to
                }
                days {
                    lessons {
                        name
                        room
                        className
                        flags
                    }
                }
            }
        }
    `,
};

function isNullOrEmpty(str) {
    return !str || str === "";
}

export default {
    name: "Home",
    components: {
        Timetable,
    },
    data() {
        return {
            viewType: "",
            viewParam: "",
            timetableSelected: false,
        };
    },
    computed: {
        opts() {
            return this.options?.[this.viewType] ?? [];
        },
        isloading() {
            return this.$apollo.queries.timetable.loading;
        },
    },
    apollo: {
        timetable: {
            query() {
                return QUERRIES[this.viewType];
            },
            variables() {
                return { arg: this.viewParam };
            },
            update(data) {
                return (
                    data.classTimetable ??
                    data.classroomTimetable ??
                    data.teacherTimetable
                );
            },
            skip() {
                return !this.timetableSelected;
            },
        },
    },
    mounted() {
        this.viewType = this.$route.params.type ?? "";
        this.viewParam = this.$route.params.key ?? "";

        if (Object.keys(QUERRIES).includes(this.viewType))
            if (!isNullOrEmpty(this.viewParam)) {
                this.timetableSelected = true;
            }
    },
};
</script>
