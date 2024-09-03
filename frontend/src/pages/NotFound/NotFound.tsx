import { Button, Container } from "react-bootstrap";
import "./NotFound.css";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();
  const onButtonClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <Container>
      <h2 className="text-center">TRANG NÀY KHÔNG TỒN TẠI</h2>
      <div className="text-center text-danger">
        Bạn đi vào một đường link không tồn tại hoặc sử dụng trang web không
        đúng cách. Hãy bấm đăng nhập để vào phiên làm việc khác
      </div>
      <div id="buttonLogin">
        <Button className="btn btn-primary" onClick={onButtonClick}>
          Vào trang đăng nhập
        </Button>
      </div>
    </Container>
  );
};
