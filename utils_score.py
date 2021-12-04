# -*- coding: utf-8 -*-
"""
Created on Sat Dec  4 13:35:37 2021

@author: Samue
"""
import numpy as np
import pandas as pd
sensibilite = 1

def Score_Moyglissante(Score_Mois,temps_pousse):
    """ calcule le max sur la moyenne glissante par rapport au temps de pousse"""
    Moy_glissante = []
    for i in range(12):
        Score_Mois.append(Score_Mois[i])
        Moy_calcul = Score_Mois[0+i:i+temps_pousse]
        Score = 1
        for donnee in Moy_calcul:
            Score = Score*donnee
        Moy_glissante.append(Score)
    Score_max = np.max(Moy_glissante)
    periode = np.argmax(Moy_glissante)
    return Score_max,periode

def scores_min_max(T_min_modele,T_max_modele,sensibilite,Temp_Abs_Min,Temp_Abs_Max):
    Score_min_max = 1
    if T_min_modele <= Temp_Abs_Min:
        a = ((1 - 0.5)/(Temp_Abs_Min - (Temp_Abs_Min - sensibilite)))
        b = 1 - a*Temp_Abs_Min
        Score_min_max = a*T_min_modele + b
    if T_max_modele >= Temp_Abs_Max:
        a = -(1 - 0.5)/(Temp_Abs_Max - (Temp_Abs_Max - sensibilite))
        b = 1- a*Temp_Abs_Max
        Score_min_max = a*T_max_modele + b
    if Score_min_max < 0:
        Score_min_max = 0
    return Score_min_max

def scores_temp(T_moy_modele,T_min_modele,T_max_modele,temp_opt_min,Temp_Opt_Max,Temp_Abs_Min,Temp_Abs_Max):
    Score_min_max = scores_min_max(T_min_modele,T_max_modele,sensibilite,Temp_Abs_Min,Temp_Abs_Max)
    Score = 1
    if T_moy_modele <= temp_opt_min:
        a = ( 1 - 0 )/(temp_opt_min - Temp_Abs_Min) 
        b = 1 - a*temp_opt_min
        Score = a*T_moy_modele + b
    if T_moy_modele >= Temp_Opt_Max:
        a = (1 - 0 )/(Temp_Opt_Max - Temp_Abs_Max)
        b = 1 - a*Temp_Opt_Max
        Score = a*T_moy_modele + b
    if Score < 0:
        Score = 0
    Score_tot = Score_min_max*Score
    return Score_tot,Score_min_max,Score

def scores_pluv(Rain_modele,Rain_Opt_min,Rain_Opt_Max,Rain_Abs_Min,Rain_Abs_Max):
    """Rain_modele : le cumul de pluviométrie prevue 
    Rain_opt_min : born inferieur de la pluviométrie optimal 
    Rain_Opt_Max : born superieur de la pluviométrie optimal
    Rain_abs_min : pluviometrie minimal accepter par la plante
    Rain_abs_max : pluviometrie maximal accepter par la plante"""
    Score = 1
    if Rain_modele <= Rain_Opt_min:
        a = ( 1 - 0 )/(Rain_Opt_min - Rain_Abs_Min) 
        b = 1 - a*Rain_Opt_min
        Score = a*Rain_modele + b
    if Rain_modele >= Rain_Opt_Max:
        a = (1 - 0 )/(Rain_Opt_Max - Rain_Abs_Max)
        b = 1 - a*Rain_Opt_Max
        Score = a*Rain_modele + b
    if Score < 0:
        Score = 0
    return Score

def score_dep(df_plante, df_meteo,df_loc, horizon, espece, senario):
    score = get_all_scores(df_plante, df_meteo, horizon, espece, senario)
    score = pd.merge(score,df_loc,on='point')
    return score.groupby('dep').agg({'score':"mean"})