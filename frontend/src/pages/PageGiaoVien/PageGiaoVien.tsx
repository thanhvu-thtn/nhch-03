import { Container, Nav, Navbar } from "react-bootstrap";
import MenuItem from "../../components/MenuItem";
import { InfoUser } from "../../components/info/info";
import { Navigate, Outlet } from "react-router-dom";
import { Footer } from "../../components/footer/footer";
import { useAppSelector } from "../../interface/reduxhook";
import { eRole } from "../../interface/role";
import "./PageGiaoVien.css";
const menuItem = {
  title: "Giáo viên",
  link: "giaovien",
};
export const PageGiaoVien = () => {
  const currentUser = useAppSelector(
    (state) => state.currentUser.login.currentUser
  );
  return (
    <>
      <Container>
        <Navbar>
          <Container id="myNavbar">
            <Nav className="me-auto">
              <MenuItem item={menuItem} />
            </Nav>
            <InfoUser
              email={
                currentUser && currentUser.hoTen ? currentUser.hoTen : "noname"
              }
              quyen={
                currentUser && currentUser.quyen && currentUser.quyen.chucNang
                  ? currentUser.quyen.chucNang
                  : "norole"
              }
            />
          </Container>
        </Navbar>
      </Container>
      {/* Main page */}
      <Container>
        {currentUser?.quyen.chucNang !== eRole.GV ? (
          <Navigate to="/" replace={true} />
        ) : (
          <Outlet />
        )}
      </Container>
      {/* Footer */}
      <Container>
        <Footer />
      </Container>
    </>
  );
};
