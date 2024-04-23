'use client';

import { useEffect, useState } from 'react';
import styles from './style.module.css';
import { useRouter } from 'next/navigation';
import { IoPencil, IoTrashBin } from 'react-icons/io5';
import Button from '@mui/material/Button';
import Modal from 'react-modal';

export default function TabEntity({ title, createdAt, content, uuid, handleDelete }: {
  title: string,
  createdAt: string,
  content: string,
  uuid: string,
  handleDelete: (uuid: string) => void
}) {
  const router = useRouter();
  const [modal, setModal] = useState(false);

  const modalStyles = {
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

  return <div className={styles.container}>
    <div className={styles.titleHeader}>
      <p onClick={() => router.push(`note/${uuid}`)}>
        <u>
          {title}
        </u>
      </p>
      <div className={styles.right}>
        <p>
          <IoPencil onClick={() => console.log('EDIT')} />
        </p>
        <p>
          <IoTrashBin onClick={() => setModal(true)} />
        </p>
        <p>{createdAt.slice(0, 10)}</p>
      </div>
    </div>
    <p>{content.slice(0, 190)}...</p>
    <Modal
      isOpen={modal}
      onRequestClose={() => setModal(false)}
      style={modalStyles}
      contentLabel="Example Modal"
    >
      <p>Are you sure you want to delete this note?</p>
      <Button variant="contained" onClick={() => {
        handleDelete(uuid)
        setModal(false);
      }
      }>
        Yes!
      </Button>
    </Modal>
  </div>
};