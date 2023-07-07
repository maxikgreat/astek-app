import type { Photo as PhotoType } from '../../usePhotos'
import './Photo.css'

type PhotoProps = PhotoType & {
  onClick: VoidFunction
}

export function Photo({ title, thumbnailUrl, onClick }: PhotoProps) {
  return (
    <div className="photo" onClick={onClick}>
      <img className="photo__thumb" src={thumbnailUrl} alt="thumbnail" />
      <h3 className="photo__title">{title}</h3>
    </div>
  )
}
