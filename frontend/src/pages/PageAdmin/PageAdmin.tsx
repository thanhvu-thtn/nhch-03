import { Container, Nav, Navbar } from "react-bootstrap";
import MenuItem from "../../components/MenuItem";
import { InfoUser } from "../../components/info/info";
import { Navigate, Outlet } from "react-router-dom";
import { Footer } from "../../components/footer/footer";
import { useAppSelector } from "../../interface/reduxhook";
import { eRole } from "../../interface/role";
import "./PageAdmin.css";

const menuItems = [
  {
    title: "Admin",
    link: "admin",
  },
  {
    title: "Tổ trưởng",
    link: "totruong",
  },
  {
    title: "Giáo viên",
    link: "giaovien",
  },
  
];
export const PageAdmin = () => {
  const currentUser = useAppSelector(
    (state) => state.currentUser.login.currentUser
  );

  return (
    <>
      <Container>
        <Navbar>
          <Container id="myNavbar">
            <Nav className="me-auto">
              {menuItems.map((item, index) => (
                <MenuItem item={item} key={index} />
              ))}
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
        {currentUser?.quyen.chucNang !== eRole.Admin ? (
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
