'use client'

import { useEffect } from 'react'
import { useFile, useBucket, useFileDelete, useFileDownload, useFileUpload, useFileView } from 'react-appwrite/storage'

export default function StoragePage() {
  const upload = useFileUpload()
  const { data } = useFile('test', '6428a8b2f3e353df1be3')
  const deleteFile = useFileDelete()
  // const testPreview = useFilePreview('test', 'test')
  const download = useFileDownload()
  const fileView = useFileView()
  const { data: uploadedImages } = useBucket("test")

  useEffect(() => {
    download.mutate({ bucketId: 'test', fileId: '6428a8b2f3e353df1be3' })
  }, [])

  useEffect(() => {
    fileView.mutate({ bucketId: 'test', fileId: '6428a8b2f3e353df1be3' })
  }, [])

  return (
    <div>
      <div className="flex gap-2">
        <input
          type="file"
          onChange={event => {
            const file = event.target?.files?.[0]

            if (file) {
              upload.mutate({
                bucketId: 'test',
                fileId: 'test',
                file,
              })
            }
          }}
        />

        <button
          type="button"
          className="error button"
          onClick={() => {
            const url = deleteFile.mutate({
              bucketId: 'test',
              fileId: 'test',
            })
          }}
        >
          Delete
        </button>
      </div>

      <div>
        {
          upload.isLoading &&
          <span>
            Loading
          </span>
        }

        {
          data &&
          <p>
            {data.name}
          </p>
        }

        <a
          download={data?.name}
          className="success button"
          href={download.data?.href}
        >
          Download
        </a>
        <a
          download={data?.name}
          className="success button"
          href={fileView.data?.href}
        >
          Get File for View
        </a>
      </div>
      <ol>
        {
          uploadedImages?.map(image => (
            <li
              key={image.$id}
            >
              {image.name}
            </li>
          ))
        }
      </ol>
    </div>
  )
}