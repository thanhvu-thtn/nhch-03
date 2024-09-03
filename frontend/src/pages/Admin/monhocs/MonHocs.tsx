import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../../interface/reduxhook'
import { loadMonHocs } from '../../../redux/api/apiRequest'
import { Button, Container, Table } from 'react-bootstrap'

export const MonHocs = () => {
  //Redux
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(
    state => state.currentUser.login.currentUser
  )
  const monHocs = useAppSelector(state => state.monhHocList.value.monHocs)
  const monHocError = useAppSelector(state => state.monhHocList.value.strError)
  //----------------------------------------------------------------------
  //Lấy dữ liệu
  useEffect(() => {
    if (currentUser && currentUser.accessToken) {
      loadMonHocs(currentUser.accessToken, dispatch)
    } else {
      alert('Lỗi hệ thống')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  //----------------------------------------------------------------------
  return (
    <Container>
      <div className='h4 text-center'>DANH MỤC MÔN HỌC</div>
      <div className='text-danger text-center mt-1 mb-1'>{monHocError}</div>
      <Button>Thêm môn học mới</Button>
      <Table>
        <thead>
          <tr>
            <th>Tên môn học</th>
            <th>Mã môn học</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {monHocs?.map((mh, index) => (
            <tr key={index}>
              <td>{mh.tenMonHoc}</td>
              <td>{mh.maMonHoc}</td>
              <td>Xoá - Sửa</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}
