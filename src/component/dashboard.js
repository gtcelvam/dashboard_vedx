import React, { useEffect,useRef,useState } from 'react';
import axios from 'axios';
import '../css/dashboard.css';

function Dashboard(){
  const [data,setData] = useState(null);
  const [userData,setUserData] = useState(null);
  const [select,setSelect] = useState(null);
  const selectRef = useRef(null);
  useEffect(()=>{
    axios.get('https://my-json-server.typicode.com/Ved-X/assignment/orders')
    .then(res=>{
       setData(res.data);
    })
    .catch(err=>{
        console.log(err)
    })
  },[]);
  useEffect(()=>{
        setUserData(data);
  },[data])
  useEffect(()=>{
      if(data !== null){
        let option = [];
        data.map(item=>{
            !option.includes(item.status) && option.push(item.status);
        });
        setSelect(option);
      }
  },[data])
  var orderData = userData !== null && userData.map(item=>{
        return(
            <tr key={item.order_id}>
            <td id='order-id'>#{item.order_id}</td>
            <td>{item.customer}</td>
            <td>{item.address}</td>
            <td>{item.product_title}</td>
            <td>{item.date}</td>
            <td id='status'><p className={"status-text "+item.status.toLowerCase()}>{item.status}</p></td>
        </tr> 
        );
    });
  var selectData = select !== null && select.map(item=>{
      return(
        <option key={item} value={item}>{item}</option>
      )
  })
  var handleName = (e)=>{
        let name = [e.target.value];
        name !== '' &&
        name.map((item,index)=>{
            let user = [];
            data.find((elem,index)=>{
                let end = item.length;
                if(item === elem.customer.toLowerCase().slice(0,end)){
                    user.push(data[index]);
                    setUserData(user);
                }
            })
        })
  }
  var handleSelect = (e)=>{
      let status = e.target.value;
      if(status === "All"){
          setUserData(data);
      }else{
        let result = [];
      data.map(item=>{
         status === item.status && result.push(item);
      });
      setUserData(result);
      }
  }
  var handleSort = ()=>{
       const result = [...data].sort((a,b)=>{
        let date1 = a.date.split('/')[2];
        let date2 = b.date.split('/')[2];
        return date2 - date1
       });
       setUserData(result);
    }
  var selectToggle = ()=>{
        var selectElem = selectRef.current;
        selectElem.classList.toggle('display-hide');
  }
  return (
    <div className='container'>
     <div className="head-section">
         <div className="order-head">
             <div className="head-title">
                <h1>All Orders {userData !== null && userData.length}</h1>
             </div>
         </div>
         <div className="order-result">
            <p>Showing results of {userData !== null && userData.length}</p>
         </div>
     </div>
     <div className="filter-section">
         <div className="search-container">
             <div className="search">
                <p><i className="fa-solid fa-magnifying-glass"></i></p>
                <input type="text" onChange={handleName} className='search-input'/>
             </div>
         </div>
         <div className="filter-container">
             <div className="filter-tab">
                 <p onClick={selectToggle}><i className="fa-solid fa-arrow-down-short-wide"></i> Filter</p>
                 <div className="select-container">
                 <select name="status-select" ref={selectRef} onChange={handleSelect} className='status-select display-hide'>
                    <option value='All'>All</option>
                    {select !== null && selectData}
                 </select>
                 </div>
             </div>
             <div className="sort-tab">
                 <p onClick={handleSort}><i className="fa-solid fa-sort"></i> Sort By Date</p>
             </div>
         </div>
     </div>
     <div className="table-section">
         <table>
             <thead>
                 <tr>
                 <th>ORDER ID <i className="fa-solid fa-caret-down"></i></th>
                 <th>CUSTOMER <i className="fa-solid fa-caret-down"></i></th>
                 <th>ADDRESS <i className="fa-solid fa-caret-down"></i></th>
                 <th>PRODUCT <i className="fa-solid fa-caret-down"></i></th>
                 <th>DATE ORDER <i className="fa-solid fa-caret-down"></i></th>
                 <th>STATUS</th>
                 </tr>
             </thead>
             <tbody>
                 {userData !== null && orderData}
             </tbody>
         </table>
     </div>
    </div>
  )
}

export default Dashboard;
