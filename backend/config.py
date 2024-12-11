import os


class Config(object):
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'super-secret')
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DEV_SQLALCHEMY_DATABASE_URI', 'sqlite:///development.sqlite')


class ProductionConfig(Config):
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = os.environ.get('PROD_SQLALCHEMY_DATABASE_URI')
