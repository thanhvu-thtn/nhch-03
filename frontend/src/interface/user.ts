import { Types } from 'mongoose';
import iMonHoc from './monhoc';

interface iUser {
    _id: Types.ObjectId | null;
    userName: string | null;
    hoTen: string | null;
    monHoc: iMonHoc | null;
    quyen: {
        chucNang: string | null;
        thuMuc: Array<Types.ObjectId> | [];
    }
}

export interface iCurrentUser{
    _id: Types.ObjectId | null;
    userName: string | null;
    accessToken:string|null;
    hoTen: string | null;
    monHoc: iMonHoc | null;
    quyen: {
        chucNang: string | null;
        thuMuc: Array<Types.ObjectId> | [];
    }
}

export interface iLoginUser{
    userName:string,
    password:string,
}

export interface iLoginResult{
    isSuccess:boolean;
    strError:string;
}

export default iUser
