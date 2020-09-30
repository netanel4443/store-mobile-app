import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'

import React from 'react'

interface Props{
  isVisible:boolean
}

function SimpleSpinnerModal({isVisible}:Props) {
  return (
    <div> 
      <Modal
        show={isVisible}
        centered
      >
        <Modal.Body
        style={{ display:"flex", justifyContent: 'center', alignItems: 'center'}}>
          <Spinner
           animation="border" 
           variant="primary"
          />
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default SimpleSpinnerModal
