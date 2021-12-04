<template>
        <v-container fill-height fluid>
        <v-row align="center" justify="center">
            <v-col cols="7" class="text-center">
                <h1><v-btn icon color="white" href="/"><v-icon>far fa-map</v-icon></v-btn>ADAPTAVIZ</h1>
                <br>
                <p>Adaptaviz est un outil d'aide à la décision. Il permet d'estimer sur une parcelle qu'elles seront les cultures, légumes, céréales, légumineuses les plus adaptés au climat future. Il se base sur trois projections climatiques par scénario d'émission de gaz à effet de serre, associer aux phénotypes des végétaux. Et ainsi pouvoir en sortir quelles sont les zones à risque et les nouvelles zones favorables d'une culture. Le preneur de décision aura la possibilité de savoir s'il pourra maintenir ses cultures à l'avenir ou pouvoir anticiper ses changements de récolte. 
                </p>
            </v-col>
        </v-row>
            <v-row>
                <v-col cols="6" class="text-center">
                    <h2><v-icon>fas fa-address-card</v-icon> À destination :</h2>
                    
                    <ul>
                        <li>des agriculteurs :<p>penser leurs futures récoltes, si leur plantation actuelle sera toujours viable dans l'avenir</p></li>
                        <li>des coops agricoles / commission européenne :<p>aide au choix des répartitions de plantations</p></li>
                        <li>du grand publique :<p>informer sur les changements climatiques de façon ludique</p></li>
                    </ul>
                </v-col>
                <v-divider vertical></v-divider>
                <v-col cols="6" class="text-center">
                    <h2><v-icon>fas fa-stream</v-icon> Variables :</h2>
                    <ul>
                        <li>Senario :<p>Optimiste (RCP2.6) / Milieu (RCP4.5) / Pessimiste (RCP8.5)</p></li>
                        <li>Horizon :<p>2020-2050 / 2050-2075 / 2075-2100</p></li>
                        <li>Zone :<p>Choix en France Métropolitaine</p></li>
                    </ul>
                </v-col>
            </v-row>
            <v-row align="center" justify="center">
                <v-col cols="6" class="text-center" align="center">
                    <h2><v-icon>far fa-folder</v-icon> Sources :</h2>
                    <p>...</p>
                </v-col>
            </v-row>
            
        </v-container>
</template>

<script>
export default {
    layout:"about"
}
</script>


<style>

</style>