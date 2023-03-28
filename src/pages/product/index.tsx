import React, { useState, useEffect, Key } from 'react';
import { Table, Image,Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getProductListApi, addProductApi, deleteProductApi, updateProductApi } from '../../utils/request/api';

interface DataType {
    key: React.Key;
    id: number,
    img: string,
    title: string,
    name: string,
    type: string,
    createTime: Date,
    updataTime: Date,
}

const App: React.FC = () => {
    const columns: ColumnsType<DataType> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '图片',
            dataIndex: 'img',
            key: 'img',
            render: (img: string) => <Image src={img} width={70} height={50} />,
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '最近修改时间',
            dataIndex: 'updataTime',
            key: 'updataTime',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },
        {
            title: '编辑',
            dataIndex: 'id',
            key: 'id',
            width: 130,
            fixed: 'right',
            render: (id: number) => <Button className='bg-[#1677ff]' key="submit" type="primary" onClick={() => { updateBtnClick(id) }}> 操作 </Button>
        }
    ];

    let [data, setData] = useState<DataType[]>([]);
    const getProductListFunc = async () => {
        const [err, res]: any = await getProductListApi();
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
        getProductListFunc();
    }, [])

    const updateBtnClick = async (id: number) => {
        console.log(id);
    }
    return (
        <Table columns={columns} dataSource={data} scroll={{ x: 1500, y: 480 }} />
    )
}

export default App;