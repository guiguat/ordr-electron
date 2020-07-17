import React, { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { useApi } from '../../Contexts/Api';
import Users from '../User';

const Config: React.FC = () => {
  const {setBaseURL, baseURL} = useApi();
  const [baseUrl, setBaseUrl] = useState(baseURL)

  function handleChangeUrl(){
    const res = window.confirm("DANGER: Are you sure you want to change the default settings?");
    if(res) setBaseURL(baseUrl);
    else{
      setBaseUrl(baseURL)
    }
  }

  return (
    <>
      <Users/>     
      <div className="container bg-light rounded-lg p-4 mt-4">
        <h3 className="mb-4">Network</h3>
        <form onSubmit={handleChangeUrl}>
          <div className="form-group">
            <label htmlFor="ip"><h5>Server IP</h5></label>
            <input className="form-control" type="text" id="ip" value={baseUrl} onChange={e=>setBaseUrl(e.target.value)}/>
          </div>
          <button type="submit" className="btn btn-warning w-100">
            <FiEdit size={18} className="mr-2"/> Update
          </button>
        </form>
      </div>
    </>
  );
}

export default Config;