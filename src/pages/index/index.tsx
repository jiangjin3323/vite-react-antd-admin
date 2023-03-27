import React, { useState, useEffect } from 'react';
import { Table, Button, Image } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getBannerListApi } from '../../utils/request/api';
interface DataType {
    key: React.Key;
    id: number,
    url: string,
    linkUrl: string,
    updataTime: Date,
    createTime: Date,
}

const columns: ColumnsType<DataType> = [
    {
        title: 'ID',
        width: 100,
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: '图片',
        width: 100,
        dataIndex: 'url',
        key: 'url',
        render: (url) => <Image src={url} width={70} height={50} />,
    },
    {
        title: '跳转地址',
        dataIndex: 'linkUrl',
        key: 'linkUrL',
        width: 150,
    },
    {
        title: '更新时间',
        dataIndex: 'updataTime',
        key: 'updataTime',
        width: 150,
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        width: 150,
    }
];


const App: React.FC = () => {
    let [data, setData]: [data: DataType[], setData: any] = useState([]);
    const getBannerListFunc = async () => {
        const [err, res]: any = await getBannerListApi();
        if (err) return;
        const list: DataType[] = res.data.map((item: DataType) => {
            return {
                ...item,
                key: item.id
            }
        })
        setData(list);
    }
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [loading, setLoading] = useState(false);
    const start = () => {
        setLoading(true);
        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
    };
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    useEffect(() => {
        getBannerListFunc();
    }, [data])
    return (
        <>
            <div style={{ marginBottom: 16 }}>
                <Button className='bg-[#1677ff] mr-5' type="primary">
                    新增
                </Button>
                <Button className='bg-[#1677ff]' type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                    删除
                </Button>
                <span style={{ marginLeft: 8 }}>
                    {hasSelected ? `已选择 ${selectedRowKeys.length} 条` : ''}
                </span>

            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} scroll={{ x: 1500, y: 480 }} />

        </>
    )
}

export default App;