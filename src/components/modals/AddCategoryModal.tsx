import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import {useState} from 'react'
import { TextInput, View } from 'react-native'


interface Props{
  isVisible:boolean,
  setVisibility(visibility: boolean): void,
  addCategory(categoryToAdd: string): void,
  disabled:boolean
}

function AddCategoryModal({isVisible, setVisibility,addCategory,disabled}:Props) {

  const [category,setCategory]=useState('')
  const [addBtnDisabled,setDisabled]=useState(false)

  return (
    <div>
      <Modal
        show={isVisible}
        onHide={()=>setVisibility(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
          <Modal.Title>Add category</Modal.Title>
    
          <View>
          <label>Category name:</label>  
          <TextInput type="text" onChange={(e)=>setCategory(e.target.value)}/>
          </View>
       
  
          <Button variant="secondary" className='btn-danger' onClick={()=>setVisibility(false)}>cancel</Button>
          <Button variant="primary" disabled={disabled} onClick={()=>addCategory(category)}>add</Button>
     
      </Modal>
    </div>
  )
}


export default AddCategoryModal
