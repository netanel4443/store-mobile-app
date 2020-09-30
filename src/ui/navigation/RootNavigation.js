import React, { createRef } from 'react'

export const navigationRef=createRef()

export function navigateWithParams(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function navigate(name) {
  navigationRef.current?.navigate(name);
}
