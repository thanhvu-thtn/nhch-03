import "./info.css";
type Props = {
  email: string;
  quyen: string;
};
export const InfoUser = ({ email, quyen }: Props) => {
  return (
    <>
      <div>{email}</div>
      <div id="quyen">{quyen}</div>
      <div id="logout">Logout</div>
    </>
  );
};
