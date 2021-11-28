<template>
    <v-overlay :z-index=10 :value="overlay" v-if="overlay">
        <v-container>
            <v-card outlined class="card ma-4">
                <v-container>
                    <v-row>
                        <v-card-title>{{obj.name}}</v-card-title>

                        <v-spacer></v-spacer>

                        <v-card-actions>
                            <v-btn icon @click="overlay = false">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-row>
                    <v-row justify="space-around">
                        <v-avatar size="150">
                            <v-img

                                    src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                            ></v-img>
                        </v-avatar>
                    </v-row>

                    <v-row>
                        <v-card-text>
                            <v-tabs v-model="tabs" centered>
                                <v-tabs-slider class="white"></v-tabs-slider>

                                <v-tab href="#general">Общее</v-tab>
                                <v-tab href="#schedule">График</v-tab>
                                <v-tab href="#changeWeight">Вес</v-tab>
                            </v-tabs>

                            <v-tabs-items v-model="tabs">


                                <v-tab-item class="cardTab" :value="'general'">
                                    <v-card flat>
                                        <v-card-title class="d-flex justify-center">Выполнение</v-card-title>
                                        <v-card-text>{{obj.description}}</v-card-text>
                                        <v-card-title class="d-flex justify-center">Заметки</v-card-title>
                                        <v-textarea
                                                no-resize
                                                outlined
                                                filled
                                        ></v-textarea>
                                    </v-card>
                                </v-tab-item>

                                <v-tab-item class="cardTab" :value="'schedule'">
                                    <v-card flat>
                                        <v-card-title class="d-flex justify-center">График веса</v-card-title>
                                        <v-card-text>Показывает наглядно ваш прогресс и как долго вы работайте с одним весом</v-card-text>
                                        <v-sparkline
                                                :labels="renderDate().date"
                                                :value="renderDate().mass"
                                                :fill="false"
                                                :gradient="['purple', 'violet']"
                                                :line-width="3"
                                                :smooth="10"
                                                auto-draw
                                                padding="10"
                                        />
                                    </v-card>
                                </v-tab-item>

                                <v-tab-item :value="'changeWeight'">
                                    <v-card flat>
                                        <v-card-text>{{obj.description}}</v-card-text>
                                    </v-card>
                                </v-tab-item>



                            </v-tabs-items>
                        </v-card-text>
                    </v-row>
                </v-container>
            </v-card>
        </v-container>

    </v-overlay>
</template>

<script>
    export default {
        name: "ExerciseDetails",
        data(){
            return{
                tabs: null,
            }
        },
        methods:{
            renderDate(dateStart, dateFinish = new Date()){
                let segment = 10

                let massTime = this.obj.mass.slice().sort((a,b) => new Date(a.date) - new Date(b.date))
                dateStart = dateStart ?? new Date(massTime[0].date)
                let section = (dateFinish - dateStart)/segment
                let start = dateStart.getTime()


                let arrMass = {
                    mass: [],
                    date: [],
                }
                let o = 0

                for(let i = 1; i <= segment; i++){
                    let obj = {}
                    for(o; o <= massTime.length-1;) {
                        if(start >= new Date(massTime[o].date) && dateFinish.getTime() >= new Date(massTime[o].date)){
                            obj = massTime[o]
                            o++
                        }
                        else {
                            break
                        }
                    }

                    if(Object.keys(obj).length > 0){ arrMass.mass.push(obj.mass) }
                    else{ arrMass.mass.push(arrMass.mass[arrMass.mass.length-1]) }

                    let strDate = new Date(start).getDay() + '.' + (new Date(start).getMonth() + +1) + '.' + String(new Date(start).getFullYear()).slice(2)
                    arrMass.date.push(strDate)

                    start += section
                }
                return arrMass
            }
        },
        computed: {
            overlay: {
                get() {
                    return this.$store.state.overlay.hidden
                },
                set(val) {
                    this.$store.commit('showOverlay', {hidden: val})
                },
            },
            obj(){ return this.$store.state.overlay.obj}
        },
    }
</script>

<style scoped>
    .card{
        max-height: calc(100vh - 50px);
        overflow: auto;
        max-width: 500px;
    }
</style>