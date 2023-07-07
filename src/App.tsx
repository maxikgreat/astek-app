import { useEffect, useMemo, useState } from 'react'
import { Photo, Modal } from './components'

import './App.css'

export type Photo = {
  albumId: number
  id: number
  title: string
  url: string
  thumbnailUrl: string
}

type PhotosState = {
  error?: string
  data: Photo[]
  loading: boolean
}

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [{ loading, data, error }, setPhotos] = useState<PhotosState>({
    data: [],
    loading: true,
  })
  const [detailedPhoto, setDetailedPhoto] = useState<Photo>()

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL

    fetch(`${apiUrl}/albums/1/photos`)
      .then((response) => response.json())
      .then((data: Photo[]) =>
        setPhotos({
          data,
          loading: false,
          error: undefined,
        }),
      )
      .catch((error: { message?: string }) =>
        setPhotos({
          loading: false,
          error: error?.message,
          data: [],
        }),
      )
  }, [])

  const photos = useMemo(
    () =>
      searchQuery
        ? data.filter(({ title }) =>
            title.toLowerCase().includes(searchQuery.toLowerCase()),
          )
        : data,
    [searchQuery, data],
  )

  return (
    <>
      {detailedPhoto && (
        <Modal {...detailedPhoto} onClose={() => setDetailedPhoto(undefined)} />
      )}
      <main>
        <input
          type="text"
          value={searchQuery}
          onChange={({ target: { value } }) => setSearchQuery(value)}
          placeholder="Filter by title..."
          disabled={loading}
        />
        {loading && 'Loading...'}
        {!loading && error && `Error occurred: ${error}`}
        {!loading && !searchQuery && photos.length === 0 && 'No photos found.'}
        {!loading &&
          searchQuery &&
          photos.length === 0 &&
          'No photos with given query found.'}
        <div className="photos">
          {!loading &&
            photos.map(({ id, ...photo }) => (
              <Photo
                key={id}
                id={id}
                {...photo}
                onClick={() => setDetailedPhoto({ id, ...photo })}
              />
            ))}
        </div>
      </main>
    </>
  )
}

export default App
