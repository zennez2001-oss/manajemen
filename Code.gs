const SPREADSHEET_ID = "11M0grgtgslfmjje4IptgYJFnBx6Xc6KR4ma5WSU6o_I";

function doGet() {
  return HtmlService.createHtmlOutputFromFile("index")
    .setTitle("Sistem Keuangan Pesantren")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

////////////////////////////
// INPUT KEUANGAN
////////////////////////////

function simpanKeuangan(data){

  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  let sheet = ss.getSheetByName("Input");

  if(!sheet){

    sheet = ss.insertSheet("Input");

    sheet.appendRow([
      "Timestamp",
      "Tanggal",
      "Keterangan",
      "Kategori",
      "SubKategori",
      "Masuk",
      "Keluar",
      "Pelapor"
    ]);

  }

  sheet.appendRow([
    new Date(),
    data.tanggal,
    data.keterangan,
    data.kategori,
    data.subKategori,
    data.masuk || 0,
    data.keluar || 0,
    data.pelapor
  ]);

  return "Data keuangan berhasil disimpan";
}

////////////////////////////
// INVENTARIS KANTIN
////////////////////////////

function simpanInventaris(data){

  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  let sheet = ss.getSheetByName("Inventaris");

  if(!sheet){

    sheet = ss.insertSheet("Inventaris");

    sheet.appendRow([
      "Timestamp",
      "Tanggal",
      "Barang",
      "Jumlah",
      "Tipe",
      "Keterangan",
      "Pelapor"
    ]);

  }

  sheet.appendRow([
    new Date(),
    data.tanggal,
    data.barang,
    data.jumlah,
    data.tipe,
    data.keterangan,
    data.pelapor
  ]);

  return "Data inventaris berhasil disimpan";
}

////////////////////////////
// DASHBOARD
////////////////////////////

function getDashboard(){

  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  const sheet = ss.getSheetByName("Input");

  if(!sheet) return {};

  const data = sheet.getDataRange().getValues();

  let masuk = 0;
  let keluar = 0;
  let spp = 0;
  let donatur = 0;

  for(let i=1;i<data.length;i++){

    masuk += Number(data[i][5]) || 0;
    keluar += Number(data[i][6]) || 0;

    if(data[i][4] == "Wali Santri"){
      spp += Number(data[i][5]) || 0;
    }

    if(data[i][4] == "Donatur"){
      donatur += Number(data[i][5]) || 0;
    }

  }

  return {

    masuk: masuk,
    keluar: keluar,
    saldo: masuk - keluar,
    spp: spp,
    donatur: donatur

  };

}
