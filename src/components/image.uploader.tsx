import { useState } from 'react'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '@/lib/firebase'
import toast from 'react-hot-toast'
import Image from 'next/image'
import { UploadCloud, Loader2 } from 'lucide-react'

interface ImageUploaderProps {
  setUploadedImageUrl: (url: string) => void
  initialImageUrl: string | null
}

export default function ImageUploader({
  setUploadedImageUrl,
  initialImageUrl,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(initialImageUrl)

  const handleUpload = (file: File | null) => {
    if (!file) return

    const storageRef = ref(storage, `blog/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      () => {
        setUploading(true)
      },
      (error) => {
        console.error(error)
        toast.error('Erro ao carregar imagem')
        setUploading(false)
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref)
        setUploadedImageUrl(url)
        setUploading(false)
        setImageUrl(url)
        toast.success('Imagem carregada com sucesso')
      },
    )
  }

  return (
    <div className="flex flex-col items-start">
      <label className="flex flex-col items-center justify-start p-4 border border-dashed border-[#333333] rounded cursor-pointer">
        <UploadCloud className="w-10 h-10 text-[#333333]" />
        <span className="mt-2 text-sm text-[#333333]">
          Clique para fazer upload
        </span>
        <input
          title="Upload Image"
          type="file"
          onChange={(event) =>
            handleUpload(event.target.files?.item(0) || null)
          }
          disabled={uploading}
          className="hidden"
        />
      </label>
      {uploading && (
        <div className="flex items-center justify-center">
          <Loader2 className="w-10 h-10 text-[#333333] mt-4 animate-spin" />
        </div>
      )}
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Uploaded"
          width={200}
          height={200}
          className="rounded my-4 object-cover"
        />
      )}
    </div>
  )
}
