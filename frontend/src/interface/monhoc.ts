import { Types } from 'mongoose';

interface iMonHoc {
    _id: Types.ObjectId | null;
    maMonHoc: string;
    tenMonHoc: string;
}

export default iMonHoc