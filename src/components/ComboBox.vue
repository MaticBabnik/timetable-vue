<template>
    <div class="combo-box" :class="{ expanded: expanded }" @click="toggle">
        <input
            type="text"
            :placeholder="placeholder"
            :value="selectedDisplay"
            readonly
        />
        <img src="@/assets/combo-arrow.svg" />

        <ul class="options">
            <li
                v-for="option in options"
                :key="option.key"
                @click="() => select(option)"
            >
                {{ option.display }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ["options", "selectedKey", "placeholder"],
    emits: ["update:selectedKey", "change"],
    data() {
        return {
            selected: null,
            closeGlobal: false,
            expanded: false,
        };
    },
    methods: {
        toggle(e) {
            this.expanded = !this.expanded;
            this.closeGlobal = false;
        },
        select(value) {
            this.selected = value.key;
            this.$emit("update:selectedKey", value.key);
            this.$emit("change", value.key);
        },
        globalClick() {
            if (this.closeGlobal) this.expanded = false;
            else {
                this.closeGlobal = true;
            }
        },
    },
    computed: {
        selectedDisplay() {
            return this.options?.find(
                (x) => x.key === this.selectedKey ?? this.selected
            )?.display;
        },
    },
    mounted() {
        window.addEventListener("click", this.globalClick);
    },
    unmounted() {
        window.removeEventListener("click", this.globalClick);
    },
};
</script>

<style lang="less">
@border-width: 1px;

.combo-box {
    display: flex;
    position: relative;
    border: @border-width fade(@light0, 50%) solid;
    border-radius: 0.5rem;

    &.expanded {
        border-radius: 0.5rem 0.5rem 0 0;
        border-bottom: none;

        img {
            transform: rotate(180deg);
        }
    }

    input {
        appearance: none;
        border: none;
        background: none;
        outline: none;
        cursor: default;
    }

    img {
        padding: 2px;
        border-radius: 0 0.5rem 0.5rem 0;
    }

    &:hover:not(.expanded) img {
        background-color: @red;
    }

    .options {
        display: none;
    }

    &.expanded .options {
        z-index: 1000;

        position: absolute;
        top: 100%;
        left: -1 * @border-width;
        width: 100%;
        display: block;
        background-color: @dark0;
        border: @border-width fade(@light0, 50%) solid;
        border-top: none !important;
        border-radius: 0 0 0.5rem 0.5rem;
        overflow: hidden;
        padding: 0;
        margin: 0;

        max-height: 50vh;
        overflow: hidden;
        overflow-y: scroll;

        li {
            list-style-type: none;
            cursor: default;
            padding: 0.2rem;
            &:hover {
                background-color: @red;
            }
        }
    }
}
</style>
