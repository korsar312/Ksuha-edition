<template>
    <div>
        <v-row class="d-flex justify-center mt-4 mx-2">
            <v-col
                    cols="12"
                    sm="4"
            >
                <v-text-field
                        v-model="search"
                        label="Поиск"
                        outlined
                ></v-text-field>
            </v-col>
        </v-row>

        <v-row class="d-flex justify-center mt-4 mx-2">
            <CartCreated :func="showAddModal">
                <v-icon
                        class="icon"
                        large="large"
                >
                    mdi-plus
                </v-icon>
            </CartCreated>
            <ArchiveCart v-for="(program) in list.filter((el)=>el.fileName.includes(search) || el.description.includes(search))" :key="program.id" :program="program"/>
        </v-row>
        <AddDocumentModal
                :close="closeModal"
                :confirm="confirmModal"
                :dialog="showModal"
        />
    </div>
</template>

<script>
    import ArchiveCart from "../../components/ArchiveCart";
    import CartCreated from "../../components/CartCreated";
    import AddDocumentModal from "../../components/AddDocumentModal";
    export default {
        name: "MyDocuments",
        data(){
            return{
                search: '',
                files: [],
                showModal: false
            }
        },
        watch:{
            search(val){
                this.renderlist = this.list.filter((el)=>el.fileName.includes(val) || el.description.includes(val))
            },
        },
        computed:{
            list() {return this.$store.state.MyDocuments},
        },
        components: {AddDocumentModal, CartCreated, ArchiveCart},
        methods: {
            showAddModal(){
                this.showModal = true
            },
            closeModal(){
                this.showModal = false
            },
            confirmModal(){
                this.showModal = false
            },
            uploadDocuments(){

            },
            downloadDocuments(){

            },
        },
    }
</script>

<style lang="scss">

</style>