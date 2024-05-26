import moment from "moment";

class DateFormatter {
    static default(date) {
        return moment(date)
    }
    static date_only(date) {
        return moment(date).format('dddd, MMMM Do YYYY')
    }
    static from_now(date) {
        return moment(date).fromNow()
    }
}

export default DateFormatter