"""
Django settings for verboze project.

Generated by 'django-admin startproject' using Django 1.11.5.

For more information on this file, see
https://docs.djangoproject.com/en/1.11/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.11/ref/settings/
"""

import os
import dj_database_url
import raven
from verboze.whitenoise_utils import add_gzip_encoding

DB_NAME = os.environ.get('DB_NAME', '')
DB_USER = os.environ.get('DB_USER', '')
DB_PASS = os.environ.get('DB_PASS', '')
VERBOZE_EMAIL_PASSWORD = os.environ.get('VERBOZE_EMAIL_PASSWORD', '')
RAVEN_DSN = os.environ.get('RAVEN_DSN', '')
IFTTT_KEY = os.environ.get('IFTTT_KEY', '')
USE_SQLITE = os.environ.get('USE_SQLITE', '')

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.11/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('SECRET_KEY', '')

# SECURITY WARNING: don't run with debug turned on in production!
if os.environ.get('ON_HEROKU', False):
    DEBUG = False
    ALLOWED_HOSTS = ['verboze.herokuapp.com', 'www.verboze.com']
    # Redirect all non HTTPS requests to HTTPS
    #SECURE_SSL_REDIRECT = True

    # RAVEN CONFIG FOR SETTING UP SENTRY WHEN ON PRODUCTION
    RAVEN_CONFIG = {
        'dsn': RAVEN_DSN,
        'release': raven.fetch_git_sha(os.path.abspath(os.curdir)),
    }
else:
    DEBUG = True
    ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # verboze apps
    'public_website',
    'api',
    'dashboard',
    'deployment_manager',
    'ifttt',

    # packages
    'webpack_loader',
    'channels',
    'rest_framework',
    'rest_framework.authtoken',
    'django_extensions',
    'raven.contrib.django.raven_compat',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',

    # WHITENOISE STATICFILE SERVING
    'whitenoise.middleware.WhiteNoiseMiddleware',
]


WHITENOISE_ADD_HEADERS_FUNCTION = add_gzip_encoding


ROOT_URLCONF = 'verboze.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'verboze.wsgi.application'


# Extends django's AbstractUser, allows for easy extending in future
AUTH_USER_MODEL = 'api.User'


# Database
# https://docs.djangoproject.com/en/1.11/ref/settings/#databases

if not USE_SQLITE:
    DATABASES = {
        'default': dj_database_url.config(default="postgres://{}:{}@localhost/{}".format(DB_USER, DB_PASS, DB_NAME), conn_max_age=500)
    }
else:
    DATABASES = {
        'default': dj_database_url.config(default="sqlite:///db.sqlite")
    }


# Channel layer definitions
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "asgi_redis.RedisChannelLayer",
        "CONFIG": {
            "hosts": [os.environ.get('REDIS_URL', 'redis://localhost:6379')],
        },
        "ROUTING": "verboze.routing.channel_routing",
    },
}


# Password validation
# https://docs.djangoproject.com/en/1.11/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/1.11/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.11/howto/static-files/
STATIC_ROOT = os.path.join(PROJECT_ROOT, 'staticfiles')
STATIC_URL = '/static/'

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'frontend'),
)


WEBPACK_STATS_FILE = 'webpack-dev-stats.json'
if not DEBUG:
    WEBPACK_STATS_FILE = 'webpack-prod-stats.json'


WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'bundles/',
        'STATS_FILE': os.path.join(BASE_DIR, WEBPACK_STATS_FILE)
    }
}


REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'api.authentication.VerbozeTokenAuthentication',
    )
}


# EMAIL SETTINGS

if os.environ.get('ON_HEROKU', False):
    EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
else:
    # Don't actually send emails when testing locally
    # Print to STDOUT instead
    EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

EMAIL_HOST = 'mail.privateemail.com'
EMAIL_HOST_USER = 'contact@verboze.com'
EMAIL_HOST_PASSWORD = VERBOZE_EMAIL_PASSWORD
EMAIL_PORT = 587
EMAIL_USE_TLS = True
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER
APPEND_SLASH = True
