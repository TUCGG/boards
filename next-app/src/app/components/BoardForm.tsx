"use client";
import { useState } from "react";
import styles from "./BoardForm.module.css";
import { useFormik } from "formik";
import { createBoard } from "@/core/api/board";

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
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [createAt, setCreateAt] = useState<string>("");

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      content: "",
      author: "",
      createAt: new Date(),
    },
    onSubmit: async (values) => {
      console.log("values", values);
      let response = {
        title: values.title,
        description: values.description,
        content: values.content,
        author: values.author,
        createAt: values.createAt,
      };
      try {
        await createBoard(response);
      } catch (err) {
        console.log(err);
      }
      // NOTE: lsh 여기서 post 날리기
    },
  });

  const handleFormikData = (e: any) => {
    formik.setFieldValue(e.target.id, e.target.value);
  };

  return (
    <div>
      <h2>제목</h2>
      <input
        type="text"
        id="title"
        className={styles.styleInput}
        placeholder="제목을 입력해주세요."
        value={title}
        onChange={(e) => {
          handleFormikData(e);
          setTitle(e.target.value);
        }}
      />
      <h2>설명</h2>
      <input
        type="text"
        id="description"
        className={styles.styleInput}
        placeholder="설명을 입력해주세요."
        value={description}
        onChange={(e) => {
          handleFormikData(e);
          setDescription(e.target.value);
        }}
      />
      <h2>작성자</h2>
      <input
        type="text"
        id="author"
        className={styles.styleInput}
        placeholder="작성자를 입력해주세요."
        value={author}
        onChange={(e) => {
          handleFormikData(e);
          setAuthor(e.target.value);
        }}
      />
      <h2>내용</h2>
      <input
        type="text"
        id="content"
        className={styles.styleInput}
        placeholder="내용을 입력해주세요."
        value={content}
        onChange={(e) => {
          handleFormikData(e);
          setContent(e.target.value);
        }}
      />
      <button onClick={(e) => formik.handleSubmit()}>게시글 생성</button>
    </div>
  );
};

export default BoardForm;
