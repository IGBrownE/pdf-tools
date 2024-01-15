'use client'
import styles from './page.module.css'
import { MdOutlineTextFields } from "react-icons/md";
import { IoMdBrush } from "react-icons/io";
import { FaImage } from "react-icons/fa6";
import { BsCursorFill } from "react-icons/bs";
import PdfViewer from './PdfViewer'

export default function Viewer() {
  return (
    <main className={styles.viewer}>
      <PdfViewer />
      <div className={styles.btnSave}>
        <span>save</span>
      </div>
      <div className={styles.btnContainer}>
        <div className={styles.btnIcon}>
          <MdOutlineTextFields size={24} />
        </div>
        <div className={styles.btnIcon}>
          <IoMdBrush size={24} />
        </div>
        <div className={styles.btnIcon}>
          <FaImage size={24} />
        </div>
        <div className={`${styles.btnIcon} ${styles.btnActive}`}>
          <BsCursorFill size={24} />
        </div>
      </div>


    </main>
  )
}
