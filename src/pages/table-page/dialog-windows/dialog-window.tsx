import { useEffect, useState } from "react";
import { addLine, changeLine, deleteLine } from "../../../api";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { formatDateFromISO, formatDateToISO } from "../../../utils/date-format";
import { TTable } from "../../../services/types/table-types";

type DialogWindowProps = {
  open: boolean;
  onClose: () => void;
  flag: "add" | "change" | "delete" | "";
  row: TTable | null;
};

export function DialogWindow({ open, onClose, flag, row }: DialogWindowProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [companySigDate, setCompanySigDate] = useState<string>("");
  const [companySignatureName, setCompanySignatureName] = useState<string>("");
  const [documentName, setDocumentName] = useState<string>("");
  const [documentStatus, setDocumentStatus] = useState<string>("");
  const [documentType, setDocumentType] = useState<string>("");
  const [employeeNumber, setEmployeeNumber] = useState<string>("");
  const [employeeSigDate, setEmployeeSigDate] = useState<string>("");
  const [employeeSignatureName, setEmployeeSignatureName] =
    useState<string>("");

  useEffect(() => {
    if (row) {
      let newCompanySigDate = formatDateFromISO(row.companySigDate)[0];
      let newEmployeeSigDate = formatDateFromISO(row.employeeSigDate)[0];
      if (newCompanySigDate) setCompanySigDate(newCompanySigDate);
      if (newEmployeeSigDate) setEmployeeSigDate(newEmployeeSigDate);
      setCompanySignatureName(row.companySignatureName);
      setDocumentName(row.documentName);
      setDocumentStatus(row.documentStatus);
      setDocumentType(row.documentType);
      setEmployeeNumber(row.employeeNumber);
      setEmployeeSignatureName(row.employeeSignatureName);
    } else {
      setCompanySigDate("");
      setCompanySignatureName("");
      setDocumentName("");
      setDocumentStatus("");
      setDocumentType("");
      setEmployeeNumber("");
      setEmployeeSigDate("");
      setEmployeeSignatureName("");
    }
  }, [row]);

  const isEditMode = flag === "change";
  const isDeleteMode = flag === "delete";

  const title = isEditMode
    ? "Изменение записи"
    : isDeleteMode
    ? "Удаление записи"
    : "Добавление записи";

  const handleDelete = () => {
    if (row) {
      deleteLine(row.id).then(() => {
        onClose();
      });
    }
  };

  const handleAdd = () => {
    let employeeSigDateISO = formatDateToISO(new Date(employeeSigDate));
    let companySigDateISO = formatDateToISO(new Date(companySigDate));

    addLine({
      companySigDate: companySigDateISO,
      companySignatureName,
      documentName,
      documentStatus,
      documentType,
      employeeNumber,
      employeeSigDate: employeeSigDateISO,
      employeeSignatureName,
    }).then(() => {
      onClose();
    });
  };

  const handleChange = () => {
    let employeeSigDateISO = formatDateToISO(new Date(employeeSigDate));
    let companySigDateISO = formatDateToISO(new Date(companySigDate));
    if (row) {
      changeLine(
        {
          companySigDate: companySigDateISO,
          companySignatureName,
          documentName,
          documentStatus,
          documentType,
          employeeNumber,
          employeeSigDate: employeeSigDateISO,
          employeeSignatureName,
        },
        row.id
      ).then(() => {
        onClose();
      });
    }
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
      <DialogContent>
        {isDeleteMode ? (
          <DialogContentText>
            Вы действительно хотите удалить запись {`"${row?.documentType}"`}?
          </DialogContentText>
        ) : (
          <>
            <TextField
              autoFocus
              margin="dense"
              id="documentType"
              label="Тип документа"
              type="text"
              fullWidth
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="documentStatus"
              label="Статус документа"
              type="text"
              fullWidth
              value={documentStatus}
              onChange={(e) => setDocumentStatus(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="documentName"
              label="Название документа"
              type="text"
              fullWidth
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="employeeNumber"
              label="Номер сотрудника"
              type="text"
              fullWidth
              value={employeeNumber}
              onChange={(e) => setEmployeeNumber(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="companySignatureName"
              label="Название подписи компании"
              type="text"
              fullWidth
              value={companySignatureName}
              onChange={(e) => setCompanySignatureName(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="employeeSignatureName"
              label="Название подписи сотрудника"
              type="text"
              fullWidth
              value={employeeSignatureName}
              onChange={(e) => setEmployeeSignatureName(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="companySigDate"
              label="Дата подписи компании"
              type="datetime-local"
              fullWidth
              value={companySigDate}
              onChange={(e) => setCompanySigDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="employeeSigDate"
              label="Дата подписи сотрудника"
              type="datetime-local"
              fullWidth
              value={employeeSigDate}
              onChange={(e) => setEmployeeSigDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        {isEditMode ? (
          <Button onClick={handleChange} color="success">
            Сохранить
          </Button>
        ) : isDeleteMode ? (
          <Button onClick={handleDelete} color="error">
            Удалить
          </Button>
        ) : (
          <Button onClick={handleAdd} color="success">
            Добавить
          </Button>
        )}
        <Button onClick={onClose}>Отмена</Button>
      </DialogActions>
    </Dialog>
  );
}
