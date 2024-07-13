import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [groupFile, setGroupFile] = useState(null);
  const [hostelFile, setHostelFile] = useState(null);
  const [allocationResults, setAllocationResults] = useState([]);

  const uploadFile = (file, endpoint) => {
    const formData = new FormData();
    formData.append('file', file);
    axios.post(`http://localhost:5000/${endpoint}`, formData)
      .then(response => {
        console.log(response.data.message);
      })
      .catch(error => {
        console.error('There was an error uploading the file!', error);
      });
  };

  const handleAllocation = () => {
    axios.post('http://localhost:5000/allocate-rooms')
      .then(response => {
        setAllocationResults(response.data);
      })
      .catch(error => {
        console.error('There was an error allocating the rooms!', error);
      });
  };

  const downloadAllocation = () => {
    axios.get('http://localhost:5000/download-allocation', { responseType: 'blob' })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'allocation_results.csv');
        document.body.appendChild(link);
        link.click();
      });
  };

  return (
    <div className="App">
      <h1>Hospitality Process Digitalization</h1>
      <div>
        <input type="file" onChange={e => setGroupFile(e.target.files[0])} />
        <button onClick={() => uploadFile(groupFile, 'upload-group-info')}>Upload Group Info</button>
      </div>
      <div>
        <input type="file" onChange={e => setHostelFile(e.target.files[0])} />
        <button onClick={() => uploadFile(hostelFile, 'upload-hostel-info')}>Upload Hostel Info</button>
      </div>
      <div>
        <button onClick={handleAllocation}>Allocate Rooms</button>
        <button onClick={downloadAllocation}>Download Allocation</button>
      </div>
      <div>
        <h2>Allocation Results</h2>
        <table>
          <thead>
            <tr>
              <th>Group ID</th>
              <th>Hostel Name</th>
              <th>Room Number</th>
              <th>Members Allocated</th>
            </tr>
          </thead>
          <tbody>
            {allocationResults.map(result => (
              <tr key={result.groupId}>
                <td>{result.groupId}</td>
                <td>{result.hostelName}</td>
                <td>{result.roomNumber}</td>
                <td>{result.membersAllocated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
