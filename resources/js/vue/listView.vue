<template>
    <div>
        <div v-for="(item, index) in items" :key="index">
            <list-item :item="item" class="item" v-on:itemchanged="$emit('reloadlist')" v-on:updateTaskName="testIdMethod"/>
        </div>
    </div>
</template>

<script>
    //$emit('showModal')
    import listItem from "./listItem";

    export default {
        props: ['items'],
        data() {
            return {
                updateItem: null
            }
        },
        components: {
            listItem
        },
        methods: {
            testIdMethod: function (value) {
                this.updateItem = value;
                this.$emit('showModal', this.updateItem);
            }
        }
    }
</script>

<style scoped>
    .item {
        background: lightgray;
        padding: 5px;
        margin-top: 8px;
    }
</style>
