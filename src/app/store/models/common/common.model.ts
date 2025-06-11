import { ICitiesResponseEntity } from "@/domain/entities/common/cities-response.entity";
import { IDepartmentsResponseEntity } from "@/domain/entities/common/departments-response.entity";

export interface CommonState {
    departments: IDepartmentsResponseEntity[];
    cities: ICitiesResponseEntity[];
    loading: boolean;
    error: any;
}

export const initialCommonState: CommonState = {
    departments: [],
    cities: [],
    loading: false,
    error: null
}


