import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import React from 'react'

interface Props{
  message:string
  setVisibility(visibility: boolean): void
  visibility:boolean
}

function SimpleMessageModal({message,visibility,setVisibility}:Props) {
  return (
    <div>
      <Modal
        onHide={()=>setVisibility(false)}
        show={visibility}
        centered
      >
        <Modal.Header>
          <Modal.Title>{message}</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant='primary' onClick={()=>setVisibility(false)}>Ok</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default SimpleMessageModal
