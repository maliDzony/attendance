import Students from '../model/students'

export const mapIdsToNames = (collection) => {
  let sum = []
  Students.map(student => {//eslint-disable-line
    collection.indexOf(student.id) > -1 && sum.push(`${student.firstName} ${student.lastName}`)//eslint-disable-line
  })

  let formatted = sum.join(', ')
  formatted = formatted === '' ? formatted = 0 : formatted

  return formatted
}
