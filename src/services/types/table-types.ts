import { TDateISO } from "./datetime-types";

export type TTable = {
  id: string;
  documentStatus: string;
  employeeNumber: string;
  documentType: string;
  documentName: string;
  companySignatureName: string;
  employeeSignatureName: string;
  employeeSigDate: TDateISO;
  companySigDate: TDateISO;
};

export type TTableExport = Omit<TTable, "id">;
