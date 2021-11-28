<template>
    <v-col class="d-flex justify-center mb-2">
        <v-card
                class="cart"
                outlined
                :loading="loading"
                width="300"
                min-height="323"
        >
            <template slot="progress">
                <v-progress-linear
                        absolute
                        :background-opacity="0"
                        bottom
                        color="deep-purple"
                        height="10"
                        indeterminate
                ></v-progress-linear>
            </template>

            <v-img
                    style="background: #800000 "
                    height="150"
                    src="./../assets/icon.svg"
            ></v-img>

            <v-card-title>{{program.fileName}}</v-card-title>

            <v-card-text>
                <div>{{program.description}}</div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-card-actions>
                <v-btn
                        color="deep-purple lighten-2"
                        text
                        @click="modalToggle"
                >
                    Информ
                </v-btn>

                <v-spacer></v-spacer>

                <v-btn
                        color="deep-purple lighten-2"
                        class="mr=0"
                        text
                        @click="event(), reserve()"
                        :loading="loading"
                >
                    Скачать
                </v-btn>

                <v-spacer></v-spacer>

                <v-btn
                        color="deep-purple lighten-2"
                        text
                        @click="remove"
                >
                    Удалить
                </v-btn>
            </v-card-actions>
            <InfoModal :dialog="showModal" :close="modalToggle" :obj="program"/>

        </v-card>
    </v-col>
</template>

<script>
    import InfoModal from "./InfoModal";
    export default {
        name: "ArchiveCart",
        components: {InfoModal},
        data(){
            return{
                loading: false,
                showModal: false,
                selection: 1,
            }
        },
        methods:{
            remove(){
                this.$store.dispatch('deleteDocuments', {
                    json: JSON.stringify(this.program),
                })
            },
            event(){
                this.$store.dispatch('getFile', this.program.fileName)
            },
            reserve () {
                this.loading = true
                setTimeout(() => (this.loading = false), 1000)
            },
            moveTo(id){
                this.$router.push({name:'DocumentFolder', params: { post_id: id } })
            },
            modalToggle(){
                this.showModal = !this.showModal
            }
        },
        props:{
            program:{
                type:Object,
                default(){
                    return {}
                }
            }
        }
    }
</script>

<style scoped lang="scss">

    .cart{
        border-radius:50px 0px 25% 0%;
        overflow: hidden;
        box-shadow: 0 0 15px rgba(0,0,0, 0.2);
        position: relative;
    }

</style>