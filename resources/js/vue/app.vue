<template>
    <div>
        <div class="topbar">
            <h2 id="title">My To-Do List</h2>
        </div>
        <div class="todoListContainer">
            <div class="heading">
                <add-item-form v-on:reloadlist="getItemList()"/>
            </div>
            <list-view :items="items" v-on:reloadlist="getItemList()" @showModal="showModal"/>
        </div>
        <modal v-show="isModalVisible" @close="closeModal" :updateItem="updateItem" v-on:reloadlist="getItemList">
            <template v-slot:header>
                Change Task Name.
            </template>

            <template v-slot:body>
                <label for="nameChangeField">New task name</label>
                <input id="nameChangeField" type="text" v-model="updateItem.name"/>
                <button class="update" @click="updateTaskName()">
                    <font-awesome-icon icon="pen" />
                </button>
            </template>

            <template v-slot:footer>

            </template>
        </modal>
    </div>
</template>

<script>

    import addItemForm from "./addItemForm";
    import listView from "./listView";
    import modal from "./modal";

    export default {
        components: {
            addItemForm,
            listView,
            modal
        },
        data: function () {
            return {
                items: [],
                isModalVisible: false,
                updateItem: null
            }
        },
        methods: {
            //get items from database to put them into the listView
            getItemList () {
                axios.get('api/items')
                .then(response => {
                    this.items = response.data
                })
                .catch(error => {
                    console.log(error)
                })
            },
            showModal: function (value) {
                this.isModalVisible = true;
                this.updateItem = value;
                console.log(value)
            },
            closeModal() {
                this.isModalVisible = false;
            },
            updateTaskName() {
                axios.put('api/item/update/' + this.updateItem.id, {
                    item: this.updateItem
                })
                .then(response => {
                    if(response.status === 200)
                    {
                        this.$emit('reloadlist');
                        this.closeModal();
                        alert("Successfully updated");
                    }
                    else {
                        alert("Error trying to update task");
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            }
        },
        //once this vue component is created, it will execute the getItemList method automatically. Then, pass this items into a props called "items" to our listView
        created() {
            this.getItemList();
        }
    }
</script>

<style scoped>
    .todoListContainer {
        width: 400px;
        margin: auto;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
    }

    .todoListContainer:hover {
        box-shadow: 0 8px 8px 0 rgba(0,0,0,0.2);
    }

    .heading {
        background: dodgerblue;
        padding: 10px;
    }

    #title {
        text-align: center;
    }

    .topbar {
        width: 100%;
        background: dodgerblue;
        margin-bottom: 15px;
        padding: 5px;
        margin-top: -10px;
        margin-left: -5px;
        text-align: center;
        box-shadow: 0 4px 4px 0 rgba(0,0,0,0.2);
    }

    .topbar h2 {
        font-size: 18px;
    }

    .modal {
        display: none; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    }

    .modal-content {
        background-color: #fefefe;
        margin: 15% auto; /* 15% from the top and centered */
        padding: 20px;
        border: 1px solid #888;
        width: 80%; /* Could be more or less, depending on screen size */
    }

    .close {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
    }

    .close:hover,
    .close:focus {
        color: black;
        text-decoration: none;
        cursor: pointer;
    }

    .update {
        background: #FFFFFF;
        border: none;
        color: orange;
        outline: none;
    }
</style>
