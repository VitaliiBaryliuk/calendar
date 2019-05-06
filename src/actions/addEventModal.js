import { MODAL } from '../constants'

export const showAddEventModal = () => ({
  type: MODAL.SHOW_ADD_EVENT_MODAL,
  payload: true 
})

export const closeAddEventModal = () => ({
  type: MODAL.CLOSE_ADD_EVENT_MODAL,
  payload: false 
})