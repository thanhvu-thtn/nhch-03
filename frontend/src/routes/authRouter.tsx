import { createBrowserRouter } from 'react-router-dom'
import { Login } from '../pages/Login'
import { PageAdmin } from '../pages/PageAdmin/PageAdmin'
import { PageToTruong } from '../pages/PageToTruong/PageToTruong'
import { PageGiaoVien } from '../pages/PageGiaoVien/PageGiaoVien'
import { Admin } from '../pages/Admin/Admin'
import { ToTruong } from '../pages/ToTruong/ToTruong'
import { GiaoVien } from '../pages/GiaoVien/GiaoVien'
import { NotFound } from '../pages/NotFound/NotFound'
import { MonHocs } from '../pages/Admin/monhocs/MonHocs'
import { Users } from '../pages/Admin/users/Users'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/pageadmin',
    element: <PageAdmin />,
    children: [
      {
        path: 'admin',
        element: <Admin />,
        children: [
          {
            path: 'monhoc',
            element: <MonHocs />
          },
          {
            path: 'users',
            element: <Users />
          }
        ]
      },
      {
        path: 'totruong',
        element: <ToTruong />
      },
      {
        path: 'giaovien',
        element: <GiaoVien />
      }
    ]
  },
  {
    path: '/pagetotruong',
    element: <PageToTruong />,
    children: [
      {
        path: 'totruong',
        element: <ToTruong />
      },
      {
        path: 'giaovien',
        element: <GiaoVien />
      }
    ]
  },
  {
    path: '/pagegiaovien',
    element: <PageGiaoVien />,
    children: [
      {
        path: 'giaovien',
        element: <GiaoVien />
      }
    ]
  },
  {
    path: '/*',
    element: <NotFound />
  }
])

export default router
