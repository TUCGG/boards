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
exports.BoardsController = void 0;
const common_1 = require("@nestjs/common");
const boards_service_1 = require("./boards.service");
const board_entity_1 = require("./entities/board.entity");
const board_module_1 = require("./board.module");
let BoardsController = class BoardsController {
    constructor(boardsService) {
        this.boardsService = boardsService;
    }
    async getAllBoard() {
        return this.boardsService.getAllBoards();
    }
    async getAllBoards(type) {
        return this.boardsService.getAllBoardsByType(type);
    }
    async createBoard(board) {
        return await this.boardsService.createBoard(board);
    }
    async searchBoards(type, contents, activeTab, isShow, startDate, endDate, start, limit) {
        const searchResults = await this.boardsService.searchBoards(type, contents, activeTab, isShow, startDate, endDate, start, limit);
        return searchResults;
    }
    async getBoardById(id) {
        return this.boardsService.getBoardById(id);
    }
    async getNearBoardById(id) {
        return this.boardsService.getNearBoardById(id);
    }
    async deleteBoard(id) {
        return this.boardsService.deleteBoard(id);
    }
    async updateBoardStatus(id, updatedBoardData) {
        return this.boardsService.updateBoardStatus(id, updatedBoardData);
    }
};
exports.BoardsController = BoardsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "getAllBoard", null);
__decorate([
    (0, common_1.Get)("/byType/:type"),
    __param(0, (0, common_1.Param)("type")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "getAllBoards", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [board_entity_1.BoardEntity]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "createBoard", null);
__decorate([
    (0, common_1.Get)("/search"),
    __param(0, (0, common_1.Query)("type")),
    __param(1, (0, common_1.Query)("contents")),
    __param(2, (0, common_1.Query)("activeTab")),
    __param(3, (0, common_1.Query)("isShow")),
    __param(4, (0, common_1.Query)("startDate")),
    __param(5, (0, common_1.Query)("endDate")),
    __param(6, (0, common_1.Query)("start")),
    __param(7, (0, common_1.Query)("limit")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, Number, Number]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "searchBoards", null);
__decorate([
    (0, common_1.Get)("/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "getBoardById", null);
__decorate([
    (0, common_1.Get)("/near/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "getNearBoardById", null);
__decorate([
    (0, common_1.Delete)("/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "deleteBoard", null);
__decorate([
    (0, common_1.Patch)("/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, board_entity_1.BoardEntity]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "updateBoardStatus", null);
exports.BoardsController = BoardsController = __decorate([
    (0, common_1.Controller)("boards"),
    __metadata("design:paramtypes", [boards_service_1.BoardsService])
], BoardsController);
//# sourceMappingURL=boards.controller.js.map