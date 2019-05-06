
import { CALENDAR } from '../constants'

export const setSelectedDate = (selectedDate) => ({
  type: CALENDAR.SET_SELECTED_DATE,
  payload: selectedDate
})

export const setMonth = (date = new Date()) => {
  let month = []
  let tempArr = []
  let firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay() - 1;
  let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

  let prevMonthDaysCount = new Date(date.getYear(), date.getMonth(), 0).getDate() - (firstDay - 1);
  while(tempArr.length <= firstDay - 1) {
    tempArr.push(new Date(date.getFullYear(), date.getMonth()-1, prevMonthDaysCount)) 
    prevMonthDaysCount++
  }

  for (let i = 1; i <= lastDay; i++) {
    tempArr.push(new Date(date.getFullYear(), date.getMonth(), i))
  }
 
  let counter = 1
  
  while (tempArr.length % 7 !== 0) {
    tempArr.push(new Date(date.getFullYear(), date.getMonth() + 1, counter))
    counter++
  } 

  for (let i = 0; i < tempArr.length/7; i++) {
    month.push(tempArr.slice(i * 7, (i * 7) + 7))
  }

  return ({
    type: CALENDAR.SET_MONTH,
    payload: {
      items: month,
      title: CALENDAR.MONTHS[date.getMonth()],
      date: date
    }
  })
}
