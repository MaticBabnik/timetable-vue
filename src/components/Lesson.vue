<template>
    <div
        class="lesson"
        :class="{ canceled: isCanceled }"
        :style="{
            background: `linear-gradient(to right, transparent, hsl(${color},80%,40%))`,
            borderLeft: `0.3rem hsl(${color},80%,40%) solid`,
        }"
    >
        <span class="title"> {{ lesson.name }} </span>
        <span v-if="showRoom" class="room">{{ lesson.room }}</span>
        <span v-if="showClass" class="class">{{ lesson.className }}</span>
        <span v-if="showTeacher" class="teacher">{{ lesson.teacher }}</span>
        <span v-if="showTeacher" class="teacher-short">{{ shortTeacher }}</span>
    </div>
</template>

<script>
const NAME_SHORTEN_REGEX = /([\wčžćšđ]{2,})/gi;
const FLAG_WHITELIST = [
  "SUBSTITUTE",
  "REPLACEMENT",
  "NOTDONE",
  "EVENT",
  "OFFICEHOURS",
  "HALFTIME",
  "CLUB",
  "ONLINE",
  "EXAM",
];

export default {
    props: ["lesson", "color"],
    computed: {
        showRoom() {
            return !(
                !this.lesson.room ||
                this.lesson.room === "" ||
                this.lesson.room === "?"
            );
        },
        showClass() {
            return !(
                !this.lesson.className ||
                this.lesson.className === "" ||
                this.lesson.className === "?"
            );
        },
        showTeacher() {
            return !(
                !this.lesson.teacher ||
                this.lesson.teacher === "" ||
                this.lesson.teacher === "?"
            );
        },
        shortTeacher() {
            return this.lesson.teacher.replace(NAME_SHORTEN_REGEX, (x) => x[0]);
        },
        isCanceled() {
            return this.lesson?.flags?.includes("CANCELED");
        },
        shownFlags() {
            //filters out flags that have icons
            return this.lesson?.flags?.filter((x) =>
                FLAG_WHITELIST.includes(x)
            );
        },
    },
};
</script>

<style lang="less">
.lesson {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0.5rem;
    border-radius: 0.3rem;
    flex: 1;
    color: #fff;
    //background: linear-gradient(to left, transparent, fade(@dark0,100%), fade(@dark0,100%));

    &.canceled {
        * {
            color: #aaa;
        }
        .title {
            text-decoration: line-through red 3px;
        }
        background: linear-gradient(to right, transparent, #8885) !important;
        border-left: 0.3rem #888 solid !important;
    }

    .title {
        font-weight: bold;
    }

    .teacher,
    .teacher-short {
        height: 1rem;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}

.teacher-short {
    display: none;
}

@media screen and (max-width: 1200px) {
    //THIS IS BAD, I HATE MEDIA QUERIES
    .teacher {
        display: none;
    }
    .teacher-short {
        display: inline !important;
    }
}
</style>
