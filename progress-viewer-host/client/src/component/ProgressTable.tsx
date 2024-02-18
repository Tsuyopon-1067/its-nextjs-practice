import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { ReceivedData } from './ProgressData';

interface ProgressTableProps {
  addr: string
}
export default function ProgressTable({addr}: ProgressTableProps) {
  const [jsonData, setJsonData] = useState<ReceivedData>();

  const fetchData = async () => {
    const url = `http://${addr}/get`;
    try {
      const response = await fetch(url);
      const data: ReceivedData = await response.json()
      setJsonData(data);
    } catch (error) {
        console.error("エラーが発生しました:", error);
    }
  }

  const deleteData = (id: string) => {
    const url = `http://${addr}/get`;
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: `{id: ${id}}`,
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    fetchData();
  };

  useEffect(() => {
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, [addr]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>ID</TableCell>
            <TableCell align="center">1-1</TableCell>
            <TableCell align="center">1-2</TableCell>
            <TableCell align="center">1-3</TableCell>
            <TableCell align="center">1-4</TableCell>
            <TableCell align="center">1-5</TableCell>
            <TableCell align="center">1-6</TableCell>
            <TableCell align="center">1-7</TableCell>
            <TableCell align="center">1-8</TableCell>
            <TableCell align="center">2-1</TableCell>
            <TableCell align="center">2-2</TableCell>
            <TableCell align="center">2-3</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jsonData?.data.map((row, index) => (
            <TableRow
              key={index}
            >
              <TableCell align="center" component="th" scope="row" padding="none">
                <IconButton aria-label="delete" onClick={() => deleteData(row.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              {
                row.formerInfo.map((value) => (
                  <TableCell align="center" >{value ? "O" : "X"}</TableCell>
                ))
              }
              {
                row.latterInfo.map((value) => (
                  <TableCell align="center">{value ? "O" : "X"}</TableCell>
                ))
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p style={{fontSize: " 10pt", margin: "3pt 8pt", textAlign: "right"}}>
        {
          jsonData?.time !== undefined ?
          jsonData.time
          : "Now Loading..."
        }
      </p>
    </TableContainer>
  );
}