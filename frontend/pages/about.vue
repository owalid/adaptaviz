<template>
        <v-container fill-height fluid>
            <v-btn icon  href="/"><v-icon>fas fa-chevron-left</v-icon></v-btn>
        <v-row align="center" justify="center">
            <v-col cols="11" class="text-center" xs="9" sm="7">
                <h1><v-icon>far fa-map</v-icon> ADAPTAVIZ</h1>
                <br>
                <p>Adaptaviz est un outil d'aide à la décision. Il permet d'estimer sur une parcelle qu'elles seront les cultures, légumes, céréales, légumineuses les plus adaptés au climat future. Il se base sur trois projections climatiques par scénario d'émission de gaz à effet de serre, associer aux phénotypes des végétaux. Et ainsi pouvoir en sortir quelles sont les zones à risque et les nouvelles zones favorables d'une culture. Le preneur de décision aura la possibilité de savoir s'il pourra maintenir ses cultures à l'avenir ou pouvoir anticiper ses changements de récolte. 
                </p>
            </v-col>
        </v-row>
            <v-row align="center" justify="center">
                <v-col cols="12" class="text-center" xs="12" sm="12" md="6">
                    <h2><v-icon>fas fa-address-card</v-icon> À destination :</h2>
                    
                    <v-list>
                        <li>des agriculteurs :<p>penser leurs futures récoltes, si leur plantation actuelle sera toujours viable dans l'avenir</p></li>
                        <li>des coops agricoles / commission européenne :<p>aide au choix des répartitions de plantations</p></li>
                        <li>du grand publique :<p>informer sur les changements climatiques de façon ludique</p></li>
                    </v-list>
                </v-col>
                <v-divider vertical></v-divider>
                <v-col cols="12" class="text-center" xs="12" sm="12" md="6">
                    <h2><v-icon>fas fa-stream</v-icon> Variables :</h2>
                    <v-list>
                        <li>Senarios :<p>Optimiste (RCP2.6) / Milieu (RCP4.5) / Pessimiste (RCP8.5)</p></li>
                        <li>Horizon :<p>2020-2050 / 2050-2075 / 2075-2100</p></li>
                        <li>Zone :<p>Choix en France Métropolitaine</p></li>
                    </v-list>
                </v-col>
            </v-row>
            <v-row align="center" justify="center">
                <v-col cols="9" class="text-center" align="center" xs="8" sm="6" md="6">
                    <h2><v-icon>far fa-folder</v-icon> Sources :</h2>
                    <p>Les données de prévisions et de références sont fournies par météo France dans le cadre du projet Drias, complié à l’aide du dernier rapport du GIEC. <br>
                        <i><a href="http://www.drias-climat.fr/">http://www.drias-climat.fr/</a><br>
                        <a href="https://meteofrance.com/">https://meteofrance.com/</a></i>
                    </p>
                    <p>Les données agronomiques concernant les exigences écologiques des espèces sont issues de la base de données du projet ECOCROP.</p>
                    <p>Les unités de représentations cartographiques par petites régions agricoles (PAR) sont issues de API Agro. <br>
                        <i><a href="https://api-agro.eu/">https://api-agro.eu/</a></i>
                    </p>
                    <p>Le fond cartographique utilisé pour la représentation est openstreetmap<br>
                        <i><a href="https://www.openstreetmap.fr/">https://www.openstreetmap.fr/</a></i>
                    </p>
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