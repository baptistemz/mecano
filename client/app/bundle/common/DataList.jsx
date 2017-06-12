import React from 'react';
import { Field } from 'redux-form'

const DataList = ({ list_name, list }) => {
  return (
    <datalist name={list_name} id={list_name}>
      {
        list.map((i)=>{
          return <option key={i} value={i}/>
        })
      }
    </datalist>
    <Field type="text" list={list_name} id={`${list_name}-input`} />
  );
};

export { DataList };
