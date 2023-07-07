import { useEffect, useMemo, useState } from 'react'
import { Photo, Modal } from './components'
import { Photo as PhotoType, usePhotos } from './usePhotos'

import './App.css'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [detailedPhoto, setDetailedPhoto] = useState<PhotoType>()
  const { loading, data, error, fetch } = usePhotos()

  useEffect(() => {
    fetch()
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
