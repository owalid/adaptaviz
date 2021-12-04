from flask import Flask, request
import os
from flask import jsonify
from utils import mixins
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)


    @app.route('/', methods=['POST'])
    def get_geojson_map():
        data = request.json
        if 'bounds' in data\
            and 'previsionYear' in data\
            and 'selectedType' in data\
            and 'scenario' in data\
            and 'cultivationType' in data:
            # get data
          print(data)
          return mixins.create_response(data={1:"hello world !"})
        else:
          return mixins.create_response(status=500, data={}, message="Error params")

    return app
app = create_app()

if __name__ == '__main__':
  app.run(host='127.0.0.1', debug=True, port = '5000')