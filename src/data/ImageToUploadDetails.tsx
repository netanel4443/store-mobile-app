export class ImageToUploadDetails{
  private _imageUri:string=''
  private _imageName:string=''

  constructor(imageUri?:string,imageName?:string) {
    if(imageUri && imageName){
      this._imageUri=imageUri
      this._imageName=imageName
    }
  }

  public get imageUri() : string {
    return this._imageUri
  } 
  public get imageName() : string {
    return this._imageName
  }

  public set imageUri(imageUri:string)  {
     this._imageUri=imageUri
  } 

  public set imageName(imageName:string) {
     this._imageName=imageName
  }
}