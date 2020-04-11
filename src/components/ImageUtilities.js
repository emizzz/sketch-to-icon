import * as tf from '@tensorflow/tfjs';
import * as cv from '../libs/opencv';

import {distance} from 'mathjs';

class ImageUtilities{

    loadImg = (src, w, h) => {
        let im = new Image(w, h) 
        return new Promise((resolve, reject) => {
            im.onload = () => resolve(im)
            im.onerror = reject
            im.src = src
          })      
    }

    /*
    args: im, n. of channels
    */ 
    im_to_tensor = (im, channels) => {
        return tf.browser.fromPixels(im, channels || 1)
    }

    tensor_to_array = (t) => {
        return t.arraySync()
    }

    expand_tensor = (t) => {
        return t.expandDims(0)
    }

    // it returns: (x.astype('float32')) / 255.
    tensor_preprocess = (t) => {
        t = t.asType('float32')
        return t.div(
            tf.scalar(255).asType('float32')
        )
    }


    /*
        python
        
    def contour_img(img):

        img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
        _, img = cv2.threshold(img, 127, 255, cv2.THRESH_BINARY_INV) #THRESH_BINARY_INV
        
        # Run findContours - Note the RETR_EXTERNAL flag
        # Also, we want to find the best contour possible with CHAIN_APPROX_NONE
        contours, hierarchy = cv2.findContours(img, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
        
        # Create an output of all zeroes that has the same shape as the input
        # image
        img = np.zeros_like(img)
        
        # On this output, draw all of the contours that we have detected
        # in white, and set the thickness to be 3 pixels
        cv2.drawContours(img, contours, -1, 255, 1)

        img = cv2.cvtColor(img, cv2.COLOR_GRAY2RGB)
        return (255 - img)

    */

  
    contour_img = async(input_im) => {

        let temp_canvas = document.createElement('CANVAS');
        temp_canvas.id = "temp_canvas"
        temp_canvas.width = input_im.width;
        temp_canvas.height = input_im.height;
        let im = cv.imread(input_im)
    
        let grey_im = new cv.Mat();
        cv.cvtColor(im, grey_im, cv.COLOR_RGBA2GRAY, 0);

        let black_im = cv.Mat.zeros(grey_im.rows, grey_im.cols, cv.CV_8UC1);

        let th_im = new cv.Mat();
        cv.threshold(grey_im, th_im, 127, 255, cv.THRESH_BINARY_INV);    
        
        let contours = new cv.MatVector();
        let hierarchy = new cv.Mat();
        cv.findContours(th_im, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_NONE); 

        cv.drawContours(black_im, contours , -1, new cv.Scalar(255), 1); 
        
        cv.bitwise_not(black_im,black_im);

        // TODO hardcoded grey vs color
        //let color_im = new cv.Mat(grey_im.rows, grey_im.cols, cv.CV_8UC3);
        //cv.cvtColor(black_im, color_im, cv.COLOR_GRAY2RGBA, 0);
        //cv.imshow(temp_canvas, color_im);

        cv.imshow(temp_canvas, black_im);

        let out_im = await this.loadImg(temp_canvas.toDataURL(), input_im.width, input_im.height)

        return out_im
    }

    get_most_similar_vectors = (in_embedding, db_embeddings, n) => {

        db_embeddings.map((item) => {
            item.distance = distance(in_embedding, item['embedding_data'])
            delete item['_id'];
        }); 

        db_embeddings.sort(function(a, b) {
            return a.distance - b.distance;
        });
        return db_embeddings.slice(0, n)
    }

}

export default new ImageUtilities()
