import React, { useState, useEffect, Key } from 'react';
import { Table, Image, Button, message,Modal,Form,Input } from 'antd';
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
    const [form] = Form.useForm();
    let [data, setData] = useState<DataType[]>([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isAddPopup, setIsAddPopup] = useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    const [updateId, setUpdateId] = useState<number>(0);

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

    const deleteBtnClick = async () => {
        setLoading(true);
        for (let i = 0; i < selectedRowKeys.length; i++) {
            const [err, res]: any = await deleteProductApi({ id: selectedRowKeys[i] })
        }
        setSelectedRowKeys([]);
        setLoading(false);
        messageApi.success('ok');
        getProductListFunc();

    };
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log(newSelectedRowKeys)
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    const addPopupOkFun = async (id?: number) => {
        setConfirmLoading(true);
        const values = await form.validateFields();
        if (!id) {
            const [err, res]: any = await addProductApi(values);
            if (err) return messageApi.error(err.msg);
        } else {
            const [err, res]: any = await updateProductApi({
                ...values,
                id
            });
            if (err) return messageApi.error(err.msg);
        }
        setConfirmLoading(false);
        setIsAddPopup(false);
        setUpdateId(0);
        form.resetFields();
        messageApi.success('ok');
        getProductListFunc();
    }
    const addPopupCancelFun = async () => {
        setIsAddPopup(false);
        setUpdateId(0)
    }

    const updateBtnClick = async (id: number) => {
        setUpdateId(id)
        setIsAddPopup(true);
    }
    return (
        <>
            {contextHolder}
            <Modal
                open={isAddPopup}
                onCancel={addPopupCancelFun}
                footer={[
                    <Button key="back" onClick={addPopupCancelFun}>
                        取消
                    </Button>,
                    <Button className='bg-[#1677ff]' key="submit" type="primary" loading={confirmLoading} onClick={() => { addPopupOkFun(updateId ? updateId : 0) }}>
                        确定
                    </Button>,
                ]}
            >
                <div className='mt-6'></div>
                <Form
                    form={form}

                >
                    <Form.Item
                        label="名称"
                        name="name"
                        rules={[{ required: true, message: '请填写产品名称' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="图片"
                        name="img"
                        rules={[{ required: true, message: '请填写图片地址' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="类型"
                        name="type"
                        rules={[{ required: true, message: '请填写产品类型' }]}
                    >
                        <Input placeholder='xiaomi / Redmi' />
                    </Form.Item>
                    <Form.Item
                        label="标题"
                        name="title"
                        rules={[{ required: true, message: '请填写标题信息' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>

            </Modal>
            <div style={{ marginBottom: 16 }}>
                <Button className='bg-[#1677ff] mr-5' type="primary" onClick={() => { setIsAddPopup(!isAddPopup) }}>
                    新增
                </Button>
                <Button className='bg-[#1677ff]' type="primary" onClick={deleteBtnClick} disabled={!hasSelected} loading={loading}>
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