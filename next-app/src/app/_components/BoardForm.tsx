"use client";
import { useState } from "react";
import styles from "./BoardForm.module.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import { createBoard } from "@/core/api/board";
import { Box, Button, Input, InputLabel, TextField } from "@mui/material";
import { BoardType } from "../_utils/commonCode";
import { BoardDetailType } from "../_types/boardType";
import { useSnackbar } from "notistack";

interface BoardFormType {
  type: "VIEW" | "WRITE";
}

const BoardForm = ({ type }: BoardFormType) => {
  const { enqueueSnackbar } = useSnackbar();
  const validationSchema = Yup.object({
    title: Yup.string().required("제목은 필수 항목입니다."),
    description: Yup.string().required("설명은 필수 항목입니다."),
    content: Yup.string().required("내용은 필수 항목입니다."),
    author: Yup.string().required("작성자는 필수 항목입니다."),
  });

  const createFormik = useFormik<BoardDetailType>({
    initialValues: {
      title: "",
      description: "",
      content: "",
      author: "",
      createAt: new Date(),
    },
    validationSchema,
    onSubmit: async (values) => {
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
        enqueueSnackbar("게시물 작성에 실패했습니다.", { variant: "error" });
      }
      // NOTE: lsh 여기서 post 날리기
    },
  });

  return (
    <Box
      component="form"
      onSubmit={createFormik.handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Box>
        <InputLabel>제목</InputLabel>
        <Input
          type="text"
          id="title"
          fullWidth
          placeholder="제목을 입력해주세요."
          value={createFormik.values.title}
          onChange={createFormik.handleChange}
          disabled={type === BoardType.VIEW}
        />
        {createFormik.touched.title && createFormik.errors.title && (
          <div style={{ color: "red" }}>{createFormik.errors.title}</div>
        )}
      </Box>
      <Box>
        <InputLabel>설명</InputLabel>
        <Input
          type="text"
          id="description"
          fullWidth
          placeholder="설명을 입력해주세요."
          value={createFormik.values.description}
          onChange={createFormik.handleChange}
          disabled={type === BoardType.VIEW}
        />
        {createFormik.touched.description &&
          createFormik.errors.description && (
            <div style={{ color: "red" }}>
              {createFormik.errors.description}
            </div>
          )}
      </Box>
      <Box>
        <InputLabel>작성자</InputLabel>
        <Input
          type="text"
          id="author"
          fullWidth
          placeholder="작성자를 입력해주세요."
          value={createFormik.values.author}
          onChange={createFormik.handleChange}
          disabled={type === BoardType.VIEW}
        />
        {createFormik.touched.author && createFormik.errors.author && (
          <div style={{ color: "red" }}>{createFormik.errors.author}</div>
        )}
      </Box>
      <Box>
        <InputLabel>내용</InputLabel>
        {/* /FIXME: lsh 여기 에디터로 수정 해야함 */}
        <TextField
          type="text"
          id="content"
          fullWidth
          placeholder="내용을 입력해주세요."
          value={createFormik.values.content}
          onChange={createFormik.handleChange}
          disabled={type === BoardType.VIEW}
          autoFocus
          rows={4}
        />
        {createFormik.touched.content && createFormik.errors.content && (
          <div style={{ color: "red" }}>{createFormik.errors.content}</div>
        )}
      </Box>
      <Button variant="contained" type="submit">
        게시글 생성
      </Button>
    </Box>
  );
};

export default BoardForm;
