from flask import Flask
import os
from flask import jsonify
from utils import mixins
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)


    @app.route('/')
    def test():
        return mixins.create_response(data={1:"hello world !"})

    return app
app = create_app()

if __name__ == '__main__':
  app.run(host='127.0.0.1', debug=True, port = '5000')