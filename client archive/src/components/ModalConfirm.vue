<template>
    <v-row v-on:contextmenu="context" justify="center">
        <v-dialog
                v-model="dialog"
                persistent
                max-width="600px"
        >
            <v-card
                    v-on:contextmenu="context"
                    class="add"
            >
                <v-card-title>
                    <span class="text-h5">Введите имя</span>
                </v-card-title>
                <v-card-text>
                    <v-form v-model="form">
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                            v-model="description"
                                            label="Описание файла"
                                            :counter="40"
                                            :rules="descriptionRules"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
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
                    <v-btn
                            color="blue darken-1"
                            text
                            @click="confirm"
                    >
                        Принять
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    export default {
        name: "ModalConfirm",
        data(){
            return{
                description: '',
                descriptionRules: [
                    v => !!v || 'Имя необходимо',
                ],
                form: false
            }
        },
        methods:{
            newObj(){
                return{
                    description: this.description,
                }
            },
            context(e){
                e.preventDefault()
            },
            confirm(){
                this.form && this.confirmP(this.description)
            }
        },
        props:{
            dialog: {
                type: Boolean,
                default: false
            },
            close: {
                type: Function,
                default: (x) => console.log(x)
            },
            confirmP: {
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