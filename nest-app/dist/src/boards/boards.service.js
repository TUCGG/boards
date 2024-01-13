"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardsService = void 0;
const common_1 = require("@nestjs/common");
const board_entity_1 = require("./entities/board.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let BoardsService = class BoardsService {
    constructor(boardsRepository) {
        this.boardsRepository = boardsRepository;
    }
    async createBoard(board) {
        const newBoard = this.boardsRepository.create(board);
        return await this.boardsRepository.save(newBoard);
    }
    async getAllBoards() {
        const boards = await this.boardsRepository.find({
            relations: ["user"],
            order: {
                createAt: "ASC",
            },
        });
        boards.forEach((board) => {
            if (board.user) {
                board.user.password = "";
                board.user.id = null;
            }
        });
        return boards;
    }
    async getAllBoardsByType(type) {
        const boards = await this.boardsRepository.find({
            relations: ["user"],
            where: { type },
            order: {
                isShow: 1,
                createAt: "DESC",
            },
        });
        boards.forEach((board) => {
            if (board.user) {
                board.user.password = "";
                board.user.id = null;
            }
        });
        return boards;
    }
    async getBoardById(id) {
        const board = await this.boardsRepository.findOne({
            where: {
                id,
            },
            relations: ["user"],
        });
        if (!board) {
            return null;
        }
        board.user.password = "";
        board.user.id = null;
        return board;
    }
    async getNearBoardById(id) {
        const allBoards = await this.boardsRepository.find({
            relations: ["user"],
            where: { isShow: true },
            order: {
                createAt: "ASC",
            },
        });
        const currentIndex = allBoards.findIndex((board) => board.id === Number(id));
        if (currentIndex === -1) {
            return { previousBoard: null, nextBoard: null };
        }
        const previousIndex = currentIndex - 1;
        const nextIndex = currentIndex + 1;
        const previousBoard = previousIndex >= 0 ? allBoards[previousIndex] : null;
        const currentBoard = allBoards[currentIndex];
        const nextBoard = nextIndex < allBoards.length ? allBoards[nextIndex] : null;
        if (previousBoard && previousBoard.user) {
            previousBoard.user.password = "";
            previousBoard.user.id = null;
        }
        if (currentBoard.user) {
            currentBoard.user.password = "";
            currentBoard.user.id = null;
        }
        if (nextBoard && nextBoard.user) {
            nextBoard.user.password = "";
            nextBoard.user.id = null;
        }
        return { previousBoard, nextBoard };
    }
    async deleteBoard(id) {
        const boardToDelete = await this.boardsRepository.findOne({
            where: {
                id,
            },
        });
        if (!boardToDelete) {
            throw new common_1.NotFoundException(`게시글 ID ${id}를 찾을 수 없습니다.`);
        }
        const idxToDelete = boardToDelete.id;
        await this.boardsRepository.delete(idxToDelete);
        return this.boardsRepository.find();
    }
    async updateBoardStatus(id, updatedBoardData) {
        const existingBoard = await this.boardsRepository.findOne({
            where: { id },
        });
        if (!existingBoard) {
            throw new common_1.NotFoundException(`게시글 ID ${id}를 찾을 수 없습니다.`);
        }
        Object.assign(existingBoard, updatedBoardData);
        return await this.boardsRepository.save(existingBoard);
    }
    async searchBoards(type, contents, activeTab, isShow, startDate, endDate, start, limit) {
        let searchResults;
        const findObj = {
            relations: ["user"],
            where: {},
            order: {
                createAt: "DESC",
            },
        };
        if (isShow) {
            findObj.where["isShow"] = isShow === "true" ? 1 : 0;
        }
        if (activeTab) {
            findObj.where["type"] = activeTab;
        }
        if (startDate && endDate) {
            findObj.where["createAt"] = (0, typeorm_2.Between)(new Date(startDate), new Date(endDate));
        }
        if (start) {
            findObj["skip"] = start;
        }
        if (limit) {
            findObj["take"] = limit;
        }
        if (type === "title") {
            findObj.where["title"] = (0, typeorm_2.Like)(`%${contents}%`);
        }
        else if (type === "contents") {
            findObj.where["contents"] = (0, typeorm_2.Like)(`%${contents}%`);
        }
        else {
            findObj.where = [
                { ...findObj.where, title: (0, typeorm_2.Like)(`%${contents}%`) },
                { ...findObj.where, contents: (0, typeorm_2.Like)(`%${contents}%`) },
            ];
        }
        const total = await this.boardsRepository.count(findObj);
        searchResults = await this.boardsRepository.find(findObj);
        return {
            total_count: total,
            items: searchResults,
        };
    }
};
exports.BoardsService = BoardsService;
exports.BoardsService = BoardsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(board_entity_1.BoardEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BoardsService);
//# sourceMappingURL=boards.service.js.map