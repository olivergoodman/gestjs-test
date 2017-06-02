# Gesture Recognition
A platform for recording and debugging gesture recognition algorithims. The gesture recognition platform uses gest.js (http://hadi.io/gest.js/) to record gestures

### To Run:
- Download repo and navigae to `gesture-tracking` directory. 
- Activate virtualenv with `source venv/bin/activate`.
- Run `python run.py`. 
- Navigate to `localhost:8000/templates` for the Gesture Recognition platform. Press "Start" to begin recording gestures, can toggle skin-filter and adjust gesture sensitivity. after pressing "Stop", the expected and actual gestures will be logged to the console. (Note: there seems to be a bug in gest.js when stopping recording, but the gestures should still be getting read)
- To view the gesture recording platform, navigate to `localhost:8000/templates/recording.html`. Follow directions to individual gestures. Videos will be stored in the the `/videos` directory. 
