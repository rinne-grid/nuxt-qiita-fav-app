import format from 'date-fns/format'

export default ({ app }, inject) => {
  inject('date_fns_format', (date, dateFormat, option) => {
    return format(date, dateFormat, option)
  })
}
