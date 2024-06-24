'use client'

import React, { useState, useRef, useEffect } from 'react'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '@/lib/firebase'
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineLink,
  AiOutlinePicture,
} from 'react-icons/ai'
import { Loader } from 'lucide-react'

interface EditorProps {
  value: string
  onChange: (value: string) => void
}

export default function Editor({ value, onChange }: EditorProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [value])

  const insertTextAtCursor = (text: string) => {
    const textarea = textareaRef.current
    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const newText =
        textarea.value.substring(0, start) +
        text +
        textarea.value.substring(end)
      onChange(newText)
      textarea.focus()
      textarea.setSelectionRange(start + text.length, start + text.length)
    }
  }

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploading(true)
      const storageRef = ref(storage, `posts/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setUploadProgress(progress)
        },
        (error) => {
          console.error('Upload failed', error)
          setUploading(false)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            insertTextAtCursor(`![alt text](${downloadURL})`)
            setUploading(false)
            setUploadProgress(0)
          })
        },
      )
    }
  }

  return (
    <div>
      <div className="flex items-center space-x-2 p-2 rounded border-2 border-[#333333]">
        <button
          className="text-[#333333]"
          onClick={() => insertTextAtCursor('# ')}
          title="Heading 1"
          type="button"
        >
          H1
        </button>
        <button
          className="text-[#333333]"
          onClick={() => insertTextAtCursor('## ')}
          title="Heading 2"
          type="button"
        >
          H2
        </button>
        <button
          className="text-[#333333]"
          onClick={() => insertTextAtCursor('**bold text**')}
          title="Bold"
          type="button"
        >
          <AiOutlineBold />
        </button>
        <button
          className="text-[#333333]"
          onClick={() => insertTextAtCursor('_italic text_')}
          title="Italic"
          type="button"
        >
          <AiOutlineItalic />
        </button>
        <button
          className="text-[#333333]"
          onClick={() => insertTextAtCursor('[link text](url)')}
          title="Link"
          type="button"
        >
          <AiOutlineLink />
        </button>
        <input
          title="Upload Image"
          type="file"
          accept="image/*"
          className="hidden"
          id="imageUpload"
          onChange={handleImageUpload}
        />
        <button
          type="button"
          className="toolbar-button"
          onClick={() => document.getElementById('imageUpload')?.click()}
          title="Upload Image"
        >
          <AiOutlinePicture />
        </button>
      </div>
      {uploading && (
        <div className="flex items-center space-x-2 mt-4">
          <Loader className="animate-spin w-6 h-6 text-[#333333]" />
          <span>Carregando: {Math.round(uploadProgress)}%</span>
        </div>
      )}
      <textarea
        ref={textareaRef}
        className="w-full h-auto text-[#333333] placeholder:text-[#333333] rounded my-4 focus:outline-none overflow-hidden resize-none border-none"
        placeholder="Escreva aqui..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={1}
      />
    </div>
  )
}
