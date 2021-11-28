<template>
    <v-row justify="center">
        <v-dialog
                v-model="dialog"
                persistent
                max-width="600px"
        >
            <v-card                 class="add"
            >
                <v-card-title>
                    <span class="text-h5">Добавить файл</span>
                </v-card-title>
                <v-card-text>
                    <v-form v-model="form">
                        <v-container>
                            <v-row>
                                <v-col
                                        cols="12"
                                        sm="6"
                                        md="4"
                                >
                                    <v-text-field
                                            v-model="fileName"
                                            label="Имя файла*"
                                            required
                                            :rules="fileNameRules"
                                            :counter="20"
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                        cols="12"
                                        sm="6"
                                        md="4"
                                >
                                    <v-text-field
                                            v-model="authorName"
                                            label="Имя автора"
                                            :counter="20"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12">
                                    <v-text-field
                                            v-model="description"
                                            label="Описание файла"
                                            :counter="40"
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                        cols="12"
                                        sm="6"
                                >
                                    <v-select
                                            v-model="importance"
                                            :items="['Высокая', 'Средняя', 'Низкая']"
                                            label="Важность"
                                    ></v-select>
                                </v-col>
                                <v-col
                                        cols="12"
                                        sm="6"
                                >
                                    <v-autocomplete
                                            v-model="fileType"
                                            :items="['Картинки', 'Текстовые файлы', 'Прочее']"
                                            label="Тип файла*"
                                            required
                                            :rules="fileTypeRules"
                                    ></v-autocomplete>
                                </v-col>
                                <v-col
                                        cols="12"
                                >
                                    <v-file-input
                                            v-model="files"
                                            accept="image/png, image/jpeg, image/bmp, application/pdf, "
                                            placeholder="Выберите файл*"
                                            required
                                            :error-messages="''"
                                            :rules="filesRules"
                                    ></v-file-input>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                    <small>*Необходимые поля</small>
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
        name: "AddDocumentModalF",
        data(){
            return{
                fileName: '',
                fileNameRules: [
                    v => !!v || 'Имя необходимо',
                ],
                authorName: '',
                description: '',
                importance: '',
                fileType: '',
                fileTypeRules: [
                    v => !!v || 'Тип файла необходим',
                ],
                files: [],
                filesRules: [
                    v => !!v.name || 'Файл необходим',
                ],
                form: false
            }
        },
        methods:{
            confirm(){
                if(!this.form) return

                this.$store.dispatch('postDocumentsF', {
                    file: this.files,
                    path: this.path,
                    json: JSON.stringify(this.newObj()),
                    callback: ()=>{
                        this.files = []
                        this.close()
                    }
                })
            },
            newObj(){
                return{
                    fileName: this.fileName,
                    authorName: this.authorName,
                    description: this.description,
                    importance: this.importance,
                    fileType: this.fileType,
                }
            }
        },
        props: {
            dialog: {
                type: Boolean,
                default: false
            },
            close: {
                type: Function,
                default(){
                    return console.log('Нет назначения')
                }
            },
            path: {
                type: String,
                default(){
                    return ''
                }
            },
        }
    }
</script>

<style scoped>

    .add{
        border-radius: 18pt;
        border: #fff solid 2px;
        background-image: url("../assets/hammer_and_sickle.svg");
        background-size: contain;
    }

</style>