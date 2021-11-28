<template>
    <v-row justify="center">
        <v-dialog
                v-model="dialog"
                persistent
                max-width="600px"
        >
            <v-card>
                <v-card-title>
                    <span class="text-h5">Информация о {{obj.fileName}}</span>
                </v-card-title>
                <v-card-text>
                        <v-container>
                            <v-row v-for="(item, i) in Object.entries(obj.more).filter(el=>el[0] !== 'data')" :key="i">
                                {{item[0]}}: {{item[1]}}
                            </v-row>
                        </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="blue darken-1"
                            text
                            @click="close"
                    >
                        Закрыть
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    export default {
        name: "InfoModal",
        data(){
            return{
            }
        },
        props: {
            dialog: {
                type: Boolean,
                default: false
            },
            obj: {
                type: Object,
                default() {
                    return {}
                }
            },
            close: {
                type: Function,
                default(){
                    return console.log('Нет назначения')
                }
            },
        }
    }
</script>

<style scoped>

</style>