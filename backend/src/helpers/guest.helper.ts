import xlsx from 'xlsx';
import IGuest from '../types/guest.types';

export default class GuestHelper {


  // dictionary is a JSON used to map the excel columns to the database fields ex: {'fullname': 'nombre', 'email': 'correo_electronico'}
  static async excelImport(excelFile: Buffer, dictionary: Record<string, string>): Promise<Partial<IGuest>[]> {
    const workbook = xlsx.read(excelFile.buffer, { type: 'buffer' });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const excelData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
    const columns: string[] = Array.isArray(excelData[0]) ? excelData[0] : [];

    const guests: Partial<IGuest>[] = excelData.slice(1).map((row: any) => {
      const guest: Partial<IGuest> = {};
      Object.entries(dictionary).forEach(([dbFieldName, excelColumnName]) => {
        const columnIndex = columns.indexOf(excelColumnName);
        if (columnIndex !== -1 && row[columnIndex] !== undefined) {
          guest[dbFieldName as keyof IGuest] = String(row[columnIndex]);
        }
      });
      return guest;
    });

    return guests;
  }


}