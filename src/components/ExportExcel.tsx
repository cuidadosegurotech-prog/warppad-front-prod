import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export default function ExportExcel({ data }){
    const exportToExcel = ()=>{
    // 1️⃣ Crear hoja de cálculo a partir del JSON
    const worksheet = XLSX.utils.json_to_sheet(data);

    // 2️⃣ Crear libro y agregar la hoja
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");

    // 3️⃣ Generar buffer Excel
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // 4️⃣ Crear un blob y descargar
    const dataFile = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(dataFile, "reporte.xlsx");
    };

    return (
    <button
      onClick={exportToExcel}
      className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700"
    >
      Exportar a Excel
    </button>
  );
  
}