headers = "name	age	likes	address_city	address_zip	dislikes	addressTwo_0_city	addressTwo_0_zip	addressTwo_1_city	addressTwo_1_zip".split("\t")
data = [
    ["John Doe", "30", "anime, watermelon", "New York", "10101", "NA", "NA", "NA", "NA", "NA"],
    ["Jane", "31", "NA", "DownTown", "10102", "123,456", "NA", "NA", "NA", "NA"],
    ["Kenny", "42", "NA", "Brazil", "10103", "NA", "TownA", "11223", "TownB", "11224"]
]

def process_headers(headers):
    base_headers = []
    addresses = {}
    
    for header in headers:
        parts = header.split("_")
        
        if len(parts) == 2 and (parts[1] == "city" or parts[1] == "zip"):
            if parts[0] not in addresses:
                addresses[parts[0]] = {}
            addresses[parts[0]][parts[1]] = header
            
        elif len(parts) == 3 and (parts[2] == "city" or parts[2] == "zip"):
            addr_key = f"{parts[0]}_{parts[1]}"
            if addr_key not in addresses:
                addresses[addr_key] = {}
            addresses[addr_key][parts[2]] = header
            
        else:
            base_headers.append(header)

    return base_headers, addresses

def convert_to_json(headers, data):
    base_headers, addresses = process_headers(headers)
    json_data = []
    
    for row in data:
        person_data = {}
        
        for header in base_headers:
            value = row[headers.index(header)]
            if 'likes' in header or 'dislikes' in header:
                person_data[header] = value.split(", ") if value != "NA" else []
            else:
                person_data[header] = value if value != "NA" else None

        for addr_key, address_info in addresses.items():
            addr_data = {
                "city": row[headers.index(address_info["city"])] if row[headers.index(address_info["city"])] != "NA" else None,
                "zip": row[headers.index(address_info["zip"])] if row[headers.index(address_info["zip"])] != "NA" else None
            }
            if "addressTwo" in addr_key:
                if "addressTwo" not in person_data:
                    person_data["addressTwo"] = []
                person_data["addressTwo"].append(addr_data)
            else:
                person_data[addr_key] = addr_data
                
        json_data.append(person_data)
        
    return json_data

import json
print(json.dumps(convert_to_json(headers, data), indent=4))
