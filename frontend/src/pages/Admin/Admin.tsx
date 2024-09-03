import { Col, Container, Row } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'

export const Admin = () => {
  return (
    <Container>
      <Row>
        <Col sm={2} xs={4}>
          <div>
            <Link to='monhoc' className='text-decoration-none'>
              Môn học
            </Link>
          </div>
          <div>
            <Link to='users' className='text-decoration-none'>
              Người dùng
            </Link>
          </div>
        </Col>
        <Col sm={10} xs={8} className='border-start'>
          <Outlet />
        </Col>
      </Row>
    </Container>
  )
}
