import ImagePicker, { ImagePickerOptions, ImagePickerResponse } from 'react-native-image-picker';
import { ImageToUploadDetails } from '../data/ImageToUploadDetails';

export const pickImage=()=>{
  const options:ImagePickerOptions={
    title:'Pick an image',  
    mediaType:'photo',
  }
return new Promise<ImageToUploadDetails>(async(resolve)=>{//promise[imageName,imageUrl]
  ImagePicker.launchImageLibrary(options,response=>{
    if(response.didCancel){}
    else if(response.error){}
    else{
      // console.log(response.)
      if(response.fileName){
        resolve(new ImageToUploadDetails(response.uri,response.fileName))
      }
    }
  })
})
  
}