import { useDispatch, useSelector } from 'react-redux';
import { Checkbox } from 'antd';
import styled from 'styled-components';

import { RootState } from '@/context/store';
import { checkConstruction, checkFireDepartment, checkWaterIntake } from '@/context/store/SupervisionSlice';

export const DisplayOptionsCheckbox = () => {
    const dispatch = useDispatch();
    const { displayedConstruction, displayedWaterIntake, displayedFireDepartment } = useSelector(
        (state: RootState) => state.supervision,
    );
    return (
        <WrapperCheckbox>
            <CheckboxFireDepartmentStyled
                value="fireDepartment"
                checked={displayedFireDepartment}
                onChange={() => dispatch(checkFireDepartment())}
            >
                Đơn vị PCCC
            </CheckboxFireDepartmentStyled>
            <CheckboxWaterIntakeStyled
                value="waterIntake"
                checked={displayedWaterIntake}
                onChange={() => dispatch(checkWaterIntake())}
            >
                Điểm lấy nước
            </CheckboxWaterIntakeStyled>
            <CheckboxConstructionStyled
                value="construction"
                checked={displayedConstruction}
                onChange={() => dispatch(checkConstruction())}
            >
                Công trình
            </CheckboxConstructionStyled>
        </WrapperCheckbox>
    );
};

const WrapperCheckbox = styled.div`
    width: 30%;
    margin: 10px 0 0 68px;
    display: flex;
`;

const CheckboxFireDepartmentStyled = styled(Checkbox)`
    min-width: 120px;
    padding: 2px 1px 2px 3px;
    border: 2px solid #82b366;
    background-color: #d5e8d4bf;
    border-radius: 4px;
    font-size: 10px;
    font-weight: 400;
    line-height: 20px;
    flex: 1;
`;

const CheckboxWaterIntakeStyled = styled(CheckboxFireDepartmentStyled)`
    border: 2px solid #ff0003;
    background-color: #ff6668bf;
`;

const CheckboxConstructionStyled = styled(CheckboxFireDepartmentStyled)`
    border: 2px solid #00b3fe;
    background-color: #66d1febf;
`;
