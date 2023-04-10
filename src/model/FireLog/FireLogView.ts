import { FireLogModel } from '@/model/FireLog/FireLogModel';
import { PaginationModel } from '@/model/PaginationModel';

export interface FireLogView {
    fireLogViewList: FireLogModel[];
    page: PaginationModel;
}
