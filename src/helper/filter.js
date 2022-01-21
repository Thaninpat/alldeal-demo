import moment from 'moment'

export const Filter = async (res) => {
  if (res.filterBy === 'Id') sortById(res.items)
  else if (res.filterBy === 'customerId') sortById(res.items)
  else if (res.filterBy === 'OrderId') sortByName(res.items)
  else if (res.filterBy === 'Name') sortByName(res.items)
  else if (res.filterBy === 'Paiddate start-end') sortByDate(res.items)
  else if (res.filterBy === 'Amount') sortByAmount(res.items)
  else if (res.values.sortby === 'amount')
    sortByAmount({ items: res.items, sort: res.values.sort })
  else if (res.values.sortby === 'paidDate')
    sortByPaidDate({ items: res.items, sort: res.values.sort })
}

export const sortById = async (items) => {
  const byId = await items.sort(function(a, b) {
    let IdA = a.campaignId || a.customerId
    let IdB = b.campaignId || b.customerId
    return IdA - IdB
  })
  return byId
}

// sort by name
export const sortByName = async (items) => {
  const byName = await items.sort(function(a, b) {
    let nameA = a.nameTh || a.orderId // ignore upper and lowercase
    let nameB = b.nameTh || b.orderId // ignore upper and lowercase
    nameA = nameA.toLowerCase()
    nameB = nameB.toLowerCase()
    if (nameA < nameB) {
      return -1
    }
    if (nameA > nameB) {
      return 1
    }
    // names must be equal
    return 0
  })
  return byName
}

// sort by Date
export const sortByDate = async (items) => {
  const byDate = await items.sort(function(a, b) {
    let DateA = a.effectiveTms || a.originalTms
    let DateB = b.effectiveTms || b.originalTms
    return new Date(DateA) - new Date(DateB)
  })
  return byDate
}

export const sortByUid = async (items) => {
  const byId = await items.sort(function(a, b) {
    let IdA = a.uid
    let IdB = b.uid
    return IdA - IdB
  })
  return byId
}

export const sortByAmount = async ({ items, sort }) => {
  if (sort == null) return sortByUid(items)
  else {
    const byAmount = await items.sort(function(a, b) {
      let AmountA = a.amount
      let AmountB = b.amount
      if (sort == true) return AmountA - AmountB
      else if (sort == false) return AmountB - AmountA
    })
    return byAmount
  }
}
export const sortByPaidDate = async ({ items, sort }) => {
  if (sort == null) return sortByUid(items)
  else {
    const byDate = await items.sort(function(a, b) {
      let DateA = a.originalTms
      let DateB = b.originalTms
      if (sort == true) return new Date(DateA) - new Date(DateB)
      else if (sort == false) return new Date(DateB) - new Date(DateA)
    })
    return byDate
  }
}

export const setFormatDate = (date) => {
  let reFormat = moment(date).format('DD MMM YY')
  return reFormat
}
