import requests

API_KEY = "api_key"

def geocode_address(address):
    url = "https://api.opencagedata.com/geocode/v1/json"

    params = {
        "q": address,
        "key": API_KEY
    }

    response = requests.get(url, params=params)
    data = response.json()

    if data["results"]:
        lat = data["results"][0]["geometry"]["lat"]
        lon = data["results"][0]["geometry"]["lng"]
        return lat, lon
    else:
        return None, None