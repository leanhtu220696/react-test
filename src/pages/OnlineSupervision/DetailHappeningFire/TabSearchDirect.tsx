import { useEffect, useState } from 'react';
import React from 'react';
import { Select, Tabs, Tooltip } from 'antd';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

import { useCoordinatesOriginStore } from '@/component/hook/useCoordinatesOriginStore';
import { useOriginAndDestinationListStore } from '@/component/hook/useOriginAndDestinationListStore';
import SearchIndexDirect from '@/component/search/SearchIndex/SearchIndexDirection';
import { OriginAndDestinationItemModel } from '@/context/store/OriginAndDestinationListSlice';
import { SelectLoader } from '@/elements/skeleton/ExampleLoader';
import { SELECT_FIRE_HAPPENING_LOADER } from '@/util/ConstantApp/TypeLoader';

import { useCollectionCoordinateEncodedStore } from '../../../component/hook/useCollectionCoordinateEncodedStore';
import SelectInfiniteScroll from '../../../component/select/SelectInfiniteScroll';
import {
    useGetFireDepartmentById,
    useGetListFireDepartment,
} from '../../../fetcher/FireDepartment/FireDepartmentService';
import { useFetcherDirection } from '../../../fetcher/Map/CallApiMap';
import { DetailFireDepartmentModel } from '../../../model/FireDepartment/FireDepartmentModel';
import { FireLogModel } from '../../../model/FireLog/FireLogModel';

interface FireDepartmentHasDistModel extends DetailFireDepartmentModel {
    dist: number;
}
const StyleBackgroundItem = styled.div`
    margin: 10px 0 10px 0;
`;
const { Option } = Select;
const SelectDepartment = ({
    isCallApiBySelect,
    setOrigin,
    detailHappeningFire,
    setIsCallApiBySelect,
}: {
    isCallApiBySelect: boolean;
    setOrigin: React.Dispatch<React.SetStateAction<string>>;
    detailHappeningFire: FireLogModel;
    setIsCallApiBySelect: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const valueSearch = '';
    const pageSize = 100;
    const [pageIndex, setPageIndex] = useState(0);
    const [resListFireDepartment, makeReqListFireDepartment] = useGetListFireDepartment(
        pageIndex,
        pageSize,
        valueSearch,
        detailHappeningFire?.province?.id,
    );
    const { resetOriginCoordinatesStore } = useCoordinatesOriginStore();
    const [listFireDepartment, setListFireDepartment] = useState<DetailFireDepartmentModel[]>([]);
    const [idFireDepartment, setIdFireDepartment] = useState<number>();
    const [repDetailFireDepartment, setMakeResDetailFireDepartment] = useGetFireDepartmentById(idFireDepartment);
    const { originAndDestinationListStore, setOriginAndDestinationListStore } = useOriginAndDestinationListStore();
    const itemExist = originAndDestinationListStore.find((item) => item.idHappeningFire === detailHappeningFire?.id);
    const distance = (latOrigin: number, lonOrigin: number, latDestination: number, lonDestination: number) => {
        const convertRad = (val: number) => {
            return (Math.PI * val) / 180;
        };
        const radLatOrigin = convertRad(latOrigin);
        const radLatDestination = convertRad(latDestination);
        const theta = lonOrigin - lonDestination;
        const radTheta = (Math.PI * theta) / 180;
        let dist =
            Math.sin(radLatOrigin) * Math.sin(radLatDestination) +
            Math.cos(radLatOrigin) * Math.cos(radLatDestination) * Math.cos(radTheta);
        dist = Math.acos(dist);
        dist = Math.acos(dist);
        dist = dist * (180 / Math.PI);
        dist = dist * 60 * 1.1515;
        dist = dist * 1.609344;
        return dist;
    };

    useEffect(() => {
        if (isCallApiBySelect === false) {
            setIdFireDepartment(null);
        }
    }, [isCallApiBySelect]);

    useEffect(() => {
        if (detailHappeningFire) {
            setIdFireDepartment(null);
            makeReqListFireDepartment();
        }
    }, [detailHappeningFire]);

    useEffect(() => {
        if (itemExist) {
            const item = listFireDepartment.find((item) => {
                return item.latitude === +itemExist.originLat && item.longitude === +itemExist.originLng;
            });
            if (item) {
                setIdFireDepartment(item.id);
            }
        }
    }, [listFireDepartment]);
    useEffect(() => {
        if (resListFireDepartment.data) {
            setPageIndex(pageIndex);
            const list: FireDepartmentHasDistModel[] = [];
            resListFireDepartment.data.fireDepartmentViewList.forEach((item) => {
                const itemNew = {
                    ...item,
                    dist: distance(
                        item.latitude,
                        item.longitude,
                        detailHappeningFire?.latitude,
                        detailHappeningFire?.longitude,
                    ),
                };
                list.push(itemNew);
            });
            list.sort((a, b) => b.dist - a.dist);
            list.forEach((item) => {
                delete item.dist;
            });
            setListFireDepartment(list);
            if (!itemExist) {
                setIdFireDepartment(list[0]?.id);
            }
        }
    }, [resListFireDepartment]);

    useEffect(() => {
        let list: OriginAndDestinationItemModel[] = originAndDestinationListStore;
        if (itemExist) {
            const listNew: OriginAndDestinationItemModel[] = [];
            list.forEach((item) => {
                if (item.idHappeningFire !== itemExist.idHappeningFire) {
                    listNew.push(item);
                }
            });
            list = listNew;
        }
        list = [
            ...list,
            {
                ...itemExist,
                idFireDepartment: idFireDepartment,
                placeId: idFireDepartment ? '' : itemExist?.placeId,
            },
        ];
        setOriginAndDestinationListStore(list);
        if (idFireDepartment) {
            setIsCallApiBySelect(true);
            resetOriginCoordinatesStore();
            setMakeResDetailFireDepartment(SELECT_FIRE_HAPPENING_LOADER, [465]);
        }
    }, [idFireDepartment]);

    useEffect(() => {
        if (repDetailFireDepartment.data) {
            const latitude = `${repDetailFireDepartment.data.latitude}`;
            const longitude = `${repDetailFireDepartment.data.longitude}`;
            setOrigin(`${latitude},${longitude}`);
        }
    }, [repDetailFireDepartment]);
    return (
        <>
            <SelectLoader loadingarea={SELECT_FIRE_HAPPENING_LOADER}>
                <SelectInfiniteScroll
                    value={idFireDepartment}
                    style={{ width: '100%' }}
                    placeholder="Chọn đơn vị PCCC và CNCH"
                    onChange={(value: any) => {
                        setIdFireDepartment(value);
                    }}
                    data={listFireDepartment}
                    makeRequest={makeReqListFireDepartment}
                    item={(el) => (
                        <Option key={uuid()} value={el.id}>
                            <Tooltip title={el.name}>{el.name}</Tooltip>
                        </Option>
                    )}
                />
            </SelectLoader>
        </>
    );
};
const TabSearch = ({ detailHappeningFire }: { detailHappeningFire: FireLogModel }) => {
    const [destination, setDestination] = useState('');
    const [origin, setOrigin] = useState('');
    const { setCollectionCoordinateEncodedStore } = useCollectionCoordinateEncodedStore();
    const [repDirect, setMakeResDirect] = useFetcherDirection(origin, destination);
    const [isCallApiBySelect, setIsCallApiBySelect] = useState(true);
    const { originAndDestinationListStore, setOriginAndDestinationListStore } = useOriginAndDestinationListStore();
    const { coordinatesOriginStore } = useCoordinatesOriginStore();
    const itemExist = originAndDestinationListStore.find((item) => item.idHappeningFire === detailHappeningFire?.id);
    const [valueActiveKey, setValueActiveKey] = useState('1');

    useEffect(() => {
        if (itemExist) {
            if (itemExist.placeId || coordinatesOriginStore.latitude !== 0) {
                setValueActiveKey('1');
            } else {
                setValueActiveKey('0');
            }
        } else {
            setTimeout(() => {
                setValueActiveKey('0');
            }, 100);
        }
    }, [detailHappeningFire, origin]);

    useEffect(() => {
        if (origin) {
            setMakeResDirect();
        }
    }, [origin]);

    useEffect(() => {
        if (repDirect) {
            let list: OriginAndDestinationItemModel[] = originAndDestinationListStore;
            if (itemExist) {
                const listNew: OriginAndDestinationItemModel[] = [];
                list.forEach((item) => {
                    if (item.idHappeningFire !== itemExist.idHappeningFire) {
                        listNew.push(item);
                    }
                });
                list = listNew;
            }
            list = [
                ...list,
                {
                    ...itemExist,
                    idHappeningFire: detailHappeningFire.id,
                    originLat: +origin.split(',')[0],
                    originLng: +origin.split(',')[1],
                    destinationLat: +destination.split(',')[0],
                    destinationLng: +destination.split(',')[1],
                },
            ];
            setOriginAndDestinationListStore(list);
            setCollectionCoordinateEncodedStore(repDirect.routes[0].overview_polyline.points);
        }
    }, [repDirect]);

    useEffect(() => {
        if (detailHappeningFire) {
            const latitude = detailHappeningFire.latitude;
            const longitude = detailHappeningFire.longitude;
            setDestination(`${latitude},${longitude}`);
        }
    }, [detailHappeningFire]);

    return (
        <Tabs
            activeKey={valueActiveKey}
            onChange={(valActiveKey: string) => {
                setValueActiveKey(valActiveKey);
            }}
            defaultActiveKey="0"
            type="card"
            size="large"
            items={new Array(2).fill(null).map((_, i) => {
                if (i === 0) {
                    return {
                        label: `Chỉ đường từ đội PCCC`,
                        key: '0',
                        children: (
                            <StyleBackgroundItem>
                                <SelectDepartment
                                    isCallApiBySelect={isCallApiBySelect}
                                    setOrigin={setOrigin}
                                    detailHappeningFire={detailHappeningFire}
                                    setIsCallApiBySelect={setIsCallApiBySelect}
                                />
                            </StyleBackgroundItem>
                        ),
                    };
                } else {
                    return {
                        label: `Chỉ đường từ vị trí khác`,
                        key: '1',
                        children: (
                            <StyleBackgroundItem>
                                <SearchIndexDirect
                                    detailHappeningFire={detailHappeningFire}
                                    isCallApiBySelect={isCallApiBySelect}
                                    setOrigin={setOrigin}
                                    setIsCallApiBySelect={setIsCallApiBySelect}
                                />
                            </StyleBackgroundItem>
                        ),
                    };
                }
            })}
        />
    );
};
export default TabSearch;
