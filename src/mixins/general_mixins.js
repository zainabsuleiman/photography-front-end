
export const GeneralMixin = {
  methods: {
    format_date: function (dt) {
       console.log(dt,"DATEOBJE")
         var date = new Date(dt);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        if (day < 10) {
            day = "0" + day;
        }
        if (month < 10) {
            month = "0" + month;
      }
      
      var hours = date.getHours();
      var minutes = date.getMinutes();
      //var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      var strTime = hours + ':' + minutes

      var formattedDate = year + "-" + month + "-" + day +" "+strTime
      return formattedDate;
         
     },

     
  },
}