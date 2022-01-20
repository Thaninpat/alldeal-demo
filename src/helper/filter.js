import moment from 'moment'

export const Filter = async (res) => {
  if (res.filterBy === 'Id') sortById(res.items)
  if (res.filterBy === 'customerId') sortById(res.items)
  if (res.filterBy === 'OrderId') sortByName(res.items)
  if (res.filterBy === 'Name') sortByName(res.items)
  if (res.filterBy === 'Paiddate start-end') sortByDate(res.items)
  if (res.filterBy === 'Amount') sortByAmount(res.items)
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

export const sortByAmount = async (items) => {
  const byAmount = await items.sort(function(a, b) {
    let AmountA = a.campaigns.priceFull
    let AmountB = b.campaigns.priceFull
    return AmountA - AmountB
  })
  return byAmount
}

export const setFormatDate = (date) => {
  let reFormat = moment(date).format('DD MMM YY')
  return reFormat
}
