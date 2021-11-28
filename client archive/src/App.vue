<template>
    <v-app id="inspire">
        <template>
            <Header/>
            <ExerciseDetails/>

            <v-main v-if="!downloading">
                    <router-view>
                    </router-view>
            </v-main>

            <v-overlay :value="downloading">
                <v-progress-circular
                        indeterminate
                        size="64"
                ></v-progress-circular>
            </v-overlay>
        </template>
    </v-app>
</template>

<script>
import Header from "./components/Header";
import ExerciseDetails from "./components/ExerciseDetails";

export default {
    name: 'App',
    data(){
        return{
            downloading: true
        }
    },
    mounted() {
        this.$vuetify.theme.dark = true
        this.$store.dispatch('getFolders', ()=>this.downloading = false)
    },
    methods: {
    },
    components: {
        ExerciseDetails,
        Header
    },
};
</script>
