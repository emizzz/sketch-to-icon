# Sketch-to-icon

## Project
In this project a Convolutional Neural Network is used for the feature extraction task.

The implemented model ignore the gap between draws and icons, instead resolves it with a simple Edge Extraction.

## Demo
https://emizzz.github.io/sketch-to-icon/

## Other Experiments
I'm also working in order to bridge the gap between the domains, check my python repo: 
https://github.com/emizzz/Sketch-to-Icon-Paper-Code.

## Icons
Icons are (the free) part of the beautiful [FontAwesome](https://fontawesome.com) dataset. This project use more than 1500 icons.

## Model
The Python CNN:
```python
model = Sequential()
model.add(Conv2D(32, kernel_size=(3, 3), padding='same', activation='relu', input_shape=(imheight, imwidth, 1)))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Conv2D(64, kernel_size=(3, 3), padding='same', activation='relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Dropout(0.2))
model.add(Flatten())
model.add(Dense(680, activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(num_classes, activation='softmax'))
model.summary()
```

## Dataset
The model was trained on a subset of the famous [QuickDraw](https://quickdraw.withgoogle.com/data) dataset.


## Todo
* Mobile friendly
