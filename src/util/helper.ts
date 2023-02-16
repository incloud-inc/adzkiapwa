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