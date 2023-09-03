# Import pandas library
import pandas as pd

df = pd.read_excel('Book2.xlsx', sheet_name=0, engine='openpyxl')
df2 = pd.read_excel('Book2.xlsx', sheet_name=1, engine='openpyxl')
df3 = pd.read_excel('Book2.xlsx', sheet_name=2, engine='openpyxl')
# df4 = pd.merge(df,df2, on='someIndex', how='left') #left outer join
# df5 = pd.merge(df4,df3, on='someIndex', how='left') #left outer join

# print(df)
# print(df2)
# print(df3)
# print(df4)
# print(df5)

maxIndex = df['someIndex'].max()
dict_list = [{} for x in range( maxIndex+1 )] #dymically create

def update_fields(parent_key, key, col_name, idx, row, temp_dict):
    if pd.notna(row[col_name]): #is not NaN
        if parent_key not in dict_list[row[idx]]: dict_list[row[idx]][parent_key] = [] 
        temp_dict[key] = row[col_name]

def person_populate(row):
    global dict_list
    
    dict_list[row['someIndex']]['name'] = row['name']
    if pd.notna(row['measurements']):
        result = [int(x.strip()) for x in row['measurements'].split(',')] if row['measurements'] != "" else []
        dict_list[row['someIndex']]['measurements'] = result

def house_populate(row):
    global dict_list
    temp_dict = {}

    update_fields('House', 'year', 'House_year', 'someIndex', row, temp_dict)    
    update_fields('House', 'address', 'House_address', 'someIndex', row, temp_dict)

    #append to dict_list's House
    if len(temp_dict) > 0:
        dict_list[row['someIndex']]['House'].append(temp_dict)

def moving_populate(row):
    global dict_list

    temp_dict = {}
    update_fields('Moved', 'in', 'Moved_in', 'someIndex', row, temp_dict)

    if pd.notna(row['Moved_prevLocations']): #is not NaN
        if 'Moved' not in dict_list[row['someIndex']]: dict_list[row['someIndex']]['Moved'] = [] #standard
        result = [x.strip() for x in row['Moved_prevLocations'].split(',')] if row['Moved_prevLocations'] != "" else []
        temp_dict['prevLocations'] = result
    
    #append to dict_list's Moved
    if len(temp_dict) > 0:
        dict_list[row['someIndex']]['Moved'].append(temp_dict)

# Convert each row of the DataFrame to the desired JSON structure
# json_data = df5.apply(row_to_json, axis=1).tolist()
# df5.apply(row_to_json, axis=1)
df.apply(person_populate, axis=1)
df2.apply(house_populate, axis=1)
df3.apply(moving_populate, axis=1)

print(dict_list)
import json
print(json.dumps(dict_list, indent=2))

with open("sample.json", "w") as outfile:
    json.dump(dict_list, outfile, indent=2)

# def row_to_json(row):
#     global dict_list
    
#     print(row['someIndex'])

#     #if len(dict_list[row['someIndex']]) == 0:
#     #    dict_list[row['someIndex']] = {} #blank dict

#     dict_list[row['someIndex']]['name'] = row['name']

#     temp_dict = {}

#     update_fields('House', 'year', 'House_year', 'someIndex', row, temp_dict)    
#     update_fields('House', 'address', 'House_address', 'someIndex', row, temp_dict)

#     #append to dict_list's House
#     if len(temp_dict) > 0:
#         dict_list[row['someIndex']]['House'].append(temp_dict)

#     temp_dict = {}
#     update_fields('Moved', 'in', 'Moved_in', 'someIndex', row, temp_dict)

#     if pd.notna(row['Moved_prevLocations']): #is not NaN
#         if row['someIndex'] == 1: print('here')
#         if 'Moved' not in dict_list[row['someIndex']]: dict_list[row['someIndex']]['Moved'] = [] #standard
#         result = [x.strip() for x in row['Moved_prevLocations'].split(',')] if row['Moved_prevLocations'] != "" else []
#         temp_dict['prevLocations'] = result
    
#     #append to dict_list's Moved
#     if len(temp_dict) > 0:
#         dict_list[row['someIndex']]['Moved'].append(temp_dict)

# def has_duplicates(seq):
#     return len(seq) != len(set(seq))

# l = [{"hi":1}, {"hi":2}]
# print(has_duplicates(l))

# someIndex	name
# 0	tom
# 1	harry
# 2	whatever
# someIndex	House_year	House_address
# 0	1998	France
# 0	1999	New York
# someIndex	Moved_in	Moved_prevLocations
# 1	TRUE	San Free
# 1	FALSE	
# 2	FALSE	Iceland, Singapore, Turkey
# 0	TRUE	Random1, Random2
# 0	FALSE	R3,R4
