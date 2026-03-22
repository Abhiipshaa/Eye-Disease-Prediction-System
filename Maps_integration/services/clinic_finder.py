from utils.distance import haversine

def find_nearest_clinics(user_lat, user_lon, clinics):
    results = []

    for clinic in clinics:
        distance = haversine(user_lat, user_lon, clinic["lat"], clinic["lon"])
        results.append((clinic, distance))

    # sorting based on distance
    results = sorted(results, key=lambda x: x[1])

    top_clinics = results[:3]

    output = []
    for clinic, dist in top_clinics:
        output.append({
            "name": clinic["name"],
            "lat": clinic["lat"],
            "lon": clinic["lon"],
            "distance": round(dist, 2)
        })

    return output