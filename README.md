# Libre Video
Libre Video is a home streaming service in a single simple executable file.

# File walker
The inital step of creating your Libre Video streaming severice is the file walker. This process goes through all the files on the selected drive, chooses all that match [the codecs supported by Libre Video, and thus thos supported by browsers.](https://caniuse.com/?search=video%20format) 

The file walkers will take all files compatible with Libre Video's audio and video codec, then add the location of that file in sqlite3 database created in the directory.

# Screen Shots
When a compatible file is found by the file walker it also takes a screenshot of a midpoint of the video playtime. It does this [utilizing the open cv2 library](https://pypi.org/project/opencv-python/)

Once the screenshot has been taken; It will have a Libre watermark placed ontop. It will then be saved in a sceenshot directory, and location saved in a database.

# Server
Once the fileWalker has completed and the screenshots and database info has been stored, a server will be started, you may get a networking prompt from your OS.
This will start the Libre Video fileserver/API. This will expose a PORT on your computer and IP to the world (check your router/modem settings).

# App
Once the server has started, the app will be availbe in your webrowser will open or you can go to [http://localhost:3000/](http://localhost:3000/)

![librea video screenshot](https://cloud.screenpresso.com/690Ld/2021-10-18_09h42_24.png)

This will be a React app, and you are now free to enjoy your videos with complimentary rareHoss.

# Video Player
currently Libre Video plays videos with [React-Player](https://www.npmjs.com/package/react-player)

![short demo video of libre video](https://cloud.screenpresso.com/7ZrNe/2021-10-18_10h20_10.gif)