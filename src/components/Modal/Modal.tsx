import './Modal.css'
import { useEffect } from 'react'
import type { Photo } from '../../usePhotos'

type ModalProps = Photo & {
  onClose: VoidFunction
}

export function Modal({ title, url, onClose }: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <div className="modal">
      <div className="modal__content">
        <div className="modal__image-container">
          <img src={url} alt="photo" />
        </div>
        <p>{title}</p>
        <button onClick={onClose}>Got it!</button>
      </div>
    </div>
  )
}
