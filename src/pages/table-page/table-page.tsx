import TableItem from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { getTable } from "../../api";
import { TTable } from "../../services/reducer";
import { Button, TextField, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { formatDateFromISO } from "../../utils/date-format";

export function TablePage() {
  const [table, setTable] = useState<TTable[]>([]);
  useEffect(() => {
    getTable().then((tableData) => {
      setTable(tableData);
    });
  });
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
              <Button variant="contained" size="small" color="success">
                Добавить
              </Button>
            </TableCell>
            <TableCell></TableCell>
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
                  defaultValue={formatDateFromISO(line.companySigDate)[0]}
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
                  defaultValue={formatDateFromISO(line.employeeSigDate)[0]}
                  sx={{ width: 220, mb: 1 }}
                  disabled
                />
                <Typography>
                  {formatDateFromISO(line.employeeSigDate)[1]}
                </Typography>
              </TableCell>
              <TableCell>
                <Button variant="contained" size="small">
                  Изменить
                </Button>
              </TableCell>
              <TableCell>
                <Button variant="contained" size="small" color="error">
                  Удалить
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableItem>
    </TableContainer>
  );
}
