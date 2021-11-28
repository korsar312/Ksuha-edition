<template>
    <div v-on:contextmenu="show" class="wrapper">
        <div  class="file">

            <div v-on:click="upFolder" v-if="path.length > 1">
                <file :file="{name: '...', type: 'folder'}"/>
            </div>
            <div v-on:contextmenu="ishow" v-on:click="item.func" v-for="(item) in currentFolder" :key="item.name">
                <file :file="item"/>
            </div>
        </div>


        <v-menu
                v-model="showMenu"
                :position-x="x"
                :position-y="y"
                absolute
                offset-y
        >
            <v-list>
                <v-btn text
                       class="btn"
                       v-for="item in items"
                       :key="item.title"
                       v-on:click="item.func"
                >
                    {{ item.title }}
                </v-btn>
            </v-list>
        </v-menu>
        <ModalConfirm :close="closeModal"
                      :confirmP="confirmModal"
                      :dialog="showModal"/>
        <AddDocumentModalF
                :close="closeModalF"
                :confirm="confirmModalF"
                :dialog="showModalF"
                :path="location"
        />
    </div>
</template>

<script>
    import ModalConfirm from "../../components/ModalConfirm";
    import File from "../../components/File";
    import AddDocumentModalF from "../../components/AddDocumentModalF";
    export default {
        name: "WorkPlace",
        components: {AddDocumentModalF,  File, ModalConfirm},
        data(){
            return{
                location: '',
                openFolders: [],
                showModalF: false,
                showModal: false,
                showMenu: false,
                x: 0,
                y: 0,
                items: [
                    {
                        title: 'Создать папку',
                        func: this.showAddModal,
                    },
                    {
                        title: 'Добавить файл',
                        func: this.addFile,
                    },
                ],
            }
        },
        computed:{
            path() {return [...this.openFolders, this.$store.state.MyFolders]},
            currentFolder(){
                return this.path[0]?.map((el,i)=>({...el, func: el.type === 'folder' ? ()=>this.openFolder(i,el.name) : ()=>this.downloadFile(el.name)}))
            }
        },
        methods:{
            show (e) {
                e.preventDefault()
                this.item = [
                    {
                        title: 'Создать папку',
                        func: this.showAddModal,
                    },
                    {
                        title: 'Добавить файл',
                        func: this.addFile,
                    },
                ],
                this.showMenu = false
                this.x = e.clientX
                this.y = e.clientY
                this.$nextTick(() => {
                    this.showMenu = true
                })
            },
            ishow (e) {
                e.preventDefault()
                this.item = [
                    {
                        title: 'Удалить папку',
                        func: this.showAddModal,
                    },
                ],
                    this.showMenu = false
                this.x = e.clientX
                this.y = e.clientY
                this.$nextTick(() => {
                    this.showMenu = true
                })
            },
            showAddModalF(){
                this.showModalF = true
            },
            closeModalF(){
                this.showModalF = false
            },
            confirmModalF(){
                this.showModalF = false
            },
            openFolder(i,name){
                this.openFolders.unshift(this.path[0][i]?.children)
                this.location += this.location.length === 0 ? name : `/${name}`
            },
            upFolder(){
                this.openFolders.shift()
                this.location = this.location.substring(0,this.location.lastIndexOf('/'))
                console.log(this.openFolders)
            },
            downloadFile(name){
                this.$store.dispatch('getFile', this.location + name)
            },
            remove(){
                this.$store.dispatch('deleteDocuments', {
                    json: JSON.stringify(this.program),
                })
            },
            addFile(){
                this.showModalF = true
            },
            showAddModal(){
                this.showModal = true
            },
            closeModal(){
                this.showModal = false
            },
            confirmModal(x){

                this.$store.dispatch('postFolder', {
                    json: x,
                    path: this.location,
                    callback: ()=>{
                        this.closeModal()
                        console.log(this.openFolders)
                        this.openFolders[0].push({name: x, type: 'folder', children: []})
                    }
                })
            },
        }
    }
</script>

<style scoped>

    .wrapper{
        height: 100%;
    }

    .file{
        gap: 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: flex-start;
    }

    .btn{
        display: block;
    }


</style>