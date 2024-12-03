import pandas as pd
from ucimlrepo import fetch_ucirepo
import sys
import json

# Fetch dataset
air_quality = fetch_ucirepo(id=360)
X = air_quality.data.features
X['target'] = air_quality.data.targets

# Check operation mode
if len(sys.argv) > 1 and sys.argv[1] == "json":
    # Convert to JSON and print
    print(X.to_json(orient="records"))
else:
    # Save to CSV
    X.to_csv("air_quality.csv", index=False)
