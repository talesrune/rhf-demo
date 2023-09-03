import openpyxl

def read_excel(file_path, sheetName):
    try:
        # Open the Excel file
        workbook = openpyxl.load_workbook(file_path, data_only=True)  # data_only=True to read cell values, not formulas
        sheet = workbook[sheetName]#workbook.active
        # Retrieve headers from the first row, filtering out None values
        headers = [cell.value for cell in sheet[1] if cell.value is not None]
        # Initialize an empty dictionary to store the data
        data_dict = {header: [] for header in headers}
        # Retrieve data rows starting from the second row
        for row in sheet.iter_rows(min_row=2, values_only=True):
            for header, cell_value in zip(headers, row):
                data_dict[header].append(cell_value)

        return data_dict
    
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return None, None

# Example usage:
file_path = "Book2.xlsx"
person_dict = read_excel(file_path, 'person')
house_dict = read_excel(file_path, 'house')
moving_dict = read_excel(file_path, 'moving')

print(person_dict)
print(house_dict)
print(moving_dict)
