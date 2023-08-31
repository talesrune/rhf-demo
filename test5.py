import pandas as pd

# Load the Excel data into a DataFrame
df = pd.read_excel('Book1.xlsx', engine='openpyxl')

def row_to_json(row):
    person_data = {
        'name': row['name'],
        'age': row['age'],
        'likes': row['likes'].split(", ") if pd.notna(row['likes']) else [],
        'address': {
            'city': row['address_city'],
            'zip': row['address_zip']
        },
        'dislikes': row['dislikes'].split(", ") if pd.notna(row['dislikes']) else [],
        'addressTwo': []
    }
    
    # Iterate through possible addresses (up to an arbitrary limit, say 10)
    for i in range(10):
        city_col = f'addressTwo_{i}_city'
        zip_col = f'addressTwo_{i}_zip'
        if city_col in row and zip_col in row and pd.notna(row[city_col]) and pd.notna(row[zip_col]):
            person_data['addressTwo'].append({
                'city': row[city_col],
                'zip': row[zip_col]
            })
    
    return person_data

# Convert each row of the DataFrame to the desired JSON structure
json_data = df.apply(row_to_json, axis=1).tolist()
#json_data.to_json('help.json')

# Print or save the resulting JSON
import json
print(json.dumps(json_data, indent=4))
