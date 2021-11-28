<template>
    <div class="Categor">
        <v-card>
            <v-row
                    class="pa-4"
                    justify="space-between"
            >
                <v-col cols="5">
                    <v-treeview
                            :active.sync="active"
                            :items="items"
                            :open.sync="open"
                            activatable
                            color="warning"
                            open-on-click
                            transition
                    >
                        <template v-slot:prepend="{ item }">
                            <v-icon v-if="!item.children">
                                mdi-account
                            </v-icon>
                        </template>
                    </v-treeview>
                </v-col>

                <v-divider vertical></v-divider>

                <v-col
                        class="d-flex text-center"
                >
                    <v-scroll-y-transition mode="out-in">
                        <div
                                v-if="!selected"
                                class="text-h6 grey--text text--lighten-1 font-weight-light"
                                style="align-self: center;"
                        >
                            Выберете документ
                        </div>
                        <v-card
                                v-else
                                :key="selected.id"
                                class="pt-6 mx-auto"
                                flat
                                max-width="400"
                        >
                            <v-card-text>

                                <h3 class="text-h5 mb-2">
                                    {{ selected.fileName }}
                                </h3>
                                <div class="blue--text mb-2">
                                    {{ selected.description }}
                                </div>
                                <div class="blue--text mb-2">
                                    Контрольная сумма: {{ selected.more.md5 }}
                                </div>
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-row
                                    class="text-left"
                                    tag="v-card-text"
                            >
                                <v-col
                                        class="text-right mr-4 mb-2"
                                        tag="strong"
                                        cols="5"
                                >
                                    Категория:
                                </v-col>
                                <v-col>{{ selected.fileType }}</v-col>

                                <v-col
                                        class="text-right mr-4 mb-2"
                                        tag="strong"
                                        cols="5"
                                >
                                    Важность:
                                </v-col>
                                <v-col>{{ selected.importance ? selected.importance : 'нет' }}</v-col>
                                <v-col
                                        class="text-right mr-4 mb-2"
                                        tag="strong"
                                        cols="5"
                                >
                                    Автор:
                                </v-col>
                                <v-col>{{ selected.author ? selected.author : 'нет' }}</v-col>

                                <v-col
                                        class="text-right mr-4 mb-2"
                                        tag="strong"
                                        cols="5"
                                >
                                    Размер файла:
                                </v-col>
                                <v-col>{{ selected.more.size }}</v-col>
                            </v-row>
                        </v-card>
                    </v-scroll-y-transition>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: "Categories",
        data(){
            return{
                active: [],
                open: [],
                users: this.$store.state.MyDocuments,
            }
        },
        computed: {
            items () {
                return [
                    {
                        name: 'Картинки',
                        children: this.users.filter((user)=>user.fileType === 'Картинки').map((user)=> {
                            return {...user, name:user.fileName}
                        }),
                        id: 1
                    },
                    {
                        name: 'Текстовые',
                        children: this.users.filter((user)=>user.fileType === 'Текстовые файлы').map((user)=> {
                            return {...user, name:user.fileName}
                        }),
                        id: 2
                    },
                    {
                        name: 'Остальные',
                        children: this.users.filter((user)=>user.fileType === 'Прочее').map((user)=> {
                            return {...user, name:user.fileName}
                        }),
                        id: 3
                    },
                ]
            },
            selected () {
                if (!this.active.length) return undefined

                const id = this.active[0]

                return this.users.find(user => user.id === id)
            },
        },
        components: {},

    }
</script>

<style scoped>


</style>