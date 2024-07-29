import TableItem from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Fragment, useEffect, useState } from "react";
import { getTable } from "../../api";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { formatDateFromISO } from "../../utils/date-format";
import { DialogWindow } from "./dialog-windows/dialog-window";
import { TTable } from "../../services/types/table-types";

type TFlag = "add" | "change" | "delete" | "";

export function TablePage() {
  const [table, setTable] = useState<TTable[]>([]);
  const [flag, setFlag] = useState<TFlag>("");
  const [selectedRow, setSelectedRow] = useState<TTable | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getTable().then((tableData) => {
      setTable(tableData);
      setIsLoading(false);
    });
  }, []);

  const handleOpen = (flag: TFlag, row?: TTable) => {
    setFlag(flag);
    if (row) setSelectedRow(row);
  };
  const handleClose = () => {
    setFlag("");
    setSelectedRow(null);
  };

  const refreshTable = () => {
    setIsLoading(true);
    getTable().then((tableData) => {
      setTable(tableData);
      setIsLoading(false);
    });
  };

  const handleDialogClose = (canceled: boolean) => {
    handleClose();
    if (!canceled) {
      refreshTable();
    }
  };

  return (
    <TableContainer component={Paper}>
      <TableItem sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead
          sx={{
            backgroundColor: blue[50],
          }}
        >
          <TableRow>
            <TableCell>Тип документа</TableCell>
            <TableCell>Статус документа</TableCell>
            <TableCell>Название документа</TableCell>
            <TableCell>Номер сотрудника</TableCell>
            <TableCell>Название подписи компании</TableCell>
            <TableCell>Название подписи сотрудника</TableCell>
            <TableCell>Дата подписи компании</TableCell>
            <TableCell>Дата подписи сотрудника</TableCell>
            <TableCell>
              <Button
                variant="contained"
                size="small"
                color="success"
                disabled={isLoading || flag != ""}
                onClick={() => handleOpen("add")}
              >
                Добавить
              </Button>
            </TableCell>
            <TableCell>
              {isLoading && (
                <Box sx={{ display: "flex" }}>
                  <CircularProgress />
                </Box>
              )}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {table.map((line) => (
            <TableRow
              key={line.id}
              sx={{
                verticalAlign: "top",
              }}
            >
              <TableCell>{line.documentType}</TableCell>
              <TableCell>{line.documentStatus}</TableCell>
              <TableCell>{line.documentName}</TableCell>
              <TableCell>{line.employeeNumber}</TableCell>
              <TableCell>{line.companySignatureName}</TableCell>
              <TableCell>{line.employeeSignatureName}</TableCell>
              <TableCell>
                <TextField
                  id="datetime-company-sig"
                  type="datetime-local"
                  value={formatDateFromISO(line.companySigDate)[0]}
                  sx={{ width: 220, mb: 1 }}
                  disabled
                />
                <Typography>
                  {formatDateFromISO(line.companySigDate)[1]}
                </Typography>
              </TableCell>
              <TableCell>
                <TextField
                  id="datetime-employee-sig"
                  type="datetime-local"
                  value={formatDateFromISO(line.employeeSigDate)[0]}
                  sx={{ width: 220, mb: 1 }}
                  disabled
                />
                <Typography>
                  {formatDateFromISO(line.employeeSigDate)[1]}
                </Typography>
              </TableCell>
              <TableCell>
                <Fragment>
                  <Button
                    variant="contained"
                    size="small"
                    disabled={isLoading || flag != ""}
                    onClick={() => handleOpen("change", line)}
                  >
                    Изменить
                  </Button>
                </Fragment>
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  size="small"
                  color="error"
                  disabled={isLoading || flag != ""}
                  onClick={() => handleOpen("delete", line)}
                >
                  Удалить
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableItem>
      <DialogWindow
        open={flag !== ""}
        onClose={handleDialogClose}
        flag={flag}
        row={selectedRow}
      />
    </TableContainer>
  );
}
