import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import {useState } from 'react'
import {useDispatch, useSelector,  } from 'react-redux'
import * as actions from '../../actions/homeActions'
import { RootState } from '../../reducers/rootReducer'
import { ProductDetails } from '../../data/ProductDetails'
import { AddProductModalErrors } from '../../data/AddProductModalErrors'
import { logConsoleIfDebug } from '../../utils/consoleUtils'

function AddProductModal() {

const dispatch = useDispatch()

const categories:Map<string,string>=useSelector((state:RootState)=>state.homeReducer.categories)
const errorMessages=useSelector((state:RootState)=> state.homeReducer.productModalErrorsMessage)
const selectedProductDetails  = useSelector((state: RootState) => state.homeReducer.selectedProductDetails)
const addProductModalVisibility = useSelector((state:RootState)=>state.homeReducer.addProductModalVisibility)

const [imageFile,setImage]=useState<File | null >()
const [productDetails,setProductDetails]=useState(new ProductDetails())

const _onShow=()=>{
  dispatch(actions.addProductModalErrors(new AddProductModalErrors()))//reset error messages
  setImage(null)//reset image
  setProductDetails(Object.assign({},selectedProductDetails))
  logConsoleIfDebug(productDetails)
}

const _onAddAction=()=>{
  
  if(imageFile){
    /*TODO: fix update and upload*/
    dispatch(actions.updateProduct(categories.get(productDetails.category)!!,productDetails,imageFile))
  }
}

const getImageFromFiles=(image?: File | null  )=>{ setImage(image) }

const _categoryOptions=()=>{
   const optionArray:any=[]
   optionArray.push(<option></option>)
   categories.forEach((value:string,category:string)=>{
    optionArray.push(
      <option value={category} key={category}>{category}</option>
    )
  })
  return optionArray
}
const onHide=()=>{
  dispatch(actions.showAddProductModalVisibility(false,new ProductDetails()))
}

  return (
    <div>
      <Modal
        show={addProductModalVisibility}
        onShow={_onShow}
        onHide={onHide}
        centered>
      <Modal.Header>
        <Modal.Title>
          Add Product
        </Modal.Title>  
      </Modal.Header>
      <Modal.Body>
        <form style={{display:'flex', flexDirection:'column'}}>
          <label>Product name:</label>
          <TextInput type="text" 
                defaultValue={selectedProductDetails.productName} 
                onChange={(e)=>productDetails.productName=(e.target.value)}
          />
          <p style={{color:'red',fontSize:10}}>{errorMessages.productName}</p>
          <label>Description:</label>
          <textarea rows={4} cols={10} 
                    defaultValue={selectedProductDetails.productDescription}
                    onChange={(e)=>productDetails.productDescription=(e.target.value)}></textarea>
          <h3></h3>
          <TextInput type="file" accept="image/png,image/jpeg,/image/jpg" onChange={(e)=>getImageFromFiles(e.target.files?.item(0))}/>
          <label>price:</label>
          <TextInput
            defaultValue={selectedProductDetails.price} 
            type="number"
            onChange={e=>(productDetails.price)=e.target.value}/>
          <label>Select category*:</label>
          <select
            defaultValue={selectedProductDetails.category} 
            onChange={(e)=>productDetails.category=(e.target.value)}>{_categoryOptions()}</select>
          <p style={{color:'red',fontSize:10}}>{errorMessages.category}</p>
        </form>  
      </Modal.Body>
      <Modal.Footer>
        <Button variant={'secondary'} onClick={onHide}>Cancel</Button>  
        <Button variant={'primary'} onClick={()=>_onAddAction()}>Add</Button>  
      </Modal.Footer>   
      </Modal>
    </div>
  )
}

export default AddProductModal
