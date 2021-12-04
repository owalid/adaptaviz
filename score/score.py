import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import os
from sys import argv

def scores_min_max_temp(T_min_modele, T_max_modele, sensibilite, Temp_Abs_Min, Temp_Abs_Max):
    Score_min_max = 1
    if T_min_modele <= Temp_Abs_Min:
        a = ((1 - 0.5)/(Temp_Abs_Min - (Temp_Abs_Min - sensibilite)))
        b = 1 - a*Temp_Abs_Min
        Score_min_max = a*T_min_modele + b
    if T_max_modele >= Temp_Abs_Max:
        a = -(1 - 0.5)/(Temp_Abs_Max - (Temp_Abs_Max - sensibilite))
        b = 1 - a*Temp_Abs_Max
        Score_min_max = a*T_max_modele + b
    if Score_min_max < 0:
        Score_min_max = 0
    return Score_min_max


def scores_temp(T_moy_modele, T_min_modele, T_max_modele, temp_opt_min, Temp_Opt_Max, Temp_Abs_Min, Temp_Abs_Max, sensibilite):
    Score_min_max = scores_min_max_temp(
        T_min_modele, T_max_modele, sensibilite, Temp_Abs_Min, Temp_Abs_Max)
    Score = 1
    if T_moy_modele <= temp_opt_min:
        a = (1 - 0)/(temp_opt_min - Temp_Abs_Min)
        b = 1 - a*temp_opt_min
        Score = a*T_moy_modele + b
    if T_moy_modele >= Temp_Opt_Max:
        a = (1 - 0)/(Temp_Opt_Max - Temp_Abs_Max)
        b = 1 - a*Temp_Opt_Max
        Score = a*T_moy_modele + b
    if Score < 0:
        Score = 0
    Score_tot = Score_min_max*Score
    return Score_tot, Score_min_max, Score


def Score_Moyglissante_temp(Score_Mois, temps_pousse):
    Moy_glissante = []
    for i in range(12):
        Score_Mois.append(Score_Mois[i])
        Moy_calcul = Score_Mois[0+i:i+temps_pousse]
        Score = 1
        for donnee in Moy_calcul:
            #print (donnee)
            Score = Score*donnee
        Moy_glissante.append(Score)
    Score_max = np.max(Moy_glissante)
    periode = np.argmax(Moy_glissante)
    return Score_max, periode


def scores_pluv(Rain_modele, Rain_Opt_min, Rain_Opt_Max, Rain_Abs_Min, Rain_Abs_Max):
    """Rain_modele : le cumul de pluviométrie prevue
    Rain_opt_min : born inferieur de la pluviométrie optimal
    Rain_Opt_Max : born superieur de la pluviométrie optimal
    Rain_abs_min : pluviometrie minimal accepter par la plante
    Rain_abs_max : pluviometrie maximal accepter par la plante"""
    Score = 1
    if Rain_modele <= Rain_Opt_min:
        a = (1 - 0)/(Rain_Opt_min - Rain_Abs_Min)
        b = 1 - a*Rain_Opt_min
        Score = a*Rain_modele + b
    if Rain_modele >= Rain_Opt_Max:
        a = (1 - 0)/(Rain_Opt_Max - Rain_Abs_Max)
        b = 1 - a*Rain_Opt_Max
        Score = a*Rain_modele + b
    if Score < 0:
        Score = 0
    return Score

def get_climate_metrics(climate_df, horizon, scenario):
    climate_metrics = climate_df[(climate_df['Période'] == horizon) & (climate_df['Contexte'] == scenario)]
    return climate_metrics

SENSIBILITE = 1


def get_all_scores(climate_df, pheno_df, species, horizon, scenario):
    total_temp_score = []
    total_pluv_score = []
    total_lat = []
    total_long = []
    mix_total_score = []
    name_lst = []
    climate_metrics = get_climate_metrics(climate_df, horizon, scenario)
    species_metrics = pheno_df[pheno_df['species'] == species]
    species_metrics.reset_index(drop=True, inplace=True)
    temp_opt_min = species_metrics['temp_opt_min'][0]
    Temp_Opt_Max = species_metrics['Temp_Opt_Max'][0]
    Temp_Abs_Min = species_metrics['Temp_Abs_Min'][0]
    Temp_Abs_Max = species_metrics['Temp_Abs_Max'][0]
    Rain_Opt_min = species_metrics['Rain_Opt_Min'][0]
    Rain_Opt_Max = species_metrics['Rain_Opt_Max'][0]
    Rain_Abs_Min = species_metrics['Rain_Abs_Min'][0]
    Rain_Abs_Max = species_metrics['Rain_Abs_Max'][0]
    temps_pousse = species_metrics['temps_pousse'][0]
    unique = climate_metrics.groupby('Point')
    for name, group in unique:
        month_score = []
        #print (f'--NEW : {name}--')
        long = group['Longitude'].values[0]
        lat = group['Latitude'].values[0]
        for idx, row in group.iterrows():
            T_moy = row['Tmoy']
            T_min = row['Tmin']
            T_max = row['Tmax']
            score = scores_temp(T_moy, T_min, T_max, temp_opt_min,
                                Temp_Opt_Max, Temp_Abs_Min, Temp_Abs_Max, SENSIBILITE)
            month_score.append(score[0])
        total_score = Score_Moyglissante_temp(month_score, temps_pousse)
        period = total_score[1]
        cumul = group['NORRR']
        Rain_model = cumul[period:period+temps_pousse].sum()
        score_pluv = scores_pluv(
            Rain_model, Rain_Opt_min, Rain_Opt_Max, Rain_Abs_Min, Rain_Abs_Max)
        #print (total_score[0])
        #print (score_pluv)
        mixed_score = total_score[0] * score_pluv
        total_temp_score.append(total_score[0])
        total_pluv_score.append(score_pluv)
        total_lat.append(lat)
        total_long.append(long)
        mix_total_score.append(mixed_score)
        name_lst.append(name)
    result_dict = {'Point': name_lst, 'Lat': total_lat, 'Long': total_long,
                   'Temp_score': total_temp_score, 'Pluv_score': total_pluv_score,
                   'Total_score': mix_total_score}
    result_df = pd.DataFrame(result_dict)
    #print(result_df.sample(25))
    return result_df

def main():
    if len(argv) >= 3:
        species = argv[1]
        horizon = argv[2]
        scenario = argv[3]
    print (species)
    print (horizon)
    print (scenario)
    climate_df = pd.read_csv('indices_France_2020-2050-mensuelles.txt', sep=";")
    climate_df = climate_df.iloc[:, 0:-1]
    climate_df.columns = ["Point", 'Latitude', 'Longitude', 'Contexte', 'Période', 'Mois', 'Tmoy', 'Tmin', 'Tmax', 'NORTRAV', 'NORTXQ90', 'NORTXQ10',
                          'NORTNQ10', 'NORTNQ90', 'NORHDD', 'NORCDD', 'NORPAV', 'NORRR', 'NORPFL90', 'NORPINT']
    pheno_df = pd.read_csv('plantes_sol.csv', sep=",")
    to_keep = ['species', 'temp_opt_min', 'Temp_Opt_Max', 'Temp_Abs_Min', 'Temp_Abs_Max', 'Rain_Opt_Min',
           'Rain_Opt_Max', 'Rain_Abs_Min', 'Rain_Abs_Max', 'pH_Opt_Min', 'pH_Opt_Max', 'pH_Abs_Min', 'pH_Abs_Max',
           'temps_pousse']
    pheno_df = pheno_df[to_keep]
    new = get_all_scores(climate_df, pheno_df, species, horizon, scenario)
    #new['Temp_score'].hist()
    new['Total_score'].hist()
    plt.show()
    new.to_csv('total_score_orge_H3_2_6.csv')


if __name__ == "__main__":
    main()
