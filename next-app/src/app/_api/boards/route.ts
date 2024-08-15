import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const data = { message: "GET 요청이 성공했습니다." };
    return NextResponse.json(data);
  } catch (error) {
    // 오류가 발생한 경우 오류 응답을 반환합니다.
    console.error("GET 요청 처리 중 오류 발생:", error);
    return NextResponse.error();
  }
}
export async function POST(req: Request) {
  try {
    const data = { message: "POST 요청이 성공했습니다." };
    return NextResponse.json(data);
  } catch (error) {
    // 오류가 발생한 경우 오류 응답을 반환합니다.
    console.error("POST 요청 처리 중 오류 발생:", error);
    return NextResponse.error();
  }
}
