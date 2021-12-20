import pandas as pd

df = pd.read_json('scores-without-anomaly.json')

df1 = df.head(int(len(df)/2))
df2 = df.tail(int(len(df)/2))

df1.to_json('score-without-anomaly-1.json', orient='records')
df2.to_json('score-without-anomaly-2.json', orient='records')
