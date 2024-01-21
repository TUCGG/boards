import httpBoard from "../lib/axios/httpBoard";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_HOST}`;

export const getAllBoard = async () => {
  try {
    const response = await httpBoard.get(`${API_BASE_URL}/boards`);
    return response;
  } catch (error) {
    console.error("Error fetching all boards:", error);
    throw error;
  }
};

export const getAllBoardsByType = async (type: string) => {
  // type은 report, video, story 스트링으로 넘어옴
  try {
    const response = await httpBoard.get(
      `${API_BASE_URL}/boards/byType/${type}`
    );

    return response;
  } catch (error) {
    console.error("Error fetching all boards:", error);
    throw error;
  }
};

export const getBoard = async (id: number) => {
  try {
    const response = await httpBoard.get(`${API_BASE_URL}/boards/${id}`);

    //TODO: lsh 앞 뒤 게시물 조회하는 로직추가해야함
    return response.data;
  } catch (error) {
    console.error("Error fetching board:", error);
    throw error;
  }
};

export const getNearBoard = async (id: number) => {
  try {
    const response = await httpBoard.get(`${API_BASE_URL}/boards/near/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching board:", error);
    throw error;
  }
};

export const createBoard = async (boardData: any) => {
  try {
    const response = await httpBoard.post(`${API_BASE_URL}/boards`, boardData);
    const { data } = response;

    return data; // API 응답에서 생성된 게시판 데이터를 반환합니다.
  } catch (error) {
    console.error("게시판 생성 중 오류 발생:", error);
    throw error;
  }
};

export const deleteBoard = async (id: number) => {
  try {
    const response = await httpBoard.delete(`${API_BASE_URL}/boards/${id}`);
    return {};
  } catch (error) {
    console.error("Error fetching board:", error);
    throw error;
  }
};

export const editBoard = async (boardData: any) => {
  try {
    const response = await httpBoard.patch(
      `${API_BASE_URL}/boards/${boardData.id}`,
      boardData
    );
    const { data } = response;

    return data;
  } catch (error) {
    console.error("게시판 생성 중 오류 발생:", error);
    throw error;
  }
};

// type BoardEntity = {
//   id: number,
//   title: string,
//   description: string,
//   url: string,
//   contents: string,
//   createAt: 2022-03-16T04:20:47.000Z,
//   updateAt: 2022-03-16T04:20:47.000Z,
//   type: 'report',
//   isShow: true,
//   thumb: 'https://bubblecon.s3.amazonaws.com/5.png'
// };
