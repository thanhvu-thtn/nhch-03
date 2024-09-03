import Button from 'react-bootstrap/esm/Button'
import Modal from 'react-bootstrap/esm/Modal'

type Props = {
  isShow: boolean
  title: string
  body: string
  onClose: () => void
}
export const MessageBox = ({ isShow, title, body, onClose }: Props) => {
  return (
    <Modal show={isShow} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
