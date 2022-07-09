#%%
import requests

url = "https://2q6e55.deta.dev/all"

headers = {
	"content-type": "application/json",
	# "X-RapidAPI-Key": "f0404747b9msh65ac637d66b0ee7p10a200jsn8bc3d72d693e"
    'X-API-Key': 'B91YbL9X.webmYwuxvD6mjdVs3akX7f-jKjqHxgoBH'
}

response = requests.request("GET", url, headers=headers)

print(response.text)
# %%
