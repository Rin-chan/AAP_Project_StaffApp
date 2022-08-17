# AAP_Project_Staff (Staff App)

### secrets.json (Should not be shared but is placed there for submission purposes)
Create your account here: https://openrouteservice.org/ and get a key.
```
{
"ORSKey": "Your-key-here"
}
```

### settings.json
```
{
"flaskServer":"Your-LAN-IP-here"
}
```

### Issue with Drawer
```
1. Open the Drawer.js file found in /node_modules/react-navigation-drawer/lib/module/views/ folder
2. You will find interpolate in two places, replace the interpolate with interpolateNode in those two places.
```
