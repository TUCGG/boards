"use client";
import { getAllBoard } from "@/core/api/board";
import React, { useEffect, useState } from "react";

const BoardLists = () => {
  const [boardLists, setBoardLists] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const boards = await getAllBoard();
        setBoardLists(boardLists);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [boardLists]);

  console.log("boardLists", boardLists);

  return <React.Fragment>asdfasdf</React.Fragment>;
};

export default BoardLists;
