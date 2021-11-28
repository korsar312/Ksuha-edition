<template>
    <v-col class="d-flex justify-center mb-2">
        <v-card
                class="d-flex justify-center align-center"
                width="300"
                min-height="323"
        >
            <v-btn
                    v-on:click="func"
                    class="mx-2"
                    fab
                    x-large
                    elevation="2"
            >
                <slot/>
            </v-btn>
        </v-card>
    </v-col>
</template>

<script>
    export default {
        name: "ArchiveCartCreated",
        props: {
            func:{
                type: Function,
                default(){
                    return console.log('нет действия')
                }
            }
        }
    }
</script>

<style scoped>

</style>