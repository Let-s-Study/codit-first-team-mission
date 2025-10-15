import './ModalContents.scss'

function ModalContents({ onClose }) {

  const handleCancel = () => {
    onClose();
  }

  return (
    <div className="listSection">
      <h2>습관 목록</h2>
      <button onClick={handleCancel}>취소</button>
    </div>
  )
}

export default ModalContents