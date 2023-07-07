import { useState } from 'react'

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

const apiUrl = import.meta.env.VITE_API_URL

export const usePhotos = () => {
  const [{ loading, data, error }, setPhotos] = useState<PhotosState>({
    data: [],
    loading: true,
  })

  const fetchPhotos = () => {
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
  }

  return {
    loading,
    data,
    error,
    fetch: fetchPhotos,
  }
}
