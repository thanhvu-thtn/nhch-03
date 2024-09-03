import axios from "../../util/axios.customize";
import { loginFailed, loginStart, loginSuccess } from "../slince/CurrentUserSlice";
import { loadingStart, loadingSuccess, loadingFailed } from "../slince/MonHocListSlice"
import { iLoginUser } from "../../interface/user";
import { AppDispatch } from "../store";
import { useNavigate } from "react-router-dom";
import { eRole } from "../../interface/role";
//---------------------------------------
//Login
export const loginUser = async (user: iLoginUser, dispatch: AppDispatch, navigate: ReturnType<typeof useNavigate>) => {
  dispatch(loginStart());
  await axios.post("/v2/auth/login", user).then((res) => {
    dispatch(loginSuccess(res.data))
    const role = res.data.quyen.chucNang
    if (role === eRole.Admin) {
      navigate("/pageadmin/admin")
    } else if (role === eRole.TT) {
      navigate("/pagetotruong/totruong")
    } else if (role === eRole.GV) {
      navigate("/pagegiaovien/giaovien")
    } else {
      dispatch(loginFailed("Bạn chưa được phân quyền - Xin liên hệ với quản lí trang web!"))
    }

  }).catch((err) => {
    if (err.response) {
      dispatch(loginFailed(err.response.data))
    } else {
      dispatch(loginFailed("Lỗi hệ thống"))
    }
  })
}
//--------------------------------------------
//Load Monhocs
export const loadMonHocs = async (accessToken: string, dispatch: AppDispatch) => {
  dispatch(loadingStart());
  const config = {
    headers: {
      token: accessToken,
    }
  }
  await axios.get("v2/monhoc/index", config)
    .then((res) => {
      dispatch(loadingSuccess(res.data))
    }).catch((err) => {
      if (err.response) {
        dispatch(loadingFailed(err.response.data))
      } else {
        dispatch(loadingFailed("Lỗi hệ thống"))
      }
    })
}
//--------------------------------------------------------------
