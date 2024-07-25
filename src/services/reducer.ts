import { TABLE_ADD, TABLE_CHANGE, TABLE_DELETE, TABLE_INIT } from "./constants";
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

type TTableState = {
  table: TTable[];
  isLoading: boolean;
};

type TTableInitAction = {
  type: typeof TABLE_INIT;
  table: TTable[];
};

type TTableAddAction = {
  type: typeof TABLE_ADD;
  line: TTable;
};

type TTableChangeAction = {
  type: typeof TABLE_CHANGE;
  id: string;
  line: TTable;
};

type TTableDeleteAction = {
  type: typeof TABLE_DELETE;
  id: string;
};

type TTableActions =
  | TTableInitAction
  | TTableAddAction
  | TTableChangeAction
  | TTableDeleteAction;

const defaultState: TTableState = {
  table: [],
  isLoading: true,
};

export function tableReducer(
  state = defaultState,
  action: TTableActions
): TTableState {
  switch (action.type) {
    case TABLE_INIT: {
      const table = action.table;
      return { ...state, table, isLoading: false };
    }

    case TABLE_ADD: {
      const line = action.line;
      const newTable = state.table;
      newTable.push(line);
      return { ...state, table: newTable, isLoading: false };
    }

    default:
      return state;
  }
}
