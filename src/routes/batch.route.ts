import { Router } from "express";
import BatchController from "../controllers/batch.controller";

class BatchRouter {

    public router: Router;
    public controller: BatchController;
    constructor() {
        this.router = Router();
        this.controller = new BatchController();
        this.routes();
    }

    routes() {
        this.router.get("", this.controller.getBatch);
        this.router.get("/:batchId", this.controller.getBatchById);
        this.router.get("/:batchId/students", this.controller.getBatchStudents);
        this.router.post("/:batchId/students", this.controller.addBatchStudents);
        this.router.post("", this.controller.createBatch);
        this.router.put("/:batchId", this.controller.updateBatch);
        this.router.delete("/:batchId", this.controller.deleteBatch);
    }
}

export default BatchRouter;