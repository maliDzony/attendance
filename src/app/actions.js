export const present = (id) => ({
  type: 'present',
  payload: id
})

export const late = (id) => ({
  type: 'late',
  payload: id
})

export const absent = (id) => ({
  type: 'absent',
  payload: id
})

export const marked = (v) => ({
  type: 'marked',
  payload: v
})

export const reset = () => ({
  type: 'reset'
})


export const clearMarked = (p) => ({
  payload: p,
  type: 'clear_marked'
})
