import BoardForm from "@/app/_components/BoardForm";
import { BoardType } from "@/app/_utils/commonCode";

const BoardCreate = () => {
  return (
    <div>
      <BoardForm type={BoardType.WRITE} />
    </div>
  );
};

export default BoardCreate;
