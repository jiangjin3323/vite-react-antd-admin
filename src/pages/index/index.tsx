import React, { useState, useEffect, Key } from 'react';
import { Table, Button, Image, Modal, Form, Input, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getBannerListApi, addBannerApi, deleteBannerApi, updateBannerApi } from '../../utils/request/api';
interface DataType {
    key: React.Key;
    id: number,
    url: string,
    linkUrl: string,
    updataTime: Date,
    createTime: Date,
}
interface ModalProps {
    visible: boolean;
    onCancel: () => void;
    onSubmit: (values: any) => void;
}

const App: React.FC = () => {
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
            render: (url: string) => <Image src={url} width={70} height={50} />,
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
        },
        {
            title: '编辑',
            dataIndex: 'id',
            key: 'id',
            width: 50,
            fixed: 'right',
            render: (id: number) => <Button className='bg-[#1677ff]' key="submit" type="primary" onClick={() => { updateBtnClick(id) }}> 操作 </Button>
        }
    ];

    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    let [data, setData] = useState<DataType[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isAddPopup, setIsAddPopup] = useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    const [updateId, setUpdateId] = useState<number>(0);
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

    const deleteBtnClick = async () => {
        setLoading(true);
        for (let i = 0; i < selectedRowKeys.length; i++) {
            const [err, res]: any = await deleteBannerApi({ id: selectedRowKeys[i] })
        }
        setSelectedRowKeys([]);
        setLoading(false);
        getBannerListFunc();
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
    }, [])

    const addPopupOkFun = async (id?: number) => {
        setConfirmLoading(true);
        const values = await form.validateFields();
        if (!id) {
            const [err, res]: any = await addBannerApi(values);
            if (err) return messageApi.error(err.msg);
        } else {
            const [err, res]: any = await updateBannerApi({
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
        getBannerListFunc();
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
                        label="图片地址"
                        name="url"
                        rules={[{ required: true, message: '请填写图片地址' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="跳转地址（选填）"
                        name="linkUrl"
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