<template>
    <div class="addItem">
        <label for="itemName">
            Task Title
        </label>
        <input type="text" id="itemName" v-model="item.name"/>
        <font-awesome-icon
            icon="plus-circle"
            :class="[item.name ? 'active' : 'inactive', 'plus']"
            @click="storeItem()"
        />
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                item: {
                    name: ""
                }
            }
        },
        methods: {
            storeItem() {
                if(this.item.name === '')
                {
                    return;
                }

                //handle http post method with axios
                axios.post('api/item/store', {
                    item: this.item
                })
                .then(response => {
                    if(response.status === 201)
                    {
                        this.item.name = "";
                        this.$emit('reloadlist');
                    }
                })
                .catch( error => {
                    console.log(error)
                })
            }
        }
    }
</script>

<style scoped>
    .addItem {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    input {
        background: white;
        border: 0px;
        outline: none;
        padding: 5px;
        margin-right: 10px;
        margin-left: 10px;
        width: 50%;
    }

    .active {
        color: lawngreen;
    }

    .inactive {
        color: darkslategray;
    }

    .plus {
        font-size: 20px;
    }

    #itemName {
        border-radius: 8px;
    }
</style>
