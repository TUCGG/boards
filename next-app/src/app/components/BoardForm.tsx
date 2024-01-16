"use client";
import { useState } from "react";
import styles from "./BoardForm.module.css";
import { useFormik } from "formik";

interface BoardFormType {
  type: string;
}
interface BoardType {
  title: string;
  description: string;
  content: string;
  author: string;
  createAt: Date;
}

const BoardForm = ({ type }: BoardFormType) => {
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [content, setContent] = useState<string>();
  const [author, setAuthor] = useState<string>();
  const [createAt, setCreateAt] = useState<string>();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      content: "",
      author: "",
      createAt: new Date(),
    },
    onSubmit: (values) => {
      // NOTE: lsh 여기서 post 날리기
    },
  });

  console.log("title", title);

  return (
    <div>
      <h2>제목</h2>
      <input
        type="text"
        id="title"
        className={styles.styleInput}
        placeholder="제목을 입력해주세요."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <h2>설명</h2>
      <input
        type="text"
        id="title"
        className={styles.styleInput}
        placeholder="제목을 입력해주세요."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
  );
};

export default BoardForm;
