import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { faEraser, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Divider, message, Popover, Select, Tooltip } from 'antd';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

import { getPhoneNumberExists, setChangeModal } from '@/context/store/PhoneNumberExistsSlice';
import { useGetAllAlertReceiver } from '@/fetcher/Customer/CustomerService';
import { DetailCustomerModel } from '@/model/Customer/CustomerModel';
import { flex, font } from '@/styles/Style-mixins';
import { showMessage } from '@/util/Util';

import FormAddPhoneNumber from './FormAddPhoneNumber';
import FormEditPhoneNumber from './FormEditPhoneNumber';

interface StyleProps {
    isrequired?: string;
    isidnull?: string;
    disableform?: string;
    ispopup?: string;
}
const dataTextConstant = {
    valueSelectPhoneNumber: 'Chọn số điện thoại',
    placeholderSelectPhoneNumber: 'Tìm kiếm trong danh sách',
    contentMessageErrorPhoneNumberExists: 'Số điện thoại đã tồn tại trong danh sách nhận cảnh báo',
    titleFormEditPhoneNumber: 'Sửa số điện thoại nhận thông báo',
    labelField: 'Số điện thoại nhận cảnh báo',
};

const StyleControl = styled.div<StyleProps>`
    margin-bottom: 16px;
    ${flex('flex-start', 'flex-start', 'row')}
    label {
        width: ${(props) => (props.ispopup === 'true' ? '45%' : '30%')};
        display: inline-block;
        ${font(14, '#000000', 600)}
    }
    label::after {
        content: ' *';
        display: ${(props) => (props.isrequired == 'true' ? 'revert' : 'none')};
        ${font(14, 'red', 600)}
    }
    .ant-input {
        ${font(14, '#000000', 400)}
    }
`;

const StyleItemInListAlertReceiver = styled.div<StyleProps>`
    background-color: ${(props) => (props.disableform === 'true' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(0, 0, 0,0)')};
    display: flex;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 2px;
    margin-bottom: 16px;
    padding: 5px 11px;
    flex-direction: row;
    justify-content: center;

    & > span {
        width: ${(props) => (props.disableform === 'true' ? '100%' : '80%')};
        white-space: nowrap;
        overflow: hidden !important;
        text-overflow: ellipsis;
        display: inline-block;
        ${font(14, '#000000', 400)}
        & > b {
            ${font(14, '#000000', 600)}
        }
    }
    & > button {
        width: 10%;
        border: none;
        background-color: transparent;
    }
    .cust-btn-edit-phone {
        visibility: ${(props) => (props.isidnull === 'true' ? 'hidden' : 'visible')};
    }
`;

const StyleTileEdit = styled.h2`
    padding: 10px 0 5px;
    text-align: center;
    ${font(14, '#000', 600)}
`;
const StyleMessageError = styled.small`
    ${font(12, 'red', 400)}
`;
function ControlPhoneNumber({
    listAddAlertReceiver,
    disabledForm,
    messageError,
    setListAddAlertReceiver,
    hiddenSelect,
    isPopup,
}: {
    isPopup: boolean;
    hiddenSelect?: boolean;
    listAddAlertReceiver: DetailCustomerModel[];
    disabledForm: boolean;
    messageError?: string;
    setListAddAlertReceiver: (value: any) => void;
}) {
    const [responseAllAlertReceiver, makeRequestAllAlertReceiver] = useGetAllAlertReceiver();
    const [itemAlertReceiverNew, setItemAlertReceiverNew] = useState<DetailCustomerModel>();
    const [value, setValue] = useState(null);
    const [listAlertReceiver, setListAlertReceiver] = useState<DetailCustomerModel[]>([]);
    const phoneNumberExists = useSelector(getPhoneNumberExists);
    const dispatch = useDispatch();
    const [messageApi, contextHolder] = message.useMessage();
    useEffect(() => {
        if (itemAlertReceiverNew) {
            setListAddAlertReceiver([...listAddAlertReceiver, itemAlertReceiverNew]);
            setListAlertReceiver([...listAlertReceiver, itemAlertReceiverNew]);
        }
    }, [itemAlertReceiverNew]);
    useEffect(() => {
        makeRequestAllAlertReceiver();
    }, []);
    useEffect(() => {
        if (responseAllAlertReceiver.data) {
            setListAlertReceiver(responseAllAlertReceiver.data);
        }
    }, [responseAllAlertReceiver]);
    useEffect(() => {
        if (phoneNumberExists.checked) {
            onChange(phoneNumberExists.phoneNumber);
            dispatch(
                setChangeModal({
                    name: '',
                    phoneNumber: '',
                    checked: false,
                    visible: false,
                }),
            );
        }
    }, [phoneNumberExists.checked]);
    const onChange = (value: any) => {
        const itemExistsListAdd = listAddAlertReceiver.find((item) => {
            return item.username === value;
        });
        if (itemExistsListAdd) {
            messageApi.open(showMessage('error', `${dataTextConstant.contentMessageErrorPhoneNumberExists}`));
        } else {
            const itemAlertReceiver = listAlertReceiver.find((item) => {
                return item.username === value;
            });
            if (itemAlertReceiver) {
                setListAddAlertReceiver([...listAddAlertReceiver, itemAlertReceiver]);
            }
            setValue(dataTextConstant.placeholderSelectPhoneNumber);
        }
    };
    const filterOption = (input: any, option: any) => {
        const name = option?.label.props.children[0].props.children;
        const phoneNumber = option?.label.props.children[2];
        return (`${name} - ${phoneNumber}` ?? '').toLowerCase().includes(input.toLowerCase());
    };
    const handleOnRemoveItem = (detail: DetailCustomerModel) => {
        const index = listAddAlertReceiver.findIndex((item) => {
            return item.username === detail.username;
        });
        if (index != -1) {
            const listAddAlertReceiverNew: DetailCustomerModel[] = [...listAddAlertReceiver];
            listAddAlertReceiverNew.splice(index, 1);
            setListAddAlertReceiver([...listAddAlertReceiverNew]);
        }
    };
    const onSaveEditItem = (name: string, phoneNumber: string, oldPhoneNumber: string) => {
        const itemAdd = listAddAlertReceiver.find((item) => {
            return item.username === oldPhoneNumber;
        });
        if (itemAdd) {
            const index = listAddAlertReceiver.findIndex((item) => {
                return item.username === itemAdd.username;
            });
            if (index != -1) {
                const itemAddNew = { ...itemAdd, fullName: name, username: `${phoneNumber}` };
                const listAddAlertReceiverNew: DetailCustomerModel[] = [...listAddAlertReceiver];
                listAddAlertReceiverNew.splice(index, 1, itemAddNew);
                setListAddAlertReceiver([...listAddAlertReceiverNew]);
            }
        }
    };
    const text = <StyleTileEdit>{dataTextConstant.titleFormEditPhoneNumber}</StyleTileEdit>;
    return (
        <>
            {contextHolder}
            <StyleControl isrequired="true" ispopup={`${isPopup}`}>
                <label>{dataTextConstant.labelField}</label>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', marginLeft: '15px' }}>
                    <div>
                        {listAddAlertReceiver && (
                            <>
                                {listAddAlertReceiver.map((item) => {
                                    return (
                                        <StyleItemInListAlertReceiver
                                            key={uuid()}
                                            isidnull={`${item.id !== null}`}
                                            disableform={`${disabledForm}`}
                                        >
                                            <Tooltip
                                                color="#108ee9"
                                                placement="top"
                                                title={`${item.username} - ${item.fullName}`}
                                            >
                                                <span>
                                                    <b>{item.username}</b> - {item.fullName}
                                                </span>
                                            </Tooltip>
                                            {!disabledForm && (
                                                <>
                                                    <Popover
                                                        placement="right"
                                                        title={text}
                                                        content={
                                                            <FormEditPhoneNumber
                                                                name={item.fullName}
                                                                phoneNumber={item.username}
                                                                onSaveEditItem={onSaveEditItem}
                                                                listAlertReceiver={listAlertReceiver}
                                                            />
                                                        }
                                                        trigger="click"
                                                    >
                                                        <Tooltip color="#108ee9" placement="top" title="Sửa">
                                                            <button
                                                                className="cust-btn-edit-phone"
                                                                onClick={() => {
                                                                    setTimeout(() => {
                                                                        const collection =
                                                                            document.getElementsByClassName(
                                                                                'ant-popover-content',
                                                                            );
                                                                        for (let i = 0; i < collection.length; i++) {
                                                                            //@ts-ignore
                                                                            collection[i].style.left = '70px';
                                                                        }
                                                                    });
                                                                }}
                                                            >
                                                                <FontAwesomeIcon
                                                                    icon={faPenToSquare}
                                                                    color={'#1790ff'}
                                                                />
                                                            </button>
                                                        </Tooltip>
                                                    </Popover>
                                                    <Tooltip color="#108ee9" placement="top" title="Xoá">
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                handleOnRemoveItem(item);
                                                            }}
                                                        >
                                                            <FontAwesomeIcon icon={faEraser} color={'#1790ff'} />
                                                        </button>
                                                    </Tooltip>
                                                </>
                                            )}
                                        </StyleItemInListAlertReceiver>
                                    );
                                })}
                            </>
                        )}
                    </div>
                    {!hiddenSelect && (
                        <div>
                            <Select
                                disabled={disabledForm}
                                id="cus-select-phone"
                                placeholder={dataTextConstant.placeholderSelectPhoneNumber}
                                showSearch
                                onFocus={() => {
                                    setValue(dataTextConstant.valueSelectPhoneNumber);
                                }}
                                onBlur={() => {
                                    setValue(null);
                                }}
                                style={{ width: '100%' }}
                                value={value}
                                onChange={onChange}
                                filterOption={filterOption}
                                dropdownRender={(menu) => (
                                    <div>
                                        <div className="custom-select-menu">{menu}</div>
                                        <Divider style={{ margin: '8px 0' }} />
                                        <div className="custom-select-button">
                                            <FormAddPhoneNumber
                                                setItemAlertReceiverNew={setItemAlertReceiverNew}
                                                listAlertReceiver={listAlertReceiver}
                                            />
                                        </div>
                                    </div>
                                )}
                                options={listAlertReceiver.map((item) => ({
                                    label: (
                                        <>
                                            <b>{item.username}</b> - {item.fullName}
                                        </>
                                    ),
                                    value: item.username,
                                }))}
                            />
                            {listAddAlertReceiver && (
                                <>
                                    {listAddAlertReceiver.length === 0 && (
                                        <StyleMessageError>{messageError}</StyleMessageError>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                </div>
            </StyleControl>
        </>
    );
}
export default ControlPhoneNumber;
