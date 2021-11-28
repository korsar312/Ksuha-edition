<template>
    <div>
        <v-app-bar app>
            <v-app-bar-nav-icon @click="sheet = !sheet"></v-app-bar-nav-icon>
            <v-toolbar-title>{{namePageComp}}        <span :class="{ksuh: true, podlanka: podlanka}">Я - КРАСОТКА!</span></v-toolbar-title>
        </v-app-bar>

        <div class="text-center">
            <v-bottom-sheet v-model="sheet">
                <v-sheet
                        class="text-center"
                        height="200px"
                >
                    <v-list>
                        <v-list-item v-for="[icon, text, link] in links" :key="icon" link v-on:click="follow(link)">
                            <v-list-item-content>
                                <v-list-item-title>{{ text }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                    <v-btn
                            class="mt-6"
                            text
                            color="red"
                            @click="sheet = !sheet"
                    >
                        close
                    </v-btn>
                </v-sheet>
            </v-bottom-sheet>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Header",
        data(){
            return{
                namePage: false,
                links: [
                    ['mdi-book-open-blank-variant', 'Мои документы','MyDocuments'],
                    ['mdi-book-open-variant', 'Категории','Categories'],
                    ['mdi-book-open-variant', 'Рабочий стол','WorkPlace'],
                ],
                sheet: false,
                podlanka: false
            }
        },
        computed:{
            namePageComp:{
                get:  function() {
                    return this.namePage || this.namePageChange()
                },
                set:  function(value) {
                    this.namePage = value
                }
            }

        },
        watch:{
            $route (){
                this.namePageComp = this.namePageChange()
            }
        },
        methods:{
            namePageChange(){
                let path = this.$router.resolve(location).location.path
                switch (path) {
                    case '/Categories':
                        return `Категории`
                    case '/':
                        return `Мои документы`
                    case '/work':
                        return `Рабочий стор`
                }
                return ''
            },
            follow(link){
                this.$router.push({name:link})
            },

        },
        mounted() {
            setTimeout(()=>this.podlanka = true,10000)
        }
    }
</script>

<style scoped>

    .ksuh{
        padding-left: 120px;
        transition: ease-in-out 1s;
        opacity: 0;
        display: inline-block;
        font-size: 20pt;
    }
    .podlanka{
        opacity: 1;
        animation: blink 1.5s infinite;
    }

    @keyframes blink {
        0%{
            transform: scale(0.9);
            color: #fff;
        }
        50%{
            transform: scale(1);
            color: red;
        }
        100%{
            transform: scale(0.9);
            color: #fff;
        }
    }

</style>