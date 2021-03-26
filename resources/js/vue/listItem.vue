<template>
    <div class="item">
        <input
            type="checkbox"
            @change="updateStatus()"
            v-model="item.completed"
        />

        <span :class="[item.completed ? 'completed' : 'uncompleted', 'itemText']"> {{item.name}} </span>

        <button class="pen" v-on:click="updateName">
            <font-awesome-icon icon="pen" />
        </button>

        <button @click="showModal" class="trashcan">
            <font-awesome-icon icon="trash" />
        </button>

        <div class="modal">
            <modal v-show="isModalVisible" @close="closeModal">
                <template v-slot:header>
                    Are you sure to delete this task?
                </template>

                <template v-slot:body>
                    <button id="confirm" @click="deleteItem">Confirm</button>
                </template>

                <template v-slot:footer>

                </template>
            </modal>
        </div>

    </div>
</template>

<script>

    import modal from "./modal";

    export default {
        props: ['item'],
        components: {
            modal
        },
        data() {
            return {
                itemId: null,
                isModalVisible: false
            }
        },
        methods: {
            updateStatus() {
                axios.put('api/item/' + this.item.id, {
                    item: this.item
                })
                .then(response => {
                    if(response.status === 200)
                    {
                        this.$emit('itemchanged');
                    }
                })
                .catch(error => {
                    console.log(error);
                })
            },
            deleteItem() {
                axios.delete('api/item/' + this.item.id)
                    .then(response => {
                        if(response.status === 200)
                        {
                            this.$emit('itemchanged')
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            updateName: function(value) {
                this.itemId = this.item.id;
                this.$emit('updateTaskName', this.item);
            },
            showModal: function (value) {
                this.isModalVisible = true;
                this.updateItem = value;
                console.log(value)
            },
            closeModal() {
                this.isModalVisible = false;
            },
        }
    }
</script>

<style scoped>
    .completed {
        text-decoration: line-through;
        color: #2d3748;
    }

    .uncompleted {
        text-decoration: none;
        color: black;
    }

    .itemText {
        width: 100%;
        margin-left: 20px;
    }

    .item {
        display: flex;
        justify-content: center;
        align-items: center;
        transition: transform .2s;
    }

    .item:hover{
        width: 400px;
        box-shadow: 0 8px 4px 0 rgba(0,0,0,0.2);
        transform: scale(1.1);
    }

    .trashcan {
        background: lightgray;
        border: none;
        color: red;
        outline: none;
    }

    .pen {
        background: lightgray;
        border: none;
        color: orange;
        outline: none;
    }

    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: lightgray;
        display: table;
        transition: opacity .3s ease;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    #confirm {
        color: white;
        background: dodgerblue;
        border: 1px solid blue;
        border-radius: 2px;
        width: 100%;
    }

</style>
