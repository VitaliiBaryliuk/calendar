import { EVENTS } from '../constants'

export const setEventsList = (eventsList) => ({
  type: EVENTS.SET_EVENTS_LIST,
  payload: eventsList
})

export const getEventsList = async (dispatch) => {
  const res = await fetch('events.json');
  const eventsList = await res.json();

  dispatch(setEventsList(eventsList))
}

export const addEvent = (dispatch, newEvent, eventsList) => {
  const newEventsList = { ...eventsList, ...newEvent }

  dispatch(setEventsList(newEventsList))
}

export const removeEvent = (dispatch, event, eventsList) => {
  delete eventsList[event]

  dispatch(setEventsList(eventsList))
}