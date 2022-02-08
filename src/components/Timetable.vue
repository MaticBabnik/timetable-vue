<template>
    <div class="timetable">
        <div
            class="tspan"
            v-for="(tspan, i) in timetabledata.scheduleDefinitions"
            :key="i"
            :style="{ gridColumn: 1, gridRow: i + 1 }"
        >
            <span>
                {{ tspan.from }}
            </span>
            <span class="dash"> - </span>
            <span>
                {{ tspan.to }}
            </span>
        </div>
        <div
            class="period"
            v-for="(period, index) in rawLessons"
            :key="index"
            :style="{ gridColumn: period.day + 1, gridRow: period.period }"
        >
            <lesson
                v-for="(lesson, i2) in period.lessons"
                :lesson="lesson"
                :color="colorMap[lesson.name]"
                :key="`${index}-${i2}`"
            />
        </div>
    </div>
</template>

<script>
import Lesson from "./Lesson.vue";
export default {
    components: { Lesson },
    props: ["timetabledata"],
    computed: {
        rawLessons() {
            const periods = this.timetabledata.days
                .map((d, di) =>
                    d.lessons.map((p, pi) => ({
                        day: di + 1,
                        period: pi + 1,
                        lessons: p,
                    }))
                )
                .flat(1);

            return periods;
        },
        colorMap() {
            const lessonNames = [
                ...new Set(
                    this.rawLessons
                        .map((p) => p.lessons)
                        .flat()
                        .map((x) => x.name)
                ),
            ].sort();
            const lessonToColor = {};

            for (
                let i = 0, j = 0;
                j < lessonNames.length;
                i += 320 / lessonNames.length + 1, j++
            ) {
                lessonToColor[lessonNames[j]] = i;
            }
            return lessonToColor;
        },
    },
};
</script>

<style lang="less">
.timetable {
    margin: 0.5rem;
    display: grid;
    grid-template-columns: min-content 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 0.25rem;

    .tspan {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .dash {
            color: darken(@light1, 50%);
        }
        span {
            color: darken(@light1, 20%);
        }

    }

    .period {
        display: flex;
        align-items: stretch;
        width: 100%;
        flex-direction: row;
        justify-self: stretch;
        align-self: stretch;
        gap: 0.25rem;
    }
}
</style>
