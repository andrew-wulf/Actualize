import sqlite3

import click
from flask import current_app, g, 


from sqlalchemy import create_engine, ForeignKey, Column, String, Integer, and_, or_, not_, Float, Text, VARCHAR, Date, text, Table, MetaData, insert, select, update, delete
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session, query


app = Flask(__name__)

def get_db():
    if 'db' not in g:
        params = {'user': 'postgres'}
        conn_str = f'postgresql+psycopg2://postgres:{app.config.from_prefixed_env()["PASWORD"]}@localhost:5432/spotify-api'
        g.db = create_engine(conn_str, echo=echo)

    return g.db


def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()


def init_db():
    db = get_db()

    with current_app.open_resource('schema.sql') as f:
        db.executescript(f.read().decode('utf8'))


@click.command('init-db')
def init_db_command():
    """Clear the existing data and create new tables."""
    init_db()
    click.echo('Initialized the database.')


def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)






