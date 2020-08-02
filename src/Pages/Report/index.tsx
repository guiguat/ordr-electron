import React from "react";
import { FiFilePlus } from "react-icons/fi";
import Loading from "../../Components/Loading";
import { useApi } from "../../Contexts/Api";
import "../../custom.scss";

export interface IReportData {
  id: number;
  dateTime: string;
  debit: number;
  credit: number;
  cash: number;
  total: number;
}

const Report: React.FC = () => {
  const { Api, useAxios } = useApi();

  const { data, error } = useAxios<IReportData[]>("/report");

  if (error)
    alert("An error occurred when trying to reach the server:\n" + error);

  if (!data) return <Loading />;

  async function openReport() {
    try {
      const response = await Api.post("/report");
      alert(response.data.message);
    } catch (error) {
      alert("An error occurred when trying to reach the server:\n" + error);
    }
  }

  return (
    <>
      <h3 className="mb-1">Report</h3>

      <button className="btn shadow-sm btn-success my-3" onClick={openReport}>
        <FiFilePlus size={18} className="mb-1 mr-2" />
        Open new
      </button>

      <table className="table">
        <caption>List of reports</caption>
        <thead className="thead-dark">
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Debit</th>
            <th scope="col">Credit</th>
            <th scope="col">Cash</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((r: IReportData) => (
            <tr key={r.id}>
              <th scope="row">{r.dateTime}</th>
              <td>${r.debit.toFixed(2)}</td>
              <td>${r.credit.toFixed(2)}</td>
              <td>${r.cash.toFixed(2)}</td>
              <td>${r.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Report;
