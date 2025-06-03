import { IBasicUserInformation } from "@/shared/entities/basic-user-information.entity";
import { ICompany } from "@/shared/entities/company.entity";
import { ITokens } from "@/shared/entities/tokens.entity";
import { IUuid } from "@/shared/entities/uuid.entity";

export interface ILoginResponseEntity extends IUuid, IBasicUserInformation {
    companies: ICompany[]
    tokens: ITokens
}