import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { ProgressDialog  } from 'react-native-simple-dialogs'


import React from 'react'

interface Props{
  isVisible:boolean
}

function SimpleSpinnerModal({isVisible}:Props) {
  return (
    <ProgressDialog
    visible={isVisible}
    title="Progress Dialog"
    message="Please, wait..."
    activityIndicatorColor='lightskyblue'
    activityIndicatorSize='small'

  />
  )
}


export default SimpleSpinnerModal
