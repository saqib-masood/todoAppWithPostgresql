import pandas as pd
import psycopg2
from psycopg2 import sql

# Read data from CSV
data = pd.read_csv('tododb.csv')

# Database connection parameters
dbname = "todo"
user = "postgres"
password = "Delhi@2001"
host = "localhost"
port = "5432"

# Connect to the database
conn = psycopg2.connect(
    dbname=dbname, user=user, password=password, host=host, port=port
)
cur = conn.cursor()

for index, row in data.iterrows():
    # Check if the row already exists in the database
    query = sql.SQL("SELECT * FROM table1 WHERE id = %s"%row['id'])
    cur.execute(query)
    existing_data = cur.fetchone()

    if existing_data is None:
        # If the row doesn't exist, insert it into the database
        columns = row.index.tolist()
        values = [row[column] for column in columns]
        insert_query = sql.SQL("INSERT INTO table1 ({}) VALUES ({})").format(
            sql.SQL(', ').join(map(sql.Identifier, columns)),
            sql.SQL(', ').join(map(sql.Literal, values))
        )
        cur.execute(insert_query, values)
    else:
        # If the row already exists, update it in the database
        update_query = sql.SQL("UPDATE table1 SET task = %s, completed = %s WHERE id = %s")
        cur.execute(update_query, (row['task'], row['completed'], row['id']))

# Commit the changes to the database
conn.commit()

# Close the cursor and connection
cur.close()
conn.close()
print("Upsert successful")
