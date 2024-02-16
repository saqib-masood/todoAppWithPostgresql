import pandas as pd
from sqlalchemy import create_engine

# Step 1: Read the CSV file into a pandas DataFrame
csv_file = 'tododb.csv'
df = pd.read_csv(csv_file)


import psycopg2

# Replace with your database credentials
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

# Replace with your desired table name and column names/types
table_name = "table1"
columns = [
    "task VARCHAR(255)",
    "completed Boolean",
    "id INTEGER PRIMARY KEY"
]

create_table_sql = f"""
CREATE TABLE IF NOT EXISTS {table_name} (
{", ".join(columns)}
);
"""

cur.execute(create_table_sql)
conn.commit()



# Close the connection
conn.close()

print("Data inserted successfully!")

# print("CSV file inserted into PostgreSQL table successfully!")
