import React, { useState, useEffect, Key } from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getUserListApi, addUserApi, deleteUserApi, updateUserApi } from '../../utils/request/api';
const { Column, ColumnGroup } = Table;

interface DataType {
  key: React.Key;
  id: number,
  name: string,
  account: string,
  password: string,
  loginTime: Date,
  createTime: Date,
}

const App: React.FC = () => {
  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '账号',
      dataIndex: 'account',
      key: 'account',
    },
    {
      title: '密码',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: '最近登录时间',
      dataIndex: 'loginTime',
      key: 'loginTime',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
  ];

  let [data, setData] = useState<DataType[]>([]);
  const getUserListFunc = async () => {
    const [err, res]: any = await getUserListApi();
    if (err) return;
    const list: DataType[] = res.data.map((item: DataType) => {
      return {
        ...item,
        key: item.id
      }
    })
    setData(list);
  }
  useEffect(() => {
    getUserListFunc();
  }, [])
  return (
    <Table columns={columns} dataSource={data} scroll={{ x: 1500, y: 480 }} />
  )
}

export default App;