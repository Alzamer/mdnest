'use client';

import { useState } from 'react';
import styles from './style.module.css';
import { useRouter } from 'next/navigation';
import { IoPencil, IoTrashBin } from 'react-icons/io5';
import Button from '@mui/material/Button';
import MDEditor from '@uiw/react-md-editor';
import Modal from 'react-modal';

const deleteNoteModalStyles = {
  content: {
    top: '40%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: '500px',
    width: '350px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }
};

const editNoteModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: '800px',
    width: '950px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column'
  }
};

export default function TabEntity({ title, createdAt, content, uuid, handleDelete, handleEdit }: {
  title: string,
  createdAt: string,
  content: string,
  uuid: string,
  handleDelete: (uuid: string) => void,
  handleEdit: (uuid: string, content: string) => void
}) {
  const router = useRouter();
  const [deleteNoteModal, setDeleteNoteModal] = useState(false);
  const [editNoteModal, setEditNoteModal] = useState(false);
  const [newContent, setNewContent] = useState(content);

  return <div className={styles.container} data-color-mode='light'>
    <div className={styles.titleHeader}>
      <p onClick={() => router.push(`note/${uuid}`)}>
        <u>
          {title}
        </u>
      </p>
      <div className={styles.right}>
        <p>
          <IoPencil onClick={() => setEditNoteModal(true)} />
        </p>
        <p>
          <IoTrashBin onClick={() => setDeleteNoteModal(true)} />
        </p>
        <p>{createdAt.slice(0, 10)}</p>
      </div>
    </div>
    <p>{content.slice(0, 190)}...</p>
    <Modal
      isOpen={deleteNoteModal}
      onRequestClose={() => setDeleteNoteModal(false)}
      style={deleteNoteModalStyles}
      contentLabel="Delete note modal"
    >
      <p>Are you sure you want to delete this note?</p>
      <Button variant="contained" onClick={() => {
        handleDelete(uuid)
        setDeleteNoteModal(false);
      }
      }>
        Yes!
      </Button>
    </Modal>
    <Modal
      isOpen={editNoteModal}
      onRequestClose={() => setEditNoteModal(false)}
      style={editNoteModalStyles}
      contentLabel="Edit note modal"
    >
      <div data-color-mode="light">
        <MDEditor
          value={newContent}
          onChange={setNewContent as () => void}
          height={600}
          minHeight={600}
          maxHeight={600}
        />
      </div>
      <Button variant="contained" onClick={() => {
        handleEdit(uuid, newContent);
        setEditNoteModal(false);
      }
      }>
        Edit
      </Button>
    </Modal>
  </div>
};