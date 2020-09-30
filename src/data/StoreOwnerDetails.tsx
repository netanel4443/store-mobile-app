export default class StoreOwnerDetails {
  fbUrl:string=""
  instagramUrl:string=""
  location:string=""

    hasData(){
    if( this.fbUrl.length>0 &&
        this.instagramUrl.length>0&&
        this.location.length>0){
          return true
    }
    return false
  }
}