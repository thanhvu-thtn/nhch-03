import { eRole } from "../../interface/role";
import { RootState } from "../store";

export const checkRole = function (role: eRole, state: RootState): boolean {
    let kq = true;
    if (state.currentUser.login.currentUser?.quyen.chucNang !== role) {
        kq = false
    }
    return kq;
}