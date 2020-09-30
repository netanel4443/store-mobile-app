import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import React from 'react'

interface Props{
  isVisibility:boolean,
  setVisibility(visibility: boolean): void,
  message:string,
  action(): void
}

function MessageAndActionModal({message,isVisibility,setVisibility,action}:Props) {

  const _onAcceptAction=()=>{
    setVisibility(false)
    action()
  }

  return (
    <div>
     <Modal
      onHide={()=>setVisibility(false)}
      show={isVisibility}
      centered>
        <Modal.Header>{message}</Modal.Header>
        <Modal.Footer>
          <Button variant='secondary' onClick={()=>setVisibility(false)} >Cancel</Button>
          <Button variant='primary' onClick={()=>_onAcceptAction()} >Accept</Button>
        </Modal.Footer>
     </Modal> 
    </div>
  )
}


export default MessageAndActionModal
