export const Rupiah = (v:string) =>{
    const number_string = v.replace(/[^,\d]/g, "").toString(),
    split = number_string.split(","),
    sisa = split[0].length % 3;
    let rupiah = split[0].substring(0, sisa)
    const ribuan = split[0].substring(sisa,sisa+1).match(/\d{3}/gi);

  // tambahkan titik jika yang di input sudah menjadi angka ribuan
  if (ribuan) {
    const separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }

  rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
  return "Rp " + rupiah;
}

export const formatPHPTimeStamp = (timestamp?:string, isUsingTime?:boolean)=> {
  if(!parseInt(timestamp||''))return '';
  var date = new Date(parseInt(timestamp||'') * 1000);

  // Fungsi untuk menambahkan angka 0 di depan angka satu digit
  function addLeadingZero(number:any) {
      return number < 10 ? "0" + number : number;
  }

  // Mendapatkan informasi tanggal dari objek Date
  var daysOfWeek = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  var dayOfWeek = daysOfWeek[date.getDay()];
  var day = addLeadingZero(date.getDate());
  var monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  var month = monthNames[date.getMonth()];
  var year = date.getFullYear();

  // Mendapatkan informasi waktu dari objek Date
  var hours = addLeadingZero(date.getHours());
  var minutes = addLeadingZero(date.getMinutes());

  // Membuat string format yang diinginkan
  var formattedDate = dayOfWeek + ", " + day + " " + month + " " + year;
  var formattedTime = "Jam " + hours + ":" + minutes;

  // Mengembalikan hasil dalam objek
  if(isUsingTime)return formattedDate+' '+formattedTime
  return formattedDate;
}
